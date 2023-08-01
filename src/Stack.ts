import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

enum Direction {
  Horizontal,
  Vertical,
  Auto,
}

export function Stack(...objects: DisplayObject[]): StackComponent {
  return new StackComponent(...objects);
}

export function HStack(...objects: DisplayObject[]): StackComponent {
  return new StackComponent(...objects).horizontal();
}

export function VStack(...objects: DisplayObject[]): StackComponent {
  return new StackComponent(...objects).vertical();
}

export class StackComponent extends Partitioner {
  private _spacing: number = 0;
  private _proportions: number[];
  private _direction: Direction = Direction.Auto;

  constructor(...children: DisplayObject[]) {
    super(...children);
    this._proportions = children.map(() => 1 / children.length);
  }

  spacing(value: number): this {
    this._spacing = value;
    return this;
  }

  horizontal(): this {
    this._direction = Direction.Horizontal;
    return this;
  }

  vertical(): this {
    this._direction = Direction.Vertical;
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

  *horizontalPartition(
    objects: DisplayObject[],
    space: Rectangle,
  ): Generator<Rectangle> {
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

  *verticalPartition(
    objects: DisplayObject[],
    space: Rectangle,
  ): Generator<Rectangle> {
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

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let direction = this._direction;
    if (direction === Direction.Auto) {
      direction =
        space.width > space.height ? Direction.Horizontal : Direction.Vertical;
    }

    if (direction === Direction.Horizontal) {
      yield* this.horizontalPartition(objects, space);
    } else {
      yield* this.verticalPartition(objects, space);
    }
  }
}
