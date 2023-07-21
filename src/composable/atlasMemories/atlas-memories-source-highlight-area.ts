import Konva from "konva";

export function getAtlasMemoriesSourceHighlightArea(id: string, sourcePoint: { x: number; y: number }) {
    return new Konva.Circle({
        id: id + "-circle",
        x: sourcePoint.x,
        y: sourcePoint.y,
        radius: 20,
        stroke: 'black',
        strokeWidth: 3,
        fill: 'yellow',
        blurRadius: 5,
        opacity: 1,
    })
}