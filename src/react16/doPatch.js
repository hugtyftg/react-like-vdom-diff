import { ATTR, REMOVE, REPLACE, TEXT } from './patchTypes';
import { render, setAttrs } from './virtualDOM';
let finalPatches = {};
let rnIndex = 0; // 真实dom节点的索引
function doPatch(rDom, patches) {
  finalPatches = patches;
  rNodeWalk(rDom);
}
function rNodeWalk(rNode) {
  const rnPatch = finalPatches[rnIndex++];
  const childNodes = rNode.childNodes; // array-like object
  // 如果patch存在，更新patch
  if (rnPatch) {
    patchAction(rNode, rnPatch);
  }
  // 递归调用，处理子节点
  [...childNodes].map((c) => {
    rNodeWalk(c);
  });
}
function patchAction(rNode, rnPatch) {
  // 每个patch都是一个数组，根据类型进行处理
  rnPatch.map((p) => {
    switch (p.type) {
      case ATTR:
        for (let key in p.attrs) {
          const value = p.attrs[key];
          if (value) {
            setAttrs(rNode, key, value);
          } else {
            // 如果该属性为undefined，则需要删除该属性
            rNode.removeAttribute(key);
          }
        }
        break;
      case TEXT:
        rNode.textContent = p.text;
        break;
      case REPLACE:
        // 判断当前替换的节点是否是react元素并创建对应真实dom
        const newNode =
          p.newNode instanceof Element
            ? render(p.newNode)
            : document.createTextNode(p.newNode);
        // 替换真实dom
        rNode.parentNode.replaceChild(newNode, rNode);
        break;
      case REMOVE:
        rNode.parentNode.removeChild(rNode);
        break;
      default:
        break;
    }
  });
}
export { doPatch };
