import * as PIXI from "pixi.js-legacy";
import fs from "fs";

export function circle({
  x,
  y,
  radius,
}: {
  x?: number;
  y?: number;
  radius?: number;
}): PIXI.Graphics {
  let circle = new PIXI.Graphics();
  circle.beginFill(0xff0000);
  circle.drawCircle(x ?? 0, y ?? 0, radius ?? 50);
  circle.endFill();
  return circle;
}

export function rect({
  x,
  y,
  width,
  height,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}): PIXI.Graphics {
  let rect = new PIXI.Graphics();
  rect.beginFill(0xff0000);
  rect.drawRect(x ?? 0, y ?? 0, width ?? 50, height ?? 50);
  rect.endFill();
  return rect;
}

export async function screenshot(app: PIXI.Application | HTMLCanvasElement) {
  let base64: string;
  if (app instanceof HTMLCanvasElement) {
    base64 = app.toDataURL();
  } else {
    base64 = await app.renderer.extract.base64(app.stage);
  }
  base64 = base64.replace(/^data:image\/png;base64,/, "");

  let name = expect.getState().currentTestName || Date.now().toString();
  name = name.replace(/[^a-z0-9]/gi, "_");
  let path = `test/screenshots/${name}.png`;

  fs.writeFileSync(path, base64, "base64");
}
