export function getDimension(value, reference) {
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string" && value.endsWith("%")) {
        return reference * (parseFloat(value) / 100);
    }
    throw new Error(`Invalid value: ${value}`);
}
