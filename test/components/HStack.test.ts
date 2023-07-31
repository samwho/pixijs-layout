import { Container } from "pixi.js-legacy";
import HStack from "../../src/components/HStack";
import { visualTest } from "./utils";

describe("HStack", () => {
  visualTest("2 splits", () =>
    new HStack(new Container(), new Container()).debug(),
  );
});
