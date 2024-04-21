import { DisplayObject, Rectangle } from "pixi.js-legacy";
import { Partitioner } from "./Partitioner";

export class LayoutContainer extends Partitioner {
  constructor(child: Partitioner) {
    super(child);
  }

  override *partition(
    _objects: DisplayObject[],
    space: Rectangle,
  ): Generator<Rectangle> {
    yield space;
  }

  override arrange(screen: Rectangle): void {
    super.arrange(screen);
  }
}
