import { Container } from "pixi.js-legacy";
import { Grid, HStack, Stack, VStack } from "./src";
import { componentTest, circle, appTest, rect, tube } from "./test-utils";

componentTest("1x2-hstack", () =>
  HStack(new Container(), new Container()).debug(),
);

componentTest("1x3-hstack", () =>
  HStack(new Container(), new Container(), new Container()).debug(),
);

componentTest("1x3-circles", () =>
  HStack(circle(), circle(), circle()).leaves((leaf) =>
    leaf.fit().padding("5%"),
  ),
);

componentTest("3x1-circles", () =>
  VStack(circle(), circle(), circle()).leaves((leaf) =>
    leaf.fit().padding("5%"),
  ),
);

componentTest("adding-removing-leaves", () => {
  let component = HStack(circle(), circle(), circle()).debug();
  component.addChild(circle());
  component.removeChildAt(0);
  return component;
});

componentTest("leaf-center-left", () =>
  HStack(rect(), rect(), rect())
    .debug()
    .leaves((leaf) => leaf.center().left()),
);

componentTest("leaf-center-right", () =>
  HStack(rect(), rect(), rect())
    .debug()
    .leaves((leaf) => leaf.center().right()),
);

componentTest("leaf-center-top", () =>
  HStack(rect(), rect(), rect())
    .debug()
    .leaves((leaf) => leaf.center().top()),
);

componentTest("leaf-center-bottom", () =>
  HStack(rect(), rect(), rect())
    .debug()
    .leaves((leaf) => leaf.center().bottom()),
);

componentTest("leaf-max-width", () =>
  HStack(rect({ width: 1000, height: 1000 })).leaves((leaf) =>
    leaf.maxWidth(100),
  ),
);

componentTest("leaf-max-height", () =>
  HStack(rect({ width: 1000, height: 1000 })).leaves((leaf) =>
    leaf.maxHeight(100),
  ),
);

componentTest("leaf-min-width", () =>
  HStack(rect({ width: 10, height: 10 })).leaves((leaf) => leaf.minWidth(100)),
);

componentTest("leaf-min-height", () =>
  HStack(rect({ width: 10, height: 10 })).leaves((leaf) => leaf.minHeight(100)),
);

componentTest("leaf-fit-max-height", () =>
  HStack(rect({ width: 1000, height: 1000, center: true })).leaves((leaf) =>
    leaf.fit().maxHeight(300),
  ),
);

componentTest("leaf-fit-max-width", () =>
  HStack(rect({ width: 1000, height: 1000, center: true })).leaves((leaf) =>
    leaf.fit().maxWidth(300),
  ),
);

componentTest("leaf-fit-min-height", () =>
  HStack(rect({ width: 10, height: 10, center: true })).leaves((leaf) =>
    leaf.fit().minHeight(300),
  ),
);

componentTest("leaf-fit-min-width", () =>
  HStack(rect({ width: 10, height: 10, center: true })).leaves((leaf) =>
    leaf.fit().minWidth(300),
  ),
);

componentTest("3x3-circles", () =>
  VStack(
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
  ).leaves((leaf) => leaf.fit().padding("5%")),
);

componentTest("12x3-circles", () =>
  VStack(
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
    HStack(circle(), circle(), circle()),
  ).leaves((leaf) => leaf.fit()),
);

componentTest("3x3-circles-grid", () =>
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
  ).leaves((leaf) => leaf.fit().padding("5%")),
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

componentTest("complex-debug", () =>
  Grid(
    HStack(circle(), circle()),
    VStack(circle(), HStack(circle(), circle())),
    Grid(
      circle(),
      circle(),
      circle(),
      Grid(circle(), circle(), circle(), circle()),
    ),
    Stack(
      Stack(circle(), circle(), circle()),
      Stack(circle(), circle(), circle()),
      Stack(circle(), circle(), circle()),
    ),
  )
    .debug()
    .leaves((leaf) => leaf.fit().padding("10%")),
);

componentTest("tube-center", () =>
  HStack(tube()).leaves((leaf) => leaf.center()),
);

componentTest("tube-center-fit", () =>
  HStack(tube()).leaves((leaf) => leaf.center().fit()),
);

componentTest("tube-center-fit-padding-5pct", () =>
  HStack(tube()).leaves((leaf) => leaf.center().fit().padding("5%")),
);

componentTest("tube-center-fit-padding-5px", () =>
  HStack(tube()).leaves((leaf) => leaf.center().fit().padding(5)),
);

componentTest("grid-of-tube-fit", () =>
  Grid(
    tube(),
    tube(),
    tube(),
    tube(),
    tube(),
    tube(),
    tube(),
    tube(),
    tube(),
  ).leaves((leaf) => leaf.center().fit().padding(5)),
);

componentTest("rotated-tube-center", () =>
  HStack(tube({ angle: 90 })).leaves((leaf) => leaf.center()),
);

componentTest("rotated-tube-fit", () =>
  HStack(tube({ angle: 90 })).leaves((leaf) => leaf.fit()),
);

// Can't yet handle non-90 degree rotations
// componentTest("rotated-tube-fit-45", () =>
//   HStack(tube({ angle: 45 })).leaves((leaf) => leaf.fit()),
// );
//
// Can't yet handle non-90 degree rotations
// componentTest("rotated-tube-fit-10", () =>
//   HStack(tube({ angle: 10 })).leaves((leaf) => leaf.fit()),
// );
