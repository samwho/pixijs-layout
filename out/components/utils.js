"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDimension = void 0;
function getDimension(value, reference) {
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string" && value.endsWith("%")) {
        return reference * (parseFloat(value) / 100);
    }
    throw new Error(`Invalid value: ${value}`);
}
exports.getDimension = getDimension;
