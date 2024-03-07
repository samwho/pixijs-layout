import { expect } from "@jest/globals";
import { Application, Renderer, Graphics, Container } from "pixi.js";
import fs from "fs";
import Positioner from "./src/Positioner";

export function circle({
  x,
  y,
  radius,
}: {
  x?: number;
  y?: number;
  radius?: number;
} = {}): Graphics {
  let circle = new Graphics();
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
} = {}): Graphics {
  x = x ?? 0;
  y = y ?? 0;
  width = width ?? 50;
  height = height ?? 50;
  center = center ?? false;

  let rect = new Graphics();

  if (center) {
    rect.pivot.x = width / 2;
    rect.pivot.y = height / 2;
  }
  rect.beginFill(0xff0000);
  rect.drawRect(x, y, width, height);
  rect.endFill();
  return rect;
}

async function innerTest(name: string, cb: (app: Application) => void) {
  let canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);

  let app = new Application<Renderer<HTMLCanvasElement>>();
  await app.init({
    autoStart: false,
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

  let path = `screenshots/${name}.png`;

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
}

export function appTest(name: string, cb: (app: Application) => void) {
  it(name, async () => await innerTest(name, cb));
}

appTest.only = (name: string, cb: (app: Application) => void) => {
  it.only(name, async () => await innerTest(name, cb));
};

export async function componentTest(
  name: string,
  cb: (app: Application) => Positioner & Container,
) {
  appTest(name, (app) => {
    let layout = cb(app);
    app.stage.addChild(layout);
    layout.arrange(app.renderer.screen);
  });
}

componentTest.only = (
  name: string,
  cb: (app: Application) => Positioner & Container,
) => {
  appTest.only(name, (app) => {
    let layout = cb(app);
    app.stage.addChild(layout);
    layout.arrange(app.renderer.screen);
  });
};
