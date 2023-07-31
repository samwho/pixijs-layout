import { Container } from "pixi.js-legacy";
import VStack from "../../src/components/VStack";
import { componentTest } from "./utils";

describe("VStack", () => {
  componentTest("2 splits", () =>
    new VStack(new Container(), new Container()).debug(),
  );
});
