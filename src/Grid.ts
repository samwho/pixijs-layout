import { Container, DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export function Grid(...objects: DisplayObject[]): GridComponent {
  return new GridComponent(...objects);
}

export class GridComponent extends Partitioner {
  constructor(...children: DisplayObject[]) {
    super(...children);
  }

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let containers = objects as Container[];

    let aspectRatio = space.width / space.height;
    let rows = Math.ceil(Math.sqrt(containers.length / aspectRatio));
    let columns = Math.ceil(containers.length / rows);
    let width = space.width / columns;
    let height = space.height / rows;

    let row = 0;
    let column = 0;
    for (let _ of containers) {
      let partition = new Rectangle(
        space.x + column * width,
        space.y + row * height,
        width,
        height,
      );
      yield partition;

      column++;
      if (column >= columns) {
        column = 0;
        row++;
      }
    }
  }
}
