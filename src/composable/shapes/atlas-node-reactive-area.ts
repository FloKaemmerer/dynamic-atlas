import type {Point} from "@/model/point";
import Konva from "konva";

export function getReactiveNodeArea(point: Point) {
    return new Konva.Circle({
        x: point.x,
        y: point.y,
        stroke: 'black',
        strokeWidth: 4,
        radius: 20,
        opacity: 0
    })
}