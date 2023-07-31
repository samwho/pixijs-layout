import VStack from "../../src/components/VStack";
import { circle, componentTest } from "../utils";
import HStack from "../../src/components/HStack";
import Leaf from "../../src/components/Leaf";
import { Container } from "pixi.js-legacy";

describe("Composite", () => {
  componentTest("HStacks in VStack", () =>
    new VStack(
      new HStack(new Container(), new Container(), new Container()),
      new HStack(new Container(), new Container(), new Container()),
      new HStack(new Container(), new Container()),
    ).debug(),
  );

  componentTest("Grid of leaves", () =>
    new VStack(
      new HStack(
        new Leaf(circle()).center(),
        new Leaf(circle()).center(),
        new Leaf(circle()).center(),
      ).debug(),
      new HStack(
        new Leaf(circle()).center(),
        new Leaf(circle()).center(),
        new Leaf(circle()).center(),
      ).debug(),
      new HStack(
        new Leaf(circle()).center(),
        new Leaf(circle()).center(),
        new Leaf(circle()).center(),
      ).debug(),
    ).debug(),
  );

  componentTest("Grid of circles", () =>
    new VStack(
      new HStack(circle(), circle(), circle()),
      new HStack(circle(), circle(), circle()),
      new HStack(circle(), circle(), circle()),
    ).debug(),
  );
});
