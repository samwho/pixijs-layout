export interface LayoutSize {
  getLayoutWidth(): number;
  getLayoutHeight(): number;
}

export function isLayoutSize(object: unknown): object is LayoutSize {
  return (
    typeof object === "object" &&
    object !== null &&
    "getLayoutWidth" in object &&
    "getLayoutHeight" in object &&
    typeof object["getLayoutWidth"] === "function" &&
    typeof object["getLayoutHeight"] === "function"
  );
}
