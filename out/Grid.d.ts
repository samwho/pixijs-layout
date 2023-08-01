import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";
export declare function Grid(...objects: DisplayObject[]): GridComponent;
export declare class GridComponent extends Partitioner {
    constructor(...children: DisplayObject[]);
    partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle>;
}
