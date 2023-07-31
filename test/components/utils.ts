import { expect } from "@jest/globals";
import * as PIXI from "pixi.js-legacy";
import fs from "fs";
import Positioner from "../../src/components/Positioner";

export function circle({
  x,
  y,
  radius,
}: {
  x?: number;
  y?: number;
  radius?: number;
} = {}): PIXI.Graphics {
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
  center,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  center?: boolean;
} = {}): PIXI.Graphics {
  x = x ?? 0;
  y = y ?? 0;
  width = width ?? 50;
  height = height ?? 50;
  center = center ?? false;

  let rect = new PIXI.Graphics();

  if (center) {
    rect.pivot.x = width / 2;
    rect.pivot.y = height / 2;
  }
  rect.beginFill(0xff0000);
  rect.drawRect(x, y, width, height);
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

export function visualTest(name: string, cb: (app: PIXI.Application) => void) {
  it(name, async () => {
    let canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);

    let app = new PIXI.Application({
      autoStart: false,
      forceCanvas: true,
      view: canvas,
      resizeTo: canvas,
      backgroundColor: 0xffffff,
    });

    app.renderer.resize(800, 600);

    cb(app);

    app.render();

    let testName = expect.getState().currentTestName;
    if (!testName) {
      throw new Error("visualTest: no currentTestName");
    }

    let path = testName.replace(/[^a-z0-9]/gi, "_");
    path = `test/screenshots/${path}.png`;

    let current = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");

    if (process.env["TEST_UPDATE_SNAPSHOTS"] || fs.existsSync(path) === false) {
      fs.writeFileSync(path, current, "base64");
    } else {
      let existing = fs.readFileSync(path, "base64");
      if (current !== existing) {
        throw new Error(`visualTest: ${path} does not match`);
      }
    }

    app.destroy();
    document.body.removeChild(canvas);
  });
}

export async function componentTest(
  name: string,
  cb: (app: PIXI.Application) => Positioner & PIXI.DisplayObject,
) {
  visualTest(name, (app) => {
    let layout = cb(app);
    app.stage.addChild(layout);
    layout.arrange(app.renderer.screen);
  });
}
