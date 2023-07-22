import Konva from "konva";
import type {Point} from "@/model/point";

export function drawVoidstoneReactiveArea(point: Point) {
    return new Konva.RegularPolygon({
        x: point.x,
        y: point.y,
        sides: 4,
        radius: 15,
        fill: 'red',
        opacity: 0
    });
}