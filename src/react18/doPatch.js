import { render } from './render';
import { ATTR, REPLACE, TEXT, REMOVE } from './patchTypes';

let rnIndex = 0;
let finalPatches = {};
function doPatch(rDom, patches) {
  finalPatches = patches;
  rNodeWalk(rDom);
}
function rNodeWalk(rNode) {
  const rnPatch = finalPatches[rnIndex++];
  const childNodes = rNode.childNodes;
  // 如果patch存在，更新patch
  if (rnPatch) {
    patchAction(rNode, rnPatch);
  }
  // 递归调用，处理子节点
  [...childNodes].map((c) => {
    rNodeWalk(c);
  });
}
// 对每个真实dom节点根据对应的patch进行更新
function patchAction(rNode, rnPatch) {
  rnPatch.map((patch) => {
    switch (patch.type) {
      case TEXT:
        rNode.textContent = patch.text;
        break;
      case ATTR:
        for (let key in patch.attrs) {
          const value = patch.attrs[key];
          if (value) {
            rNode.setAttribute(key, value);
          } else {
            rNode.removeAttribute(key);
          }
        }
        break;
      case REMOVE:
        rNode.parentNode.removeChild(rNode);
        break;
      case REPLACE:
        const newNode = /^(string|number)$/.test(typeof patch.newNode)
          ? document.createTextNode(patch.newNode)
          : render(patch.newNode);
        rNode.parentNode.replaceChild(newNode, rNode); // 替换真实dom
        break;
      default:
        break;
    }
  });
}
export { doPatch };
