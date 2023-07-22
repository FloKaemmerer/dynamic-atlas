import Konva from "konva";

export function getAtlasMemoryLine(atlasMemoryLineCoordinates: {
    xSource: number;
    ySource: number;
    xTarget: number;
    yTarget: number
}, id: string, pathColor: string) {
    return new Konva.Line({
        points: [atlasMemoryLineCoordinates.xSource, atlasMemoryLineCoordinates.ySource, atlasMemoryLineCoordinates.xTarget, atlasMemoryLineCoordinates.yTarget],
        id: id + "-Line",
        stroke: pathColor,
        strokeWidth: 2,
        lineJoin: 'round',
        dash: [10, 5],
        lineCap: 'round',
    });
}