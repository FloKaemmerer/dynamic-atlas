import type {Point} from "@/model/point";
import Konva from "konva";

export function getAtlasNodeImage(konvaImageId: string, image: HTMLImageElement, point: Point) {
    return new Konva.Image({
        id: konvaImageId,
        image: image,
        x: point.x,
        y: point.y,
        scaleX: 0.25,
        scaleY: 0.25,
    })
}