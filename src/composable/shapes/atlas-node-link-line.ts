import type {Point} from "@/model/point";
import Konva from "konva";

export function drawLinkLine(sourcePoint: Point, targetPoint: Point) {
    return new Konva.Line({
        points: [sourcePoint.x , sourcePoint.y , targetPoint.x , targetPoint.y ],
        stroke: 'black',
        strokeWidth: 1,
        lineJoin: 'round',
        dash: [10, 5],
        lineCap: 'round',
    });
}