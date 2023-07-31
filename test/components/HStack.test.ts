import { Application, Container, Rectangle } from "pixi.js-legacy";
import HStack from "../../src/components/HStack";
import { screenshot } from "./utils";

let screen = new Rectangle(0, 0, 100, 100);
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

describe("HStack", () => {
  it.each([
    {
      splits: 2,
      spacing: 0,
      expected: [
        [0, 0, 50, 100],
        [50, 0, 50, 100],
      ],
    },
    {
      splits: 3,
      spacing: 0,
      expected: [
        [0, 0, 100 / 3, 100],
        [100 / 3, 0, 100 / 3, 100],
        [(100 / 3) * 2, 0, 100 / 3, 100],
      ],
    },
    {
      splits: 4,
      spacing: 0,
      expected: [
        [0, 0, 25, 100],
        [25, 0, 25, 100],
        [50, 0, 25, 100],
        [75, 0, 25, 100],
      ],
    },
    {
      splits: 2,
      spacing: 10,
      expected: [
        [0, 0, 45, 100],
        [55, 0, 45, 100],
      ],
    },
    {
      splits: 3,
      spacing: 10,
      expected: [
        [0, 0, 80/3, 100],
        [80/3 + 10, 0, 80/3, 100],
        [80/3 * 2 + 20, 0, 80/3, 100],
      ],
    },
    {
      splits: 4,
      spacing: 10,
      expected: [
        [0, 0, 17.5, 100],
        [27.5, 0, 17.5, 100],
        [55, 0, 17.5, 100],
        [82.5, 0, 17.5, 100],
      ],
    },
  ])(
    "splits: $splits, spacing: $spacing",
    ({
      splits,
      spacing,
      expected,
    }: {
      spacing: number;
      splits: number;
      expected: number[][];
    }) => {
      let stack = new HStack(
        Array.from({ length: splits }, () => new Container()),
        { spacing, debug: true },
      );
      app.stage.addChild(stack);

      stack.arrange(app.renderer.screen);

      let actual = stack.children.map((c) => {
        let child = c as any;
        return [child.x, child.y, child._width, child._height];
      });

      expect(actual).toStrictEqual(expected);
    },
  );
});
