> ```ts
> interface Element {
>   type: string;
>   props: Array<{ [prop: string]: any }>;
>   children: Array<Element | string | number>;
> }
> interface Patches {
>   [vnNodeIndex: number]: Patch;
> }
> enum Patch {
>   RemovePatch,
>   TextPatch,
>   AttrPatch,
>   ReplacePatch,
> }
> type TextNode = 'string' | 'number';
> type REMOVE = 'REMOVE';
> type TEXT = 'TEXT';
> type ATTR = 'ATTR';
> type REPLACE = 'REPLACE';
> interface BasicPatch {
>   type: REMOVE | TEXT | ATTR | REPLACE;
> }
> interface RemovePatch extends BasicPatch {
>   type: REMOVE;
>   index: number;
> }
> interface TextPatch extends BasicPatch {
>   type: TEXT;
>   text: string | number;
> }
> interface AttrPatch extends BasicPatch {
>   type: ATTR;
>   attrs: { [key: string | symbol]: any };
> }
> interface ReplacePatch extends BasicPatch {
>   type: REPLACE;
>   newNode: Element | TextNode;
> }
> ```
