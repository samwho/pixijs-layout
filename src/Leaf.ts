import { Rectangle, Container } from "pixi.js";
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
  _paddingTop: number | string = 0;
  _paddingBottom: number | string = 0;
  _paddingLeft: number | string = 0;
  _paddingRight: number | string = 0;
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
    this._paddingTop = value;
    this._paddingBottom = value;
    this._paddingLeft = value;
    this._paddingRight = value;
    return this;
  }

  paddingTop(value: number | string): this {
    this._paddingTop = value;
    return this;
  }

  paddingBottom(value: number | string): this {
    this._paddingBottom = value;
    return this;
  }

  paddingLeft(value: number | string): this {
    this._paddingLeft = value;
    return this;
  }

  paddingRight(value: number | string): this {
    this._paddingRight = value;
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

  arrange(rect: Rectangle): void {
    if (
      this._space.x === rect.x &&
      this._space.y === rect.y &&
      this._space.width === rect.width &&
      this._space.height === rect.height
    ) {
      return;
    }
    this._space = rect.clone();
    let space = rect.clone();

    if (this._paddingTop) {
      space.y += getDimension(this._paddingTop, space.height);
      space.height -= getDimension(this._paddingTop, space.height);
    }
    if (this._paddingBottom) {
      space.height -= getDimension(this._paddingBottom, space.height);
    }
    if (this._paddingLeft) {
      space.x += getDimension(this._paddingLeft, space.width);
      space.width -= getDimension(this._paddingLeft, space.width);
    }
    if (this._paddingRight) {
      space.width -= getDimension(this._paddingRight, space.width);
    }

    let maxWidth = getDimension(this._maxWidth, space.width);
    let maxHeight = getDimension(this._maxHeight, space.height);
    let minWidth = getDimension(this._minWidth, space.width);
    let minHeight = getDimension(this._minHeight, space.height);

    let x = this._child.x;
    let y = this._child.y;
    let width = this._child.width;
    let height = this._child.height;
    let containerAspectRatio = space.width / space.height;
    let aspectRatio = width / height;

    switch (this._resize) {
      case Resize.Fit:
        x = space.x;
        y = space.y;
        if (containerAspectRatio > aspectRatio) {
          width = space.height * aspectRatio;
          height = space.height;
        } else {
          height = space.width / aspectRatio;
          width = space.width;
        }
        break;
      case Resize.Stretch:
        x = space.x;
        y = space.y;
        width = space.width;
        height = space.height;
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
        x = space.x;
        break;
      case Align.Middle:
        x = space.x + space.width / 2;
        break;
      case Align.End:
        x = space.x + space.width - width;
        break;
    }

    switch (this._yAlign) {
      case Align.Start:
        y = space.y;
        break;
      case Align.Middle:
        y = space.y + space.height / 2;
        break;
      case Align.End:
        y = space.y + space.height - height;
        break;
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
