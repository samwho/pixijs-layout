import { circle, componentTest } from "../utils";
import { HStack, VStack, Leaf } from "../../src";
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
      HStack(
        Leaf(circle()).center(),
        Leaf(circle()).center(),
        Leaf(circle()).center(),
      ),
      HStack(
        Leaf(circle()).center(),
        Leaf(circle()).center(),
        Leaf(circle()).center(),
      ),
      HStack(
        Leaf(circle()).center(),
        Leaf(circle()).center(),
        Leaf(circle()).center(),
      ),
    ).debug(),
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
        VStack(
          Leaf(circle()).center(),
          Leaf(circle()).center(),
          Leaf(circle()).center(),
        ),
        VStack(
          Leaf(circle()).center(),
          Leaf(circle()).center(),
          Leaf(circle()).center(),
        ),
        VStack(
          Leaf(circle()).center(),
          Leaf(circle()).center(),
          Leaf(circle()).center(),
        ),
      ),
      HStack(
        VStack(
          Leaf(circle()).center(),
          Leaf(circle()).center(),
          Leaf(circle()).center(),
        ),
        VStack(
          Leaf(circle()).center(),
          Leaf(circle()).center(),
          Leaf(circle()).center(),
        ),
        VStack(
          Leaf(circle()).center(),
          Leaf(circle()).center(),
          Leaf(circle()).center(),
        ),
      ),
    ).debug(),
  );
});
