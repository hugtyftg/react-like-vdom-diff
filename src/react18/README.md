virtual dom 格式

```ts
interface VirtualDomNode {
  $$typeof: symbol;
  key: string | null; // 真实情况下不可能是null
  ref: any | null; // 简化写法
  props: {
    children:
      | undefined
      | TextNode
      | VirtualDomNode
      | Array<VirtualDomNode | TextNode>;
    [key: string | symbol]: any;
  }; // 对象，key分为children style和其他普通属性，这里简化期间没有做class -> className的处理
  type: string; // 标签名
}
type TextNode = 'string' | 'number';
```

children 的四种情况

```
1.undefined，也就是没有children
2.number/string，子节点为textNode
3.object，react child object，子节点为一个react元素
4.array，每个item可能是number/string或者object，有一组元素作为子节点
```

注意，为了简化过程，这里的 style 是 text 格式的，直接 cssText 修改样式

```
"width: 300px; height: 300px; background-color: orange"
```

patch 格式

```ts
interface Patches {
  [vnNodeIndex: number]: Patch;
}
enum Patch {
  RemovePatch,
  TextPatch,
  AttrPatch,
  ReplacePatch,
}
type REMOVE = 'REMOVE';
type TEXT = 'TEXT';
type ATTR = 'ATTR';
type REPLACE = 'REPLACE';
interface BasicPatch {
  type: REMOVE | TEXT | ATTR | REPLACE;
}
interface RemovePatch extends BasicPatch {
  type: REMOVE;
  index: number;
}
interface TextPatch extends BasicPatch {
  type: TEXT;
  text: string | number;
}
interface AttrPatch extends BasicPatch {
  type: ATTR;
  attrs: { [key: string | symbol]: any };
}
interface ReplacePatch extends BasicPatch {
  type: REPLACE;
  newNode: VirtualDomNode;
}
```
