import { Container } from "pixi.js-legacy";
import { VStack } from "../../src";
import { componentTest } from "../utils";

describe("VStack", () => {
  componentTest("2 splits", () =>
    VStack(new Container(), new Container()).debug(),
  );
});
