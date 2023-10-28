import { Container, DisplayObject, Rectangle } from "pixi.js-legacy";
import Partitioner from "./Partitioner";

export function Grid(...objects: DisplayObject[]): GridComponent {
  return new GridComponent(...objects);
}

export class GridComponent extends Partitioner {
  _centerLastRow: boolean = false;

  constructor(...children: DisplayObject[]) {
    super(...children);
  }

  centerLastRow(): GridComponent {
    this._centerLastRow = true;
    return this;
  }

  _rowsCols(n: number): number {
    for (let i = Math.ceil(Math.sqrt(n)); i >= 1; i--) {
      if (n % i === 0) {
        return i;
      }
    }
    return 1;
  }

  *partition(objects: DisplayObject[], space: Rectangle): Generator<Rectangle> {
    let containers = objects as Container[];

    let factors = [];
    for (let i = 1; i <= Math.sqrt(containers.length); i++) {
      if (containers.length % i === 0) {
        factors.push(i, containers.length / i);
      }
    }
    factors = [...new Set(factors)].sort((a, b) => a - b);

    let aspectRatio = space.width / space.height;
    let bestDiff = Infinity;
    let rows, columns;
    for (let factor of factors) {
      let possibleRows = factor;
      let possibleCols = containers.length / possibleRows;
      let diff = Math.abs(aspectRatio - possibleCols / possibleRows);
      if (diff < bestDiff) {
        bestDiff = diff;
        rows = possibleRows;
        columns = possibleCols;
      }
    }

    if (!rows || !columns) {
      rows = Math.ceil(Math.sqrt(containers.length / aspectRatio));
      columns = Math.ceil(containers.length / rows);
    }

    let width = space.width / columns;
    let height = space.height / rows;

    let row = 0;
    let column = 0;
    for (let _ of containers) {
      let shift = 0;
      if (
        this._centerLastRow &&
        row === rows - 1 &&
        columns * rows > containers.length
      ) {
        shift = ((columns * rows - containers.length) * width) / 2;
      }

      let partition = new Rectangle(
        space.x + column * width + shift,
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
