import Leaf from "../../src/components/Leaf";
import { circle, visualTest } from "./utils";

describe("Leaf", () => {
  visualTest("fit centered circle", () => new Leaf(circle()).fit().center());
});
