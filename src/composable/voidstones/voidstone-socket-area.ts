import Konva from "konva";
import {voidstoneCanvasPoint} from "@/composable/voidstones/voidstone-canvas-point";

export function getVoidStoneSocketKonvaImage(voidstoneSocketsImage: HTMLImageElement) {
    return new Konva.Image({
        id: "voidstone-sockets",
        image: voidstoneSocketsImage,
        x: voidstoneCanvasPoint.x,
        y: voidstoneCanvasPoint.y,
        scaleX: 0.54,
        scaleY: 0.54,
    });
}