import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";
export declare function HStack(...objects: DisplayObject[]): HStackComponent;
export declare class HStackComponent extends Partitioner {
    private _spacing;
    private _proportions;
    constructor(...children: DisplayObject[]);
    spacing(value: number): this;
    proportions(...values: number[]): this;
    partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle>;
}
