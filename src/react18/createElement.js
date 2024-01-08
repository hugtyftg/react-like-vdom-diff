function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol.for('react.element'),
    type: '',
    key: null,
    ref: null,
    props: {},
  };
  virtualDOM.type = ele;
  props && Object.assign(virtualDOM.props, props);
  if (children.length === 1) {
    virtualDOM.props.children = children[0];
  }
  if (children.length > 1) {
    virtualDOM.props.children = children;
  }
  // 如果children长度为0，那么props里没有children这个属性
  return virtualDOM;
}
export { createElement };
