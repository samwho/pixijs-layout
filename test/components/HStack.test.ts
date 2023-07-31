import { Container } from "pixi.js-legacy";
import HStack from "../../src/components/HStack";
import { componentTest } from "./utils";

describe("HStack", () => {
  componentTest("2 splits", () =>
    new HStack(new Container(), new Container()).debug(),
  );

  componentTest("3 splits", () =>
    new HStack(new Container(), new Container(), new Container()).debug(),
  );

  componentTest("4 splits", () =>
    new HStack(
      new Container(),
      new Container(),
      new Container(),
      new Container(),
    ).debug(),
  );

  componentTest("4 splits, 10px spacing", () =>
    new HStack(
      new Container(),
      new Container(),
      new Container(),
      new Container(),
    )
      .debug()
      .spacing(10),
  );
});
