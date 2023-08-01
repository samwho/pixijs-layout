import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";
export declare function Stack(...objects: DisplayObject[]): StackComponent;
export declare function HStack(...objects: DisplayObject[]): StackComponent;
export declare function VStack(...objects: DisplayObject[]): StackComponent;
export declare class StackComponent extends Partitioner {
    private _spacing;
    private _proportions;
    private _direction;
    constructor(...children: DisplayObject[]);
    spacing(value: number): this;
    horizontal(): this;
    vertical(): this;
    proportions(...values: number[]): this;
    horizontalPartition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle>;
    verticalPartition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle>;
    partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle>;
}
