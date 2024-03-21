import { Rectangle } from "pixi.js-legacy";

export interface Positioner {
  arrange(screen: Rectangle): void;
}

export function isPositioner(object: unknown): object is Positioner {
  return (
    typeof object === "object" &&
    object !== null &&
    "arrange" in object &&
    typeof object["arrange"] === "function"
  );
}
