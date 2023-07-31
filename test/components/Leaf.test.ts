import Leaf from "../../src/components/Leaf";
import { circle, componentTest, visualTest } from "../utils";

describe("Leaf", () => {
  componentTest("centered circle", () => new Leaf(circle()).center());
  componentTest("left circle", () => new Leaf(circle()).center().left());

  componentTest("fit centered circle", () => new Leaf(circle()).fit().center());

  componentTest("fit stretched circle", () =>
    new Leaf(circle()).stretch().center(),
  );

  componentTest("fit stretched circle with max width", () =>
    new Leaf(circle()).stretch().center().maxWidth(100),
  );

  visualTest("fit stretched circle, resized", (app) => {
    let layout = new Leaf(circle()).stretch().center();
    app.stage.addChild(layout);
    layout.arrange(app.screen);

    app.renderer.resize(200, 200);
    layout.arrange(app.screen);
  });
});
