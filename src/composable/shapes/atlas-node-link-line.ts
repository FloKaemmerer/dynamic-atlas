import type {Point} from "@/model/point";
import Konva from "konva";

const coordinatesScaleFactor = Number(`${import.meta.env.VITE_ATLAS_COORDINATES_SCALE_FACTOR}`)
export function drawLinkLine(sourcePoint: Point, targetPoint: Point) {
    return new Konva.Line({
        points: [sourcePoint.x * coordinatesScaleFactor, sourcePoint.y * coordinatesScaleFactor, targetPoint.x * coordinatesScaleFactor, targetPoint.y * coordinatesScaleFactor],
        stroke: 'black',
        strokeWidth: 1,
        lineJoin: 'round',
        dash: [10, 5],
        lineCap: 'round',
    });
}