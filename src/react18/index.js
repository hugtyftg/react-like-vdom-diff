import { createElement } from './createElement';
import { doPatch } from './doPatch';
import { domDiff } from './domDiff';
import { mountDOM, render } from './render';
const vDom1 = createElement(
  'ul',
  {
    class: 'list',
    style: 'width: 300px; height: 300px; background-color: orange',
  },
  createElement(
    'li',
    { class: 'item', 'data-index': 0 },
    createElement('p', { class: 'text' }, '第一个列表项')
  ),
  createElement(
    'li',
    { class: 'item', 'data-index': 1 },
    createElement(
      'p',
      { class: 'text' },
      createElement('span', { class: 'title' }, '第二个列表项')
    )
  ),
  createElement('li', { class: 'item', 'data-index': 2 }, '第三个列表项')
);
const vDom2 = createElement(
  'ul',
  {
    class: 'list-wrap',
    style: 'width: 300px; height: 300px; background-color: orange',
  },
  createElement(
    'li',
    { class: 'item', 'data-index': 0 },
    createElement('p', { class: 'title' }, '特殊列表项')
  ),
  createElement(
    'li',
    { class: 'item', 'data-index': 1 },
    createElement('p', { class: 'text' })
  ),
  createElement('div', { class: 'item', 'data-index': 2 }, '第三个列表项')
);
console.log(vDom1);
console.log(vDom2);
const rdom = render(vDom1);
mountDOM(rdom, document.querySelector('#app'));
const patches = domDiff(vDom1, vDom2);
console.log(patches);
setTimeout(() => {
  doPatch(rdom, patches);
}, 1000);
