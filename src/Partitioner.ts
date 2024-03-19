import { Container, DisplayObject, Graphics, Rectangle } from "pixi.js-legacy";
import Positioner from "./Positioner";
import { Leaf, LeafComponent } from "./Leaf";

export default abstract class Partitioner
  extends Container
  implements Positioner
{
  protected _debug: boolean = false;
  protected _group: DisplayObject[];
  protected _containers: Container[] = [];
  protected _space: Rectangle | null = null;

  constructor(...children: DisplayObject[]) {
    super();
    this._group = children;
    for (const child of children) {
      const container = new Container();
      container.addChild(child);
      this._containers.push(container);
      super.addChild(container);
    }
    this.sortableChildren = true;
    this.zIndex = children
      .map((child) => child.zIndex)
      .reduce((a, b) => Math.min(a, b), Infinity);
  }

  leaves(fn: (l: LeafComponent) => LeafComponent): this {
    let i = 0;
    for (let _ of this._group) {
      const child = this._group[i]!;
      if (child instanceof Partitioner) {
        child.leaves(fn);
      } else if (child instanceof LeafComponent) {
        this._group[i] = fn(child);
        this._containers[i]!.removeChildren();
        this._containers[i]!.addChild(this._group[i]!);
      } else if (child instanceof Container) {
        this._group[i] = fn(Leaf(child));
        this._containers[i]!.removeChildren();
        this._containers[i]!.addChild(this._group[i]!);
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
      const container = new Container();
      container.addChild(child);
      this._containers.push(container);
      super.addChild(container);
    }
    this.refresh();
    return firstChild;
  }

  override addChildAt<U extends DisplayObject>(child: U, index: number): U {
    this._group.splice(index, 0, child);
    const container = new Container();
    container.addChild(child);
    this._containers.splice(index, 0, container);
    super.addChildAt(container, index);
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
        super.removeChildAt(index);
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
    this._containers.splice(index, 1);
    super.removeChildAt(index);
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
    this._containers.splice(beginIndex ?? 0, endIndex ?? this._group.length);
    super.removeChildren(beginIndex, endIndex);
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

    let i = 0;
    for (let partition of this.partition(this._group, space)) {
      const child = this._group[i];
      if (!child) {
        throw new Error("more partitions than children");
      }

      const container = this._containers[i];
      if (!container) {
        throw new Error("more partitions than children");
      }

      container.position.set(partition.x, partition.y);

      i += 1;

      if (this._debug) {
        if (!child.parent.getChildByName("dbg")) {
          let dbg = new Graphics();
          dbg.name = "dbg";
          dbg.zIndex = -Infinity;
          dbg.beginFill(0x000000, 0.05);
          dbg.drawRect(1, 1, partition.width - 2, partition.height - 2);
          dbg.endFill();
          child.parent.addChildAt(dbg, 0);
        }
      }

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
