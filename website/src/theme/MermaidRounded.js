// Applies rounded corners to Mermaid diagram nodes
export function onRouteDidUpdate() {
  // Wait for Mermaid to render
  setTimeout(() => {
    const rects = document.querySelectorAll('.mermaid rect, .docusaurus-mermaid-container rect');
    rects.forEach(rect => {
      // Skip rects that are likely backgrounds or already rounded
      const currentRx = rect.getAttribute('rx');
      if (!currentRx || parseFloat(currentRx) < 5) {
        rect.setAttribute('rx', '10');
        rect.setAttribute('ry', '10');
      }
    });
  }, 500);
}
