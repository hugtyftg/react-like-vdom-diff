import Element from './Element';
function createElement(type, props, children) {
  return new Element(type, props, children);
}
function render(vDom) {
  const { type, props, children } = vDom;
  const el = document.createElement(type);
  for (const key in props) {
    setAttrs(el, key, props[key]);
  }
  children.map((c) => {
    // 如果c是文本节点，直接创建；如果是react element，递归创建
    c = c instanceof Element ? render(c) : document.createTextNode(c);
    el.appendChild(c);
  });
  return el;
}
function setAttrs(node, prop, value) {
  switch (prop) {
    case 'value':
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(prop, value);
      break;
  }
}
function renderDOM(rDom, rootEl) {
  rootEl.appendChild(rDom);
}
export { createElement, render, renderDOM, setAttrs };
