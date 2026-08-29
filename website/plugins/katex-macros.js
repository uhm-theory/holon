// KaTeX macros for this corpus. The list is empty for now — and the file still
// exists on purpose: the truth about macros must live in ONE place, read both by
// the page build (rehype-katex) and by the table-of-contents repair
// (remark-toc-katex). The day the first macro appears, both will see it at once;
// a macro known to the page but not to the contents is a defect waiting to happen.
const katexMacros = {};

module.exports = {katexMacros};
