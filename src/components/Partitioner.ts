import { Container, DisplayObject, Graphics, Point, Rectangle } from "pixi.js";
import Positioner from "./Positioner";

export default abstract class Partitioner
  extends Container
  implements Positioner
{
  debug: boolean = false;
  center: boolean = true;
  _group: DisplayObject[];
  space: Rectangle | null = null;

  constructor(
    children: DisplayObject[] = [],
    { debug, center }: { debug?: boolean; center?: boolean } = {},
  ) {
    super();
    this.debug = debug ?? this.debug;
    this.center = center ?? this.center;
    this._group = children;
    this.sortableChildren = true;
    this.zIndex = children
      .map((child) => child.zIndex)
      .reduce((a, b) => Math.min(a, b), Infinity);
  }

  abstract partition(
    objects: DisplayObject[],
    space: Rectangle,
  ): IterableIterator<Rectangle>;

  override addChild<U extends DisplayObject[]>(...children: U): U[0] {
    if (children.length === 0) {
      throw new Error("Cannot add zero children");
    }

    let firstChild = children[0]!;
    for (let child of children) {
      this._group.push(child);
    }
    this.refresh();
    return firstChild;
  }

  override addChildAt<U extends DisplayObject>(child: U, index: number): U {
    this._group.splice(index, 0, child);
    this.refresh();
    return child;
  }

  override removeChild<U extends DisplayObject[]>(...children: U): U[0] {
    if (children.length === 0) {
      throw new Error("Cannot remove zero children");
    }

    let firstChild = children[0]!;
    for (let child of children) {
      let index = this._group.indexOf(child);
      if (index >= 0) {
        this._group.splice(index, 1);
      }
    }
    this.refresh();
    return firstChild;
  }

  override removeChildAt(index: number): DisplayObject {
    if (index < 0 || index >= this._group.length) {
      throw new Error("Index out of bounds");
    }

    let child = this._group[index]!;
    this._group.splice(index, 1);
    this.refresh();
    return child;
  }

  override removeChildren(
    beginIndex?: number | undefined,
    endIndex?: number | undefined,
  ): DisplayObject[] {
    let children = this._group.splice(
      beginIndex ?? 0,
      endIndex ?? this._group.length,
    );
    this.refresh();
    return children;
  }

  refresh(): void {
    if (this.space) {
      this.arrange(this.space);
    }
  }

  arrange(space: Rectangle) {
    this.space = space;
    super.removeChildren();

    let i = 0;
    for (let partition of this.partition(this._group, space)) {
      let child = this._group[i];
      if (!child) {
        throw new Error("more partitions than children");
      }

      i += 1;

      let point = this.toLocal(new Point(partition.x, partition.y));

      let container = new Container();
      container.x = point.x;
      container.y = point.y;
      container.width = partition.width;
      container.height = partition.height;
      container.zIndex = child.zIndex;

      if (this.debug) {
        let dbg = new Graphics();
        dbg.name = "dbg";
        dbg.zIndex = -Infinity;
        dbg.beginFill(0x000000, 0.05);
        dbg.drawRect(1, 1, partition.width - 2, partition.height - 2);
        dbg.endFill();
        container.addChild(dbg);
      }

      if (this.center) {
        child.x = partition.width / 2;
        child.y = partition.height / 2;
      }

      container.addChild(child);
      super.addChild(container);

      if ("debug" in child) {
        child.debug = this.debug;
      }

      if ("arrange" in child && typeof child.arrange === "function") {
        child.arrange(partition);
      }
    }

    if (i < this._group.length) {
      throw new Error("more children than partitions");
    }
  }
}
