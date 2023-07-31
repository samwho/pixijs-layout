import { Rectangle, Container } from "pixi.js-legacy";
import Positioner from "./Positioner";
import { getDimension } from "./utils";

export default class Fit extends Container implements Positioner {
  child: Container;
  maxWidth: number | string;
  maxHeight: number | string;
  minWidth: number | string;
  minHeight: number | string;

  constructor(
    child: Container,
    {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
    }: {
      maxWidth?: number | string | undefined;
      maxHeight?: number | string | undefined;
      minWidth?: number | string | undefined;
      minHeight?: number | string | undefined;
    } = {},
  ) {
    super();
    this.child = child;
    this.maxWidth = maxWidth ?? Infinity;
    this.maxHeight = maxHeight ?? Infinity;
    this.minWidth = minWidth ?? 0;
    this.minHeight = minHeight ?? 0;
    this.addChild(child);
  }

  _getDimension(value: number | string, reference: number): number {
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string" && value.endsWith("%")) {
      return reference * (parseFloat(value) / 100);
    }
    throw new Error(`Invalid value: ${value}`);
  }

  arrange(space: Rectangle): void {
    let maxWidth = getDimension(this.maxWidth, space.width);
    let maxHeight = getDimension(this.maxHeight, space.height);
    let minWidth = getDimension(this.minWidth, space.width);
    let minHeight = getDimension(this.minHeight, space.height);

    let containerAspectRatio = space.width / space.height;
    let aspectRatio = this.child.width / this.child.height;

    if (containerAspectRatio > aspectRatio) {
      this.child.width = space.height * aspectRatio;
      this.child.height = space.height;
    } else {
      this.child.height = space.width * aspectRatio;
      this.child.width = space.width;
    }

    if (this.child.width > maxWidth) {
      this.child.width = maxWidth;
      this.child.height = maxWidth * aspectRatio;
    }
    if (this.child.height > maxHeight) {
      this.child.height = maxHeight;
      this.child.width = maxHeight * aspectRatio;
    }
    if (this.child.width < minWidth) {
      this.child.width = minWidth;
      this.child.height = minWidth * aspectRatio;
    }
    if (this.child.height < minHeight) {
      this.child.height = minHeight;
      this.child.width = minHeight * aspectRatio;
    }
  }
}
