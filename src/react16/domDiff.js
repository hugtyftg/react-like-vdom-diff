import { ATTR, TEXT, REMOVE, REPLACE } from './patchTypes';
let patches = {}; // 要返回的补丁包
let vnIndex = 0; // 深度遍历需要的index
function domDiff(oldVDom, newVDom) {
  vNodeWalk(oldVDom, newVDom, vnIndex);
  return patches;
}
// 虚拟节点的遍历
function vNodeWalk(oldNode, newNode, index) {
  let vnPatch = [];
  if (!newNode) {
    // 移除
    vnPatch.push({ type: REMOVE, index });
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    // 文本节点的覆盖
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

    // 递归比较节点的children
    childrenWalk(oldNode.children, newNode.children);
  } else {
    // 被替换
    vnPatch.push({ type: REPLACE, newNode });
  }

  if (vnPatch.length > 0) {
    patches[index] = vnPatch;
  }
}

// 遍历新旧节点的属性
function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {};
  // 修改属性
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key];
    }
  }
  // 新增属性
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }
  return attrPatch;
}
function childrenWalk(odlChildren, newChildren) {
  // 对每个子节点内的节点进行遍历
  odlChildren.map((c, idx) => {
    vNodeWalk(c, newChildren[idx], ++vnIndex);
  });
}

export { domDiff };
