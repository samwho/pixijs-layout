import { Container } from "pixi.js-legacy";
import VStack from "../../src/components/VStack";
import { componentTest } from "../utils";
import HStack from "../../src/components/HStack";

describe("Composite", () => {
  componentTest("HStacks in VStack", () =>
    new VStack(
      new HStack(new Container(), new Container(), new Container()),
      new HStack(new Container(), new Container(), new Container()),
      new HStack(new Container(), new Container()),
    ).debug(),
  );
});
