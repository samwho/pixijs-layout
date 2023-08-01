import { Container } from "pixi.js-legacy";
import { Grid, HStack, VStack } from "../src";
import { componentTest, circle } from "./utils";

componentTest("1x2-hstack", () =>
  HStack(new Container(), new Container()).debug(),
);

componentTest("1x3-hstack", () =>
  HStack(new Container(), new Container(), new Container()).debug(),
);

componentTest("1x4-hstack", () =>
  HStack(
    new Container(),
    new Container(),
    new Container(),
    new Container(),
  ).debug(),
);

componentTest("1x4-hstack-10px-spacing", () =>
  HStack(new Container(), new Container(), new Container(), new Container())
    .debug()
    .spacing(10),
);

componentTest("3x3-vstack-hstack-circles-centered", () =>
  VStack(
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
  )
    .debug()
    .leaves((leaf) => leaf.center()),
);

componentTest("3x3-vstack-hstack-circles-fit", () =>
  VStack(
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
  )
    .debug()
    .leaves((leaf) => leaf.fit()),
);

componentTest("3x3-vstack-hstack-circles-stretch", () =>
  VStack(
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
  )
    .debug()
    .leaves((leaf) => leaf.stretch()),
);

componentTest("3x3-vstack-hstack-circles", () =>
  VStack(
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
  ).debug(),
);

componentTest("3-levels-nesting-circles-centered", () =>
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

componentTest("9-item-grid-circles-centered", () =>
  Grid(
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
  )
    .debug()
    .leaves((leaf) => leaf.center()),
);
