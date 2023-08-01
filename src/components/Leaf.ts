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

    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;

    switch (this._resize) {
      case Resize.Fit:
        let containerAspectRatio = space.width / space.height;
        let aspectRatio = this._child.width / this._child.height;

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

    if (width > maxWidth) {
      width = maxWidth;
    }
    if (height > maxHeight) {
      height = maxHeight;
    }
    if (width < minWidth) {
      width = minWidth;
    }
    if (height < minHeight) {
      height = minHeight;
    }

    switch (this._xAlign) {
      case Align.Start:
        x = 0;
        break;
      case Align.Middle:
        x = space.width / 2;
        break;
      case Align.End:
        x = space.width - width;
        break;
    }

    switch (this._yAlign) {
      case Align.Start:
        y = 0;
        break;
      case Align.Middle:
        y = space.height / 2;
        break;
      case Align.End:
        y = space.height - height;
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
