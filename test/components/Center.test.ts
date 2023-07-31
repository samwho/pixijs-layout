import { Application, Graphics, Rectangle } from "pixi.js-legacy";
import { circle, rect, screenshot } from "./utils";
import Center from "../../src/components/Center";

let screen = new Rectangle(0, 0, 800, 600);
let canvas: HTMLCanvasElement;
let app: Application;

beforeEach(() => {
  canvas = document.createElement("canvas");
  canvas.width = screen.width;
  canvas.height = screen.height;
  document.body.appendChild(canvas);

  app = new Application({
    autoStart: false,
    forceCanvas: true,
    view: canvas,
    resizeTo: canvas,
    backgroundColor: 0xffffff,
  });

  app.renderer.resize(screen.width, screen.height);
});

afterEach(async () => {
  app.render();
  await screenshot(canvas);
  app.destroy();
  document.body.removeChild(canvas);
});

describe("Center", () => {
  it.each([
    {
      child: rect({ width: 50, height: 50 }),
      expected: [screen.width / 2, screen.height / 2, 50, 50],
    },
    {
      child: rect({ width: 200, height: 200 }),
      expected: [screen.width / 2, screen.height / 2, 200, 200],
    },
    {
      child: circle({ radius: 100 }),
      expected: [screen.width / 2, screen.height / 2, 200, 200],
    },
  ])(
    "%#",
    async ({
      child,
      expected,
    }: {
      child: Graphics;
      maxWidth?: number | string;
      maxHeight?: number | string;
      minWidth?: number | string;
      minHeight?: number | string;
      expected: number[];
    }) => {
      let layout = new Center(child);
      app.stage.addChild(layout);

      layout.arrange(app.renderer.screen);

      expect([child.x, child.y, child.width, child.height]).toStrictEqual(
        expected,
      );
    },
  );
});
