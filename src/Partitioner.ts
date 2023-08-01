import { Container, DisplayObject, Graphics, Rectangle } from "pixi.js";
import Positioner from "./Positioner";
import { Leaf, LeafComponent } from "./Leaf";

export default abstract class Partitioner
  extends Container
  implements Positioner
{
  protected _debug: boolean = false;
  protected _group: DisplayObject[];
  protected _space: Rectangle | null = null;

  constructor(...children: DisplayObject[]) {
    super();
    this._group = children;
    this.sortableChildren = true;
    this.zIndex = children
      .map((child) => child.zIndex)
      .reduce((a, b) => Math.min(a, b), Infinity);
  }

  leaves(fn: (l: LeafComponent) => LeafComponent): this {
    let i = 0;
    for (let _ of this._group) {
      let child = this._group[i]!;
      if (child instanceof Partitioner) {
        child.leaves(fn);
      } else if (child instanceof LeafComponent) {
        this._group[i] = fn(child);
      } else if (child instanceof Container) {
        this._group[i] = fn(Leaf(child));
      }
      i += 1;
    }
    return this;
  }

  debug(value?: boolean): this {
    this._debug = value ?? true;
    return this;
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
    if (this._space) {
      this.arrange(this._space);
    }
  }

  arrange(space: Rectangle) {
    this._space = space.clone();
    super.removeChildren();

    let i = 0;
    for (let partition of this.partition(this._group, space)) {
      let child = this._group[i];
      if (!child) {
        throw new Error("more partitions than children");
      }

      i += 1;

      let container = new Container();
      container.x = partition.x;
      container.y = partition.y;
      container.width = partition.width;
      container.height = partition.height;
      container.zIndex = child.zIndex;

      if (this._debug) {
        let dbg = new Graphics();
        dbg.name = "dbg";
        dbg.zIndex = -Infinity;
        dbg.beginFill(0x000000, 0.05);
        dbg.drawRect(1, 1, partition.width - 2, partition.height - 2);
        dbg.endFill();
        container.addChild(dbg);
      }

      container.addChild(child);
      super.addChild(container);

      if ("_debug" in child) {
        child._debug = this._debug;
      }

      if ("arrange" in child && typeof child.arrange === "function") {
        child.arrange(new Rectangle(0, 0, partition.width, partition.height));
      }
    }

    if (i < this._group.length) {
      throw new Error("more children than partitions");
    }
  }
}
