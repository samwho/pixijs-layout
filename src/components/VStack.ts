import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export default function VStack(...objects: DisplayObject[]): VStackComponent {
  return new VStackComponent(...objects);
}

class VStackComponent extends Partitioner {
  private _spacing: number = 0;

  spacing(value: number): this {
    this._spacing = value;
    return this;
  }

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let y = space.y;
    let height = space.height - this._spacing * (objects.length - 1);
    for (let _ of objects) {
      let partition = new Rectangle(
        space.x,
        y,
        space.width,
        height / objects.length,
      );
      y += height / this._group.length + this._spacing;
      yield partition;
    }
  }
}
