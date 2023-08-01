import { Rectangle, Container } from "pixi.js-legacy";
import Positioner from "./Positioner";
declare enum Resize {
    None = 0,
    Fit = 1,
    Stretch = 2
}
declare enum Align {
    Start = 0,
    Middle = 1,
    End = 2,
    None = 3
}
export declare function Leaf(child: Container): LeafComponent;
export declare class LeafComponent extends Container implements Positioner {
    _child: Container;
    _space: Rectangle;
    _maxWidth: number | string;
    _maxHeight: number | string;
    _minWidth: number | string;
    _minHeight: number | string;
    _padding: number | string;
    _xAlign: Align;
    _yAlign: Align;
    _resize: Resize;
    constructor(child: Container);
    maxWidth(value: number | string): this;
    maxHeight(value: number | string): this;
    minWidth(value: number | string): this;
    minHeight(value: number | string): this;
    padding(value: number | string): this;
    center(): this;
    left(): this;
    right(): this;
    top(): this;
    bottom(): this;
    fit(): this;
    stretch(): this;
    arrange(space: Rectangle): void;
}
export {};
