import { Container } from "pixi.js-legacy";
import VStack from "../../src/components/VStack";
import { visualTest } from "./utils";

describe("VStack", () => {
  visualTest("2 splits", () =>
    new VStack(new Container(), new Container()).debug(),
  );
});
