import Konva from "konva";

export function getFilterHighlight(id: string, atlasNodePoint: { x: number; y: number }) {
    return new Konva.Circle({
        id: id,
        x: atlasNodePoint.x,
        y: atlasNodePoint.y,
        stroke: 'black',
        strokeWidth: 3,
        fill: 'red',
        blurRadius: 5,
        radius: 25,
        opacity: 1,
    })
}