import { Application, Container, Rectangle } from "pixi.js-legacy";
import VStack from "../../src/components/VStack";
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

describe("VStack", () => {
  it.each([
    {
      splits: 2,
      spacing: 0,
      expected: [
        [0, 0, 100, 50],
        [0, 50, 100, 50],
      ],
    },
    {
      splits: 3,
      spacing: 0,
      expected: [
        [0, 0, 100, 100 / 3],
        [0, 100 / 3, 100, 100 / 3],
        [0, (100 / 3) * 2, 100, 100 / 3],
      ],
    },
    {
      splits: 4,
      spacing: 0,
      expected: [
        [0, 0, 100, 25],
        [0, 25, 100, 25],
        [0, 50, 100, 25],
        [0, 75, 100, 25],
      ],
    },
    {
      splits: 2,
      spacing: 10,
      expected: [
        [0, 0, 100, 45],
        [0, 55, 100, 45],
      ],
    },
    {
      splits: 3,
      spacing: 10,
      expected: [
        [0, 0, 100, 80 / 3],
        [0, 80 / 3 + 10, 100, 80 / 3],
        [0, (80 / 3) * 2 + 20, 100, 80 / 3],
      ],
    },
    {
      splits: 4,
      spacing: 10,
      expected: [
        [0, 0, 100, 17.5],
        [0, 27.5, 100, 17.5],
        [0, 55, 100, 17.5],
        [0, 82.5, 100, 17.5],
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
      let stack = new VStack(
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
