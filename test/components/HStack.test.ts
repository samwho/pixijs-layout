import { Container } from "pixi.js-legacy";
import { HStack } from "../../src";
import { componentTest } from "../utils";

describe("HStack", () => {
  componentTest("2 splits", () =>
    HStack(new Container(), new Container()).debug(),
  );

  componentTest("3 splits", () =>
    HStack(new Container(), new Container(), new Container()).debug(),
  );

  componentTest("4 splits", () =>
    HStack(
      new Container(),
      new Container(),
      new Container(),
      new Container(),
    ).debug(),
  );

  componentTest("4 splits, 10px spacing", () =>
    HStack(new Container(), new Container(), new Container(), new Container())
      .debug()
      .spacing(10),
  );
});
