import Konva from "konva";

export function drawVoidstoneReactiveArea(locX: number, locY: number) {
    return new Konva.RegularPolygon({
        x: locX,
        y: locY,
        sides: 4,
        radius: 15,
        fill: 'red',
        opacity: 0
    });
}