import { Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";
var Direction;
(function (Direction) {
    Direction[Direction["Horizontal"] = 0] = "Horizontal";
    Direction[Direction["Vertical"] = 1] = "Vertical";
    Direction[Direction["Auto"] = 2] = "Auto";
})(Direction || (Direction = {}));
export function Stack(...objects) {
    return new StackComponent(...objects);
}
export function HStack(...objects) {
    return new StackComponent(...objects).horizontal();
}
export function VStack(...objects) {
    return new StackComponent(...objects).vertical();
}
export class StackComponent extends Partitioner {
    constructor(...children) {
        super(...children);
        this._spacing = 0;
        this._direction = Direction.Auto;
        this._proportions = children.map(() => 1 / children.length);
    }
    spacing(value) {
        this._spacing = value;
        return this;
    }
    horizontal() {
        this._direction = Direction.Horizontal;
        return this;
    }
    vertical() {
        this._direction = Direction.Vertical;
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
    *horizontalPartition(objects, space) {
        let i = 0;
        let x = space.x;
        let width = space.width - this._spacing * (objects.length - 1);
        for (let _ of objects) {
            let proportion = this._proportions[i++];
            let splitWidth = width * proportion;
            let partition = new Rectangle(x, space.y, splitWidth, space.height);
            x += splitWidth + this._spacing;
            yield partition;
        }
    }
    *verticalPartition(objects, space) {
        let i = 0;
        let y = space.y;
        let height = space.height - this._spacing * (objects.length - 1);
        for (let _ of objects) {
            let proportion = this._proportions[i++];
            let splitHeight = height * proportion;
            let partition = new Rectangle(space.x, y, space.width, splitHeight);
            y += splitHeight + this._spacing;
            yield partition;
        }
    }
    *partition(objects, space) {
        let direction = this._direction;
        if (direction === Direction.Auto) {
            direction =
                space.width > space.height ? Direction.Horizontal : Direction.Vertical;
        }
        if (direction === Direction.Horizontal) {
            yield* this.horizontalPartition(objects, space);
        }
        else {
            yield* this.verticalPartition(objects, space);
        }
    }
}
