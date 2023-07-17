import type {Point} from "@/model/point";
import Konva from "konva";

export function getReactiveAtlasMemoriesArea(point: Point) {
    return new Konva.Circle({
        x: point.x,
        y: point.y - 3,
        stroke: 'black',
        strokeWidth: 4,
        radius: 30,
        opacity: 0
    })
}