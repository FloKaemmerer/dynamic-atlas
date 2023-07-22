import Konva from "konva";
import {atlasMemoriesCanvasPoint} from "@/composable/atlasMemories/atlas-memories-canvas-point";

export function getAtlasMemoriesButtonHighlightArea() {
    const atlasMemoriesHighlightArea = new Konva.Circle({
        id: "atlas-memories-circle",
        x: atlasMemoriesCanvasPoint.x,
        y: atlasMemoriesCanvasPoint.y,
        stroke: 'black',
        strokeWidth: 3,
        fill: 'yellow',
        blurRadius: 5,
        radius: 30,
        opacity: 1,
    })
    atlasMemoriesHighlightArea.cache()
    atlasMemoriesHighlightArea.filters([Konva.Filters.Blur]);
    return atlasMemoriesHighlightArea;
}