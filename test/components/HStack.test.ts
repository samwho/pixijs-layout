import { Application, Container } from "pixi.js-legacy";
import HStack from "../../src/components/HStack";

describe("HStack", () => {
  it.each([
    {
      screen: [100, 100],
      splits: 2,
      spacing: 0,
      expected: [
        [0, 0, 50, 100],
        [50, 0, 50, 100],
      ],
    },
    {
      screen: [100, 100],
      splits: 3,
      spacing: 0,
      expected: [
        [0, 0, 100 / 3, 100],
        [100 / 3, 0, 100 / 3, 100],
        [(100 / 3) * 2, 0, 100 / 3, 100],
      ],
    },
    {
      screen: [100, 100],
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
      screen: [100, 100],
      splits: 2,
      spacing: 10,
      expected: [
        [0, 0, 45, 100],
        [55, 0, 45, 100],
      ],
    },
    {
      screen: [100, 100],
      splits: 3,
      spacing: 10,
      expected: [
        [0, 0, 80/3, 100],
        [80/3 + 10, 0, 80/3, 100],
        [80/3 * 2 + 20, 0, 80/3, 100],
      ],
    },
    {
      screen: [100, 100],
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
      screen,
      splits,
      spacing,
      expected,
    }: {
      screen: number[];
      spacing: number;
      splits: number;
      expected: number[][];
    }) => {
      let app = new Application({ autoStart: false });
      app.renderer.resize(screen[0]!, screen[1]!);

      let stack = new HStack(
        Array.from({ length: splits }, () => new Container()),
        { spacing },
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
