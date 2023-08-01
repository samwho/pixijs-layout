import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export function HStack(...objects: DisplayObject[]): HStackComponent {
  return new HStackComponent(...objects);
}

export class HStackComponent extends Partitioner {
  private _spacing: number = 0;

  spacing(value: number): this {
    this._spacing = value;
    return this;
  }

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let x = space.x;
    let width = space.width - this._spacing * (objects.length - 1);
    for (let _ of objects) {
      let partition = new Rectangle(
        x,
        space.y,
        width / objects.length,
        space.height,
      );
      x += width / this._group.length + this._spacing;
      yield partition;
    }
  }
}
