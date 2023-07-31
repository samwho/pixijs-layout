import { Rectangle, Container } from "pixi.js-legacy";
import Positioner from "./Positioner";

export default class Center extends Container implements Positioner {
  child: Container;

  constructor(child: Container) {
    super();
    this.child = child;
    this.addChild(child);
  }

  arrange(space: Rectangle): void {
    this.child.x = space.x + space.width / 2;
    this.child.y = space.y + space.height / 2;
  }
}
