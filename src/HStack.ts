import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export function HStack(...objects: DisplayObject[]): HStackComponent {
  return new HStackComponent(...objects);
}

export class HStackComponent extends Partitioner {
  private _spacing: number = 0;
  private _proportions: number[];

  constructor(...children: DisplayObject[]) {
    super(...children);
    this._proportions = children.map(() => 1 / children.length);
  }

  spacing(value: number): this {
    this._spacing = value;
    return this;
  }

  proportions(...values: number[]): this {
    if (values.length !== this._group.length) {
      throw new Error(
        `Invalid number of proportions, must match number of children. Expected ${this._group.length}, got ${values.length}.`,
      );
    }
    let sum = values.reduce((a, b) => a + b, 0);
    this._proportions = values.map((value) => value / sum);
    return this;
  }

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let i = 0;
    let x = space.x;
    let width = space.width - this._spacing * (objects.length - 1);
    for (let _ of objects) {
      let proportion = this._proportions[i++]!;
      let splitWidth = width * proportion;
      let partition = new Rectangle(x, space.y, splitWidth, space.height);
      x += splitWidth + this._spacing;
      yield partition;
    }
  }
}
