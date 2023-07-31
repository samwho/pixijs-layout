import { Application, Container } from "pixi.js-legacy";
import VStack from "../../src/components/VStack";

describe("VStack", () => {
  it.each([
    {
      screen: [100, 100],
      splits: 2,
      spacing: 0,
      expected: [
        [0, 0, 100, 50],
        [0, 50, 100, 50],
      ],
    },
    {
      screen: [100, 100],
      splits: 3,
      spacing: 0,
      expected: [
        [0, 0, 100, 100 / 3],
        [0, 100 / 3, 100, 100 / 3],
        [0, (100 / 3) * 2, 100, 100 / 3],
      ],
    },
    {
      screen: [100, 100],
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
      screen: [100, 100],
      splits: 2,
      spacing: 10,
      expected: [
        [0, 0, 100, 45],
        [0, 55, 100, 45],
      ],
    },
    {
      screen: [100, 100],
      splits: 3,
      spacing: 10,
      expected: [
        [0, 0, 100, 80 / 3],
        [0, 80 / 3 + 10, 100, 80 / 3],
        [0, (80 / 3) * 2 + 20, 100, 80 / 3],
      ],
    },
    {
      screen: [100, 100],
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

      let stack = new VStack(
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
