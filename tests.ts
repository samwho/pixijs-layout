import { Container } from "pixi.js-legacy";
import { Grid, HStack, Stack, VStack } from "./src";
import { componentTest, circle, appTest } from "./test-utils";

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

appTest("stack-horizontal-when-width-gt-height", (app) => {
  app.renderer.resize(400, 200);
  let stack = Stack(new Container(), new Container(), new Container()).debug();
  app.stage.addChild(stack);
  stack.arrange(app.screen);
});

appTest("stack-vertical-when-height-gt-width", (app) => {
  app.renderer.resize(200, 400);
  let stack = Stack(new Container(), new Container(), new Container()).debug();
  app.stage.addChild(stack);
  stack.arrange(app.screen);
});

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

componentTest("8-item-grid-circles-fit", () =>
  Grid(
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
  ).leaves((leaf) => leaf.fit()),
);

componentTest("8-item-grid-circles-stretch", () =>
  Grid(
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
    circle(),
  ).leaves((leaf) => leaf.stretch()),
);

componentTest("4x4-grid-in-grid", () =>
  Grid(
    circle(),
    circle(),
    circle(),
    Grid(circle(), circle(), circle(), circle()),
  ).leaves((leaf) => leaf.fit()),
);

componentTest("4x4-grid-in-grid-with-padding", () =>
  Grid(
    circle(),
    circle(),
    circle(),
    Grid(circle(), circle(), circle(), circle()),
  )
    .debug()
    .leaves((leaf) => leaf.fit().padding(10)),
);

componentTest("4x4-grid-in-grid-with-percent-padding", () =>
  Grid(
    circle(),
    circle(),
    circle(),
    Grid(circle(), circle(), circle(), circle()),
  )
    .debug()
    .leaves((leaf) => leaf.fit().padding("10%")),
);

componentTest("proportioned-vstack", () =>
  VStack(circle(), circle(), circle())
    .debug()
    .proportions(1, 2, 1)
    .leaves((leaf) => leaf.fit()),
);

componentTest("proportioned-hstack", () =>
  HStack(circle(), circle(), circle())
    .debug()
    .proportions(1, 2, 1)
    .leaves((leaf) => leaf.fit()),
);
