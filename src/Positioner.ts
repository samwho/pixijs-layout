import { Rectangle } from "pixi.js";

export default interface Positioner {
  arrange(screen: Rectangle): void;
}
