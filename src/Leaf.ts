import { Rectangle, Container } from "pixi.js-legacy";
import Positioner from "./Positioner";
import { getDimension } from "./utils";

enum Resize {
  None,
  Fit,
  Stretch,
}

enum Align {
  Start,
  Middle,
  End,
  None,
}

export function Leaf(child: Container): LeafComponent {
  return new LeafComponent(child);
}

export class LeafComponent extends Container implements Positioner {
  _child: Container;
  _space: Rectangle = new Rectangle();

  _maxWidth: number | string = Infinity;
  _maxHeight: number | string = Infinity;
  _minWidth: number | string = 0;
  _minHeight: number | string = 0;
  _padding: number | string = 0;
  _xAlign: Align = Align.None;
  _yAlign: Align = Align.None;
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

  center(): this {
    this._xAlign = Align.Middle;
    this._yAlign = Align.Middle;
    return this;
  }

  left(): this {
    this._xAlign = Align.Start;
    return this;
  }

  right(): this {
    this._xAlign = Align.End;
    return this;
  }

  top(): this {
    this._yAlign = Align.Start;
    return this;
  }

  bottom(): this {
    this._yAlign = Align.End;
    return this;
  }

  fit(): this {
    this.center();
    this._resize = Resize.Fit;
    return this;
  }

  stretch(): this {
    this.center();
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
      Math.max(this._space.width, this._space.height),
    );

    this._space.x += padding;
    this._space.y += padding;
    this._space.width -= padding * 2;
    this._space.height -= padding * 2;

    let maxWidth = getDimension(this._maxWidth, this._space.width);
    let maxHeight = getDimension(this._maxHeight, this._space.height);
    let minWidth = getDimension(this._minWidth, this._space.width);
    let minHeight = getDimension(this._minHeight, this._space.height);

    let x = this._child.x;
    let y = this._child.y;
    let width = this._child.width;
    let height = this._child.height;
    let containerAspectRatio = this._space.width / this._space.height;
    let aspectRatio = width / height;

    switch (this._resize) {
      case Resize.Fit:
        x = this._space.x;
        y = this._space.y;
        if (containerAspectRatio > aspectRatio) {
          width = this._space.height * aspectRatio;
          height = this._space.height;
        } else {
          height = this._space.width * aspectRatio;
          width = this._space.width;
        }
        break;
      case Resize.Stretch:
        x = this._space.x;
        y = this._space.y;
        width = this._space.width;
        height = this._space.height;
        break;
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

    switch (this._xAlign) {
      case Align.Start:
        x = this._space.x;
        break;
      case Align.Middle:
        x = this._space.x + this._space.width / 2;
        break;
      case Align.End:
        x = this._space.x + this._space.width - width;
        break;
    }

    switch (this._yAlign) {
      case Align.Start:
        y = this._space.y;
        break;
      case Align.Middle:
        y = this._space.y + this._space.height / 2;
        break;
      case Align.End:
        y = this._space.y + this._space.height - height;
        break;
    }

    this._child.x = x;
    this._child.y = y;
    this._child.width = width;
    this._child.height = height;

    if ("arrange" in this._child) {
      let child = this._child as Positioner;
      child.arrange(this._space);
    }
  }
}
