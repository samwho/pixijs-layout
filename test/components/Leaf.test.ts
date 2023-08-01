import { Leaf } from "../../src";
import { circle, componentTest, visualTest } from "../utils";

describe("Leaf", () => {
  componentTest("centered circle", () => Leaf(circle()).center());
  componentTest("left circle", () => Leaf(circle()).center().left());

  componentTest("fit centered circle", () => Leaf(circle()).fit().center());

  componentTest("fit stretched circle", () =>
    Leaf(circle()).stretch().center(),
  );

  componentTest("fit stretched circle with max width", () =>
    Leaf(circle()).stretch().center().maxWidth(100),
  );

  visualTest("fit stretched circle, resized", (app) => {
    let layout = Leaf(circle()).stretch().center();
    app.stage.addChild(layout);
    layout.arrange(app.screen);

    app.renderer.resize(200, 200);
    layout.arrange(app.screen);
  });
});
