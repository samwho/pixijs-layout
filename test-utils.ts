import { expect } from "@jest/globals";
import * as PIXI from "pixi.js-legacy";
import fs from "fs";
import { Positioner } from "./src/Positioner";

export function circle({
  x,
  y,
  radius,
  layoutWidth,
  layoutHeight,
}: {
  x?: number;
  y?: number;
  radius?: number;
  layoutWidth?: number;
  layoutHeight?: number;
} = {}): PIXI.Graphics {
  let circle = new PIXI.Graphics();
  circle.beginFill(0xff0000);
  circle.drawCircle(x ?? 0, y ?? 0, radius ?? 50);
  circle.endFill();

  if (layoutWidth) {
    // @ts-expect-error
    circle.getLayoutWidth = () => layoutWidth;
  }

  if (layoutHeight) {
    // @ts-expect-error
    circle.getLayoutHeight = () => layoutHeight;
  }

  return circle;
}

export function rect({
  x,
  y,
  width,
  height,
  center,
  layoutWidth,
  layoutHeight,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  center?: boolean;
  layoutWidth?: number;
  layoutHeight?: number;
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

  if (layoutWidth) {
    // @ts-expect-error
    rect.getLayoutWidth = () => layoutWidth;
  }

  if (layoutHeight) {
    // @ts-expect-error
    rect.getLayoutHeight = () => layoutHeight;
  }

  return rect;
}

export function tube({
  x = 0,
  y = 0,
  width = 100,
  height = 50,
  center = true,
  orientation = "horizontal",
  layoutWidth,
  layoutHeight,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  center?: boolean;
  orientation?: "horizontal" | "vertical";
  layoutWidth?: number;
  layoutHeight?: number;
} = {}): PIXI.Graphics {
  let tube = new PIXI.Graphics();
  if (center) {
    tube.pivot.x = width / 2;
    tube.pivot.y = height / 2;
  }
  if (orientation === "horizontal") {
    tube.beginFill(0xff0000);
    tube.drawRect(x, y, width, height);
    tube.drawCircle(x, y + height / 2, height / 2);
    tube.drawCircle(x + width, y + height / 2, height / 2);
    tube.endFill();
  } else {
    tube.beginFill(0xff0000);
    tube.drawRect(x, y, width, height);
    tube.drawCircle(x + width / 2, y, width / 2);
    tube.drawCircle(x + width / 2, y + height, width / 2);
    tube.endFill();
  }

  if (layoutWidth) {
    // @ts-expect-error
    tube.getLayoutWidth = () => layoutWidth;
  }

  if (layoutHeight) {
    // @ts-expect-error
    tube.getLayoutHeight = () => layoutHeight;
  }

  return tube;
}

function innerTest(name: string, cb: (app: PIXI.Application) => void) {
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

export function appTest(name: string, cb: (app: PIXI.Application) => void) {
  it(name, () => innerTest(name, cb));
}

appTest.only = (name: string, cb: (app: PIXI.Application) => void) => {
  it.only(name, () => innerTest(name, cb));
};

export async function componentTest(
  name: string,
  cb: (app: PIXI.Application) => Positioner & PIXI.DisplayObject,
) {
  appTest(name, (app) => {
    let layout = cb(app);
    app.stage.addChild(layout);
    layout.arrange(app.renderer.screen);
  });
}

componentTest.only = (
  name: string,
  cb: (app: PIXI.Application) => Positioner & PIXI.DisplayObject,
) => {
  appTest.only(name, (app) => {
    let layout = cb(app);
    app.stage.addChild(layout);
    layout.arrange(new PIXI.Rectangle(0, 0, 50, 50));
    layout.arrange(app.renderer.screen);
  });
};
