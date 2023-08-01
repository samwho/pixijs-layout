import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export function VStack(...objects: DisplayObject[]): VStackComponent {
  return new VStackComponent(...objects);
}

export class VStackComponent extends Partitioner {
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
    let y = space.y;
    let height = space.height - this._spacing * (objects.length - 1);
    for (let _ of objects) {
      let proportion = this._proportions[i++]!;
      let splitHeight = height * proportion;
      let partition = new Rectangle(space.x, y, space.width, splitHeight);
      y += splitHeight + this._spacing;
      yield partition;
    }
  }
}
