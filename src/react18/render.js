function render(vDom) {
  const el = document.createElement(vDom.type);
  // 处理props
  Reflect.ownKeys(vDom.props).forEach((key) => {
    let value = vDom.props[key];
    switch (key) {
      case 'style':
        el.style.cssText = value;
        break;
      case 'children':
        let children = value;
        if (!Array.isArray(children)) {
          children = [children];
        }
        children.forEach((child) => {
          let childEl = /^(string|number)$/.test(typeof child)
            ? document.createTextNode(child)
            : render(child, el);
          el.appendChild(childEl);
        });
        break;
      default:
        el.setAttribute(key, value);
        break;
    }
  });
  return el;
}
function mountDOM(rDom, container) {
  container.appendChild(rDom);
}
export { render, mountDOM };
