import { Application, Container, Rectangle } from "pixi.js-legacy";
import Fit from "../../src/components/Fit";
import { rect, screenshot } from "./utils";

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

describe("Fit", () => {
  it.each([
    {
      child: rect({ width: 50, height: 50 }),
      expected: [0, 0, screen.height, screen.height],
    },
    {
      child: rect({ width: 200, height: 200 }),
      maxWidth: 50,
      maxHeight: 50,
      expected: [0, 0, 50, 50],
    },
  ])(
    "%#",
    async ({
      child,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      expected,
    }: {
      child: Container;
      maxWidth?: number | string;
      maxHeight?: number | string;
      minWidth?: number | string;
      minHeight?: number | string;
      expected: number[];
    }) => {
      let layout = new Fit(child, { maxWidth, maxHeight, minWidth, minHeight });
      app.stage.addChild(layout);

      layout.arrange(app.renderer.screen);

      let c = child as any;
      expect([c.x, c.y, c._width, c._height]).toStrictEqual(expected);
    },
  );
});
