"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_legacy_1 = require("pixi.js-legacy");
const Leaf_1 = require("./Leaf");
class Partitioner extends pixi_js_legacy_1.Container {
    constructor(...children) {
        super();
        this._debug = false;
        this._space = null;
        this._group = children;
        this.sortableChildren = true;
        this.zIndex = children
            .map((child) => child.zIndex)
            .reduce((a, b) => Math.min(a, b), Infinity);
    }
    leaves(fn) {
        let i = 0;
        for (let _ of this._group) {
            let child = this._group[i];
            if (child instanceof Partitioner) {
                child.leaves(fn);
            }
            else if (child instanceof Leaf_1.LeafComponent) {
                this._group[i] = fn(child);
            }
            else if (child instanceof pixi_js_legacy_1.Container) {
                this._group[i] = fn((0, Leaf_1.Leaf)(child));
            }
            i += 1;
        }
        return this;
    }
    debug(value) {
        this._debug = value !== null && value !== void 0 ? value : true;
        return this;
    }
    addChild(...children) {
        if (children.length === 0) {
            throw new Error("Cannot add zero children");
        }
        let firstChild = children[0];
        for (let child of children) {
            this._group.push(child);
        }
        this.refresh();
        return firstChild;
    }
    addChildAt(child, index) {
        this._group.splice(index, 0, child);
        this.refresh();
        return child;
    }
    removeChild(...children) {
        if (children.length === 0) {
            throw new Error("Cannot remove zero children");
        }
        let firstChild = children[0];
        for (let child of children) {
            let index = this._group.indexOf(child);
            if (index >= 0) {
                this._group.splice(index, 1);
            }
        }
        this.refresh();
        return firstChild;
    }
    removeChildAt(index) {
        if (index < 0 || index >= this._group.length) {
            throw new Error("Index out of bounds");
        }
        let child = this._group[index];
        this._group.splice(index, 1);
        this.refresh();
        return child;
    }
    removeChildren(beginIndex, endIndex) {
        let children = this._group.splice(beginIndex !== null && beginIndex !== void 0 ? beginIndex : 0, endIndex !== null && endIndex !== void 0 ? endIndex : this._group.length);
        this.refresh();
        return children;
    }
    refresh() {
        if (this._space) {
            this.arrange(this._space);
        }
    }
    arrange(space) {
        this._space = space.clone();
        super.removeChildren();
        let i = 0;
        for (let partition of this.partition(this._group, space)) {
            let child = this._group[i];
            if (!child) {
                throw new Error("more partitions than children");
            }
            i += 1;
            let container = new pixi_js_legacy_1.Container();
            container.x = partition.x;
            container.y = partition.y;
            container.width = partition.width;
            container.height = partition.height;
            container.zIndex = child.zIndex;
            if (this._debug) {
                let dbg = new pixi_js_legacy_1.Graphics();
                dbg.name = "dbg";
                dbg.zIndex = -Infinity;
                dbg.beginFill(0x000000, 0.05);
                dbg.drawRect(1, 1, partition.width - 2, partition.height - 2);
                dbg.endFill();
                container.addChild(dbg);
            }
            container.addChild(child);
            super.addChild(container);
            if ("_debug" in child) {
                child._debug = this._debug;
            }
            if ("arrange" in child && typeof child.arrange === "function") {
                child.arrange(new pixi_js_legacy_1.Rectangle(0, 0, partition.width, partition.height));
            }
        }
        if (i < this._group.length) {
            throw new Error("more children than partitions");
        }
    }
}
exports.default = Partitioner;
