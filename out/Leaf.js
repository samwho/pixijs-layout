import { Rectangle, Container } from "pixi.js-legacy";
import { getDimension } from "./utils";
var Resize;
(function (Resize) {
    Resize[Resize["None"] = 0] = "None";
    Resize[Resize["Fit"] = 1] = "Fit";
    Resize[Resize["Stretch"] = 2] = "Stretch";
})(Resize || (Resize = {}));
var Align;
(function (Align) {
    Align[Align["Start"] = 0] = "Start";
    Align[Align["Middle"] = 1] = "Middle";
    Align[Align["End"] = 2] = "End";
    Align[Align["None"] = 3] = "None";
})(Align || (Align = {}));
export function Leaf(child) {
    return new LeafComponent(child);
}
export class LeafComponent extends Container {
    constructor(child) {
        super();
        this._space = new Rectangle();
        this._maxWidth = Infinity;
        this._maxHeight = Infinity;
        this._minWidth = 0;
        this._minHeight = 0;
        this._padding = 0;
        this._xAlign = Align.None;
        this._yAlign = Align.None;
        this._resize = Resize.None;
        this._child = child;
        this.addChild(child);
    }
    maxWidth(value) {
        this._maxWidth = value;
        return this;
    }
    maxHeight(value) {
        this._maxHeight = value;
        return this;
    }
    minWidth(value) {
        this._minWidth = value;
        return this;
    }
    minHeight(value) {
        this._minHeight = value;
        return this;
    }
    padding(value) {
        this._padding = value;
        return this;
    }
    center() {
        this._xAlign = Align.Middle;
        this._yAlign = Align.Middle;
        return this;
    }
    left() {
        this._xAlign = Align.Start;
        return this;
    }
    right() {
        this._xAlign = Align.End;
        return this;
    }
    top() {
        this._yAlign = Align.Start;
        return this;
    }
    bottom() {
        this._yAlign = Align.End;
        return this;
    }
    fit() {
        this.center();
        this._resize = Resize.Fit;
        return this;
    }
    stretch() {
        this.center();
        this._resize = Resize.Stretch;
        return this;
    }
    arrange(space) {
        if (this._space.x === space.x &&
            this._space.y === space.y &&
            this._space.width === space.width &&
            this._space.height === space.height) {
            return;
        }
        this._space = space.clone();
        let padding = getDimension(this._padding, Math.max(space.width, space.height));
        space.x += padding;
        space.y += padding;
        space.width -= padding * 2;
        space.height -= padding * 2;
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
                }
                else {
                    height = space.width * aspectRatio;
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
            let child = this._child;
            child.arrange(this._space);
        }
    }
}
