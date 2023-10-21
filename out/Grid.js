"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridComponent = exports.Grid = void 0;
const pixi_js_legacy_1 = require("pixi.js-legacy");
const Partitioner_1 = require("./Partitioner");
function Grid(...objects) {
    return new GridComponent(...objects);
}
exports.Grid = Grid;
class GridComponent extends Partitioner_1.default {
    constructor(...children) {
        super(...children);
    }
    *partition(objects, space) {
        let containers = objects;
        let aspectRatio = space.width / space.height;
        let rows = Math.ceil(Math.sqrt(containers.length / aspectRatio));
        let columns = Math.ceil(containers.length / rows);
        let width = space.width / columns;
        let height = space.height / rows;
        let row = 0;
        let column = 0;
        for (let _ of containers) {
            let partition = new pixi_js_legacy_1.Rectangle(space.x + column * width, space.y + row * height, width, height);
            yield partition;
            column++;
            if (column >= columns) {
                column = 0;
                row++;
            }
        }
    }
}
exports.GridComponent = GridComponent;
