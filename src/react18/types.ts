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
  newNode: VirtualDomNode | TextNode;
}
