const katex = require('katex');
const {katexMacros} = require('./katex-macros');

// ЧИНИТ ОГЛАВЛЕНИЕ СТРАНИЦЫ («На этой странице») ТАМ, ГДЕ В ЗАГОЛОВКЕ ЕСТЬ ФОРМУЛА.
//
// Разбор устройства сборки. Расширение `remark-math` — не преобразователь дерева,
// а расширение РАЗБОРА: оно кладёт свои микромарк-правила в `data`, и они работают
// на стадии парсинга, ДО любого преобразователя. Поэтому к моменту, когда встроенный
// плагин `toc` собирает оглавление, формула в заголовке уже лежит узлом `inlineMath`,
// а `toc` сводит незнакомый узел к строке через `mdast-util-to-string`, то есть берёт
// его `value` — ГОЛЫЙ TeX БЕЗ РАЗДЕЛИТЕЛЕЙ. Читатель видит в оглавлении
// «\mathrm{Cl}(0, 0) = K», хотя в самом заголовке формула набрана верно.
//
// Отсюда — место починки. Внутрь `toc` не влезть, но плагин, поставленный ПОСЛЕ него,
// видит и готовый экспорт `toc`, и всё ещё целое дерево заголовков. Значение строки
// оглавления не чинится (границы формулы в ней уже потеряны — это верно), оно
// СОБИРАЕТСЯ ЗАНОВО из того же заголовка, откуда его собирал `toc`, с одной добавкой:
// узел `inlineMath` отрисовывается тем же KaTeX и теми же макросами, что и страница.
// Строка оглавления вставляется темой через `dangerouslySetInnerHTML`, поэтому размётка
// доходит до читателя как размётка.
//
// Правится ТОЛЬКО заголовок, в котором есть формула: там, где её нет, значение,
// собранное `toc`, остаётся нетронутым — прибор не переписывает того, что не чинит.
// Якорей это не касается вовсе: их считает плагин `headings`, работающий РАНЬШЕ `toc`,
// и дерево к тому времени ещё не тронуто.

const ESCAPE = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPE[c]);

const renderMath = (tex, displayMode) => {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      macros: {...katexMacros},
    });
  } catch {
    // Ни одна формула не смеет уронить сборку из-за оглавления: не отрисовалась —
    // остаётся тот же голый TeX, что стоял бы и без этого прибора.
    return escapeHtml(tex);
  }
};

// Повторяет `toHeadingHTMLValue` встроенного плагина `toc` (@docusaurus/mdx-loader),
// добавляя к нему случаи `inlineMath` и `math`. Расхождение в любом другом случае
// было бы порчей, поэтому набор ветвей держится тем же.
function toHtml(node) {
  switch (node.type) {
    case 'text':
      return escapeHtml(node.value);
    case 'inlineMath':
      return renderMath(node.value, false);
    case 'math':
      return renderMath(node.value, true);
    case 'inlineCode':
      return `<code>${escapeHtml(node.value)}</code>`;
    case 'emphasis':
      return `<em>${children(node)}</em>`;
    case 'strong':
      return `<strong>${children(node)}</strong>`;
    case 'delete':
      return `<del>${children(node)}</del>`;
    case 'heading':
    case 'link':
      return children(node);
    default:
      return node.children ? children(node) : escapeHtml(node.value ?? '');
  }
}

const children = (node) => node.children.map(toHtml).join('').trim();

const hasMath = (node) =>
  node.type === 'inlineMath' ||
  node.type === 'math' ||
  (node.children ? node.children.some(hasMath) : false);

function collectHeadings(node, out) {
  if (node.type === 'heading' && node.depth >= 2 && node.data?.id && hasMath(node)) {
    out.set(node.data.id, toHtml(node));
  }
  if (node.children) {
    for (const child of node.children) collectHeadings(child, out);
  }
  return out;
}

// Экспорт `toc` — узел `mdxjsEsm` с ESTree-деревом вида
// `export const toc = [{value, id, level}, ...]`; элементы-спреды (срезы оглавления
// подключённых файлов) пропускаются.
function tocElements(root, tocExportName) {
  for (const node of root.children) {
    if (node.type !== 'mdxjsEsm' || !node.data?.estree) continue;
    for (const statement of node.data.estree.body) {
      if (statement.type !== 'ExportNamedDeclaration') continue;
      const declaration = statement.declaration;
      if (declaration?.type !== 'VariableDeclaration') continue;
      for (const declarator of declaration.declarations) {
        if (declarator.id?.name !== tocExportName) continue;
        if (declarator.init?.type !== 'ArrayExpression') continue;
        return declarator.init.elements;
      }
    }
  }
  return null;
}

const propertyOf = (objectExpression, name) =>
  objectExpression.properties.find(
    (p) =>
      p.type === 'Property' &&
      (p.key?.value === name || p.key?.name === name),
  );

function remarkTocKatex(options = {}) {
  const tocExportName = options.name || 'toc';
  return (root) => {
    const byId = collectHeadings(root, new Map());
    if (byId.size === 0) return;
    const elements = tocElements(root, tocExportName);
    if (!elements) return;
    for (const element of elements) {
      if (element?.type !== 'ObjectExpression') continue;
      const idProperty = propertyOf(element, 'id');
      const valueProperty = propertyOf(element, 'value');
      if (!idProperty || !valueProperty) continue;
      const html = byId.get(idProperty.value?.value);
      if (html === undefined) continue;
      valueProperty.value = {type: 'Literal', value: html};
    }
  };
}

module.exports = remarkTocKatex;
