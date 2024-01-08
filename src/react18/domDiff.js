import { ATTR, REMOVE, REPLACE, TEXT } from './patchTypes';

let vnIndex = 0; // 深度遍历当前进行到的节点序号
let patches = {};
function domDiff(oldDom, newDom) {
  vNodeWalk(oldDom, newDom, vnIndex);
  return patches;
}
function vNodeWalk(oldNode, newNode, index) {
  let vnPatch = []; // 当前index的patch
  if (!newNode) {
    vnPatch.push({ type: REMOVE, index });
  } else if (
    /^(string|number)$/.test(typeof oldNode) &&
    /^(string|number)$/.test(typeof newNode)
  ) {
    if (oldNode !== newNode) {
      vnPatch.push({ type: TEXT, text: newNode });
    }
  } else if (oldNode.type === newNode.type) {
    // 类型相同，但是attr和子节点可能不同

    // 比较attr
    const attrPatch = attrsWalk(oldNode.props, newNode.props);
    if (Object.keys(attrPatch).length > 0) {
      vnPatch.push({ type: ATTR, attrs: attrPatch });
    }
    // 比较children
    childrenWalk(oldNode.props.children, newNode.props.children);
  } else {
    vnPatch.push({ type: REPLACE, newNode });
  }
  if (vnPatch.length > 0) {
    patches[index] = vnPatch;
  }
}
function attrsWalk(oldProps, newProps) {
  let attrPatch = {};
  // 修改属性
  for (const key in oldProps) {
    if (key !== 'children' && oldProps[key] !== newProps[key]) {
      attrPatch[key] = newProps[key];
    }
  }
  // 新增属性
  for (const key in newProps) {
    if (key !== 'children' && !Object.hasOwnProperty.call(oldProps, key)) {
      attrPatch[key] = newProps[key];
    }
  }
  return attrPatch;
}
function childrenWalk(oldChildren, newChildren) {
  /**
   * props.children有四种情况：
   * 1.undefined，也就是没有children
   * 2.number/string，子节点为textNode
   * 3.object，react child object，子节点为一个react元素
   * 4.array，每个item可能是number/string或者object，有一组元素作为子节点
   */
  // 如果children是单个string/number或者react child object，需要转换成数组
  oldChildren = Array.isArray(oldChildren) ? oldChildren : [oldChildren];
  newChildren = Array.isArray(newChildren) ? newChildren : [newChildren];
  // 对每个子节点内的节点进行遍历
  oldChildren.map((c, idx) => {
    vNodeWalk(c, newChildren[idx], ++vnIndex);
  });
}
export { domDiff };
