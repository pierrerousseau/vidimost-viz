
export function toHex(value) {
    return value.toString(16).padStart(2, "0");
}

export function adjust(component, value) {
    return Math.min(255, component + value * 20);
}

export function getColor(value, index = 0) {
    const baseColors = [
        { "r": 128, "g": 0, "b": 0 },
        { "r": 0, "g": 128, "b": 0 },
        { "r": 0, "g": 0, "b": 128 },
    ]
    const baseValue = Math.floor(value);
    const color = baseColors[index % baseColors.length];

    let red   = adjust(color.r, baseValue);
    let green = adjust(color.g, baseValue);
    let blue  = adjust(color.b, baseValue);

    let rgb = "#ebedf0";

    if (!!value) {
        rgb = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    }

    return rgb;
}
