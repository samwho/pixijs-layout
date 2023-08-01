"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HStackComponent = exports.HStack = void 0;
const pixi_js_legacy_1 = require("pixi.js-legacy");
const Partitioner_1 = __importDefault(require("./Partitioner"));
function HStack(...objects) {
    return new HStackComponent(...objects);
}
exports.HStack = HStack;
class HStackComponent extends Partitioner_1.default {
    constructor(...children) {
        super(...children);
        this._spacing = 0;
        this._proportions = children.map(() => 1 / children.length);
    }
    spacing(value) {
        this._spacing = value;
        return this;
    }
    proportions(...values) {
        if (values.length !== this._group.length) {
            throw new Error(`Invalid number of proportions, must match number of children. Expected ${this._group.length}, got ${values.length}.`);
        }
        let sum = values.reduce((a, b) => a + b, 0);
        this._proportions = values.map((value) => value / sum);
        return this;
    }
    *partition(objects, space) {
        let i = 0;
        let x = space.x;
        let width = space.width - this._spacing * (objects.length - 1);
        for (let _ of objects) {
            let proportion = this._proportions[i++];
            let splitWidth = width * proportion;
            let partition = new pixi_js_legacy_1.Rectangle(x, space.y, splitWidth, space.height);
            x += splitWidth + this._spacing;
            yield partition;
        }
    }
}
exports.HStackComponent = HStackComponent;
