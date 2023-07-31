import { Container } from "pixi.js-legacy";
import HStack from "../../src/components/HStack";
import { visualTest } from "./utils";

describe("HStack", () => {
  visualTest("2 splits", () =>
    new HStack(new Container(), new Container()).debug(),
  );

  visualTest("3 splits", () =>
    new HStack(new Container(), new Container(), new Container()).debug(),
  );

  visualTest("4 splits", () =>
    new HStack(
      new Container(),
      new Container(),
      new Container(),
      new Container(),
    ).debug(),
  );

  visualTest("4 splits, 10px spacing", () =>
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
