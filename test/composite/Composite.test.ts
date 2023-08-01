import { circle, componentTest } from "../utils";
import { HStack, VStack } from "../../src";
import { Container } from "pixi.js-legacy";

describe("Composite", () => {
  componentTest("HStacks in VStack", () =>
    VStack(
      HStack(new Container(), new Container(), new Container()),
      HStack(new Container(), new Container(), new Container()),
      HStack(new Container(), new Container()),
    ).debug(),
  );

  componentTest("Grid of leaves", () =>
    VStack(
      HStack(circle(), circle(), circle()),
      HStack(circle(), circle(), circle()),
      HStack(circle(), circle(), circle()),
    )
      .debug()
      .leaves((leaf) => leaf.center()),
  );

  componentTest("Grid of circles", () =>
    VStack(
      HStack(circle(), circle(), circle()),
      HStack(circle(), circle(), circle()),
      HStack(circle(), circle(), circle()),
    ).debug(),
  );

  componentTest("3 levels of nesting", () =>
    VStack(
      HStack(
        VStack(circle(), circle(), circle()),
        VStack(circle(), circle(), circle()),
        VStack(circle(), circle(), circle()),
      ),
      HStack(
        VStack(circle(), circle(), circle()),
        VStack(circle(), circle(), circle()),
        VStack(circle(), circle(), circle()),
      ),
    )
      .debug()
      .leaves((leaf) => leaf.center()),
  );
});
