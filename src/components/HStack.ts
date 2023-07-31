import { DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export default class HStack extends Partitioner {
  spacing: number;

  constructor(
    children: DisplayObject[] = [],
    { spacing, debug }: { spacing: number; debug?: boolean } = { spacing: 0 },
  ) {
    super(children, { debug: debug ?? false });
    this.spacing = spacing;
  }

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let x = space.x;
    let width = space.width - this.spacing * (objects.length - 1);
    for (let _ of objects) {
      let partition = new Rectangle(
        x,
        space.y,
        width / objects.length,
        space.height,
      );
      x += width / this._group.length + this.spacing;
      yield partition;
    }
  }
}
