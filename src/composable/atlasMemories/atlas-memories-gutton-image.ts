import Konva from "konva";
import {atlasMemoriesCanvasPoint} from "@/composable/atlasMemories/atlas-memories-canvas-point";

export function getAtlasMemoriesKonvaImage(atlasMemoriesImage: HTMLImageElement) {
    return new Konva.Image({
        id: "atlas-memories",
        image: atlasMemoriesImage,
        x: atlasMemoriesCanvasPoint.x,
        y: atlasMemoriesCanvasPoint.y,
        scaleX: 0.54,
        scaleY: 0.54,
    });
}