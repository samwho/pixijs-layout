import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";
export declare function VStack(...objects: DisplayObject[]): VStackComponent;
export declare class VStackComponent extends Partitioner {
    private _spacing;
    private _proportions;
    constructor(...children: DisplayObject[]);
    spacing(value: number): this;
    proportions(...values: number[]): this;
    partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle>;
}
