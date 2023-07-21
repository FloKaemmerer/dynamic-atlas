import Konva from "konva";
import type {Point} from "@/model/point";

export function getVoiodStoneKonvaImage(id: string, voidstonePoint: Point, voidstoneImage: HTMLImageElement) {
    return new Konva.Image({
        id: id,
        image: voidstoneImage,
        x: voidstonePoint.x,
        y: voidstonePoint.y,
        scaleX: 0.20,
        scaleY: 0.20,
        opacity: 0
    });
}