import { Container, DisplayObject, Rectangle } from "pixi.js";
import Positioner from "./Positioner";
import { LeafComponent } from "./Leaf";
export default abstract class Partitioner extends Container implements Positioner {
    protected _debug: boolean;
    protected _group: DisplayObject[];
    protected _space: Rectangle | null;
    constructor(...children: DisplayObject[]);
    leaves(fn: (l: LeafComponent) => LeafComponent): this;
    debug(value?: boolean): this;
    abstract partition(objects: DisplayObject[], space: Rectangle): IterableIterator<Rectangle>;
    addChild<U extends DisplayObject[]>(...children: U): U[0];
    addChildAt<U extends DisplayObject>(child: U, index: number): U;
    removeChild<U extends DisplayObject[]>(...children: U): U[0];
    removeChildAt(index: number): DisplayObject;
    removeChildren(beginIndex?: number | undefined, endIndex?: number | undefined): DisplayObject[];
    refresh(): void;
    arrange(space: Rectangle): void;
}
