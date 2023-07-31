import { Rectangle, Container } from "pixi.js-legacy";
import Positioner from "./Positioner";
import { getDimension } from "./utils";

enum Resize {
  None,
  Fit,
  Stretch,
}

export default class Leaf extends Container implements Positioner {
  _child: Container;
  _space: Rectangle = new Rectangle();

  _maxWidth: number | string = Infinity;
  _maxHeight: number | string = Infinity;
  _minWidth: number | string = 0;
  _minHeight: number | string = 0;
  _padding: number | string = 0;
  _center: boolean = false;
  _resize: Resize = Resize.None;

  constructor(child: Container) {
    super();
    this._child = child;
    this.addChild(child);
  }

  maxWidth(value: number | string): this {
    this._maxWidth = value;
    return this;
  }

  maxHeight(value: number | string): this {
    this._maxHeight = value;
    return this;
  }

  minWidth(value: number | string): this {
    this._minWidth = value;
    return this;
  }

  minHeight(value: number | string): this {
    this._minHeight = value;
    return this;
  }

  padding(value: number | string): this {
    this._padding = value;
    return this;
  }

  center(value?: boolean): this {
    this._center = value ?? true;
    return this;
  }

  fit(): this {
    this._resize = Resize.Fit;
    return this;
  }

  stretch(): this {
    this._resize = Resize.Stretch;
    return this;
  }

  arrange(space: Rectangle): void {
    if (
      this._space.x === space.x &&
      this._space.y === space.y &&
      this._space.width === space.width &&
      this._space.height === space.height
    ) {
      return;
    }
    this._space = space.clone();

    let padding = getDimension(
      this._padding,
      Math.max(space.width, space.height),
    );

    space.x += padding;
    space.y += padding;
    space.width -= padding * 2;
    space.height -= padding * 2;

    let maxWidth = getDimension(this._maxWidth, space.width);
    let maxHeight = getDimension(this._maxHeight, space.height);
    let minWidth = getDimension(this._minWidth, space.width);
    let minHeight = getDimension(this._minHeight, space.height);
    let containerAspectRatio = space.width / space.height;
    let aspectRatio = this._child.width / this._child.height;

    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;

    switch (this._resize) {
      case Resize.Fit:
        if (containerAspectRatio > aspectRatio) {
          width = space.height * aspectRatio;
          height = space.height;
        } else {
          height = space.width * aspectRatio;
          width = space.width;
        }

        if (width > maxWidth) {
          width = maxWidth;
          height = maxWidth * aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
        if (width < minWidth) {
          width = minWidth;
          height = minWidth * aspectRatio;
        }
        if (height < minHeight) {
          height = minHeight;
          width = minHeight * aspectRatio;
        }
        break;
      case Resize.Stretch:
        width = space.width;
        height = space.height;
        break;
      case Resize.None:
        width = this._child.width;
        height = this._child.height;
        break;
    }

    if (this._center) {
      x = space.x + space.width / 2;
      y = space.y + space.height / 2;
    }

    this._child.x = x;
    this._child.y = y;
    this._child.width = width;
    this._child.height = height;

    if ("arrange" in this._child) {
      let child = this._child as Positioner;
      child.arrange(space);
    }
  }
}
