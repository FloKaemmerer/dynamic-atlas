import type {Point} from "@/model/point";
import Konva from "konva";

export function getAtlasNodeName(mapName: string, point: Point) {
    return new Konva.Text({
        Text: mapName,
        x: point.x,
        y: point.y + 15,
        offsetX: mapName.length * 3.5,
        fontSize: 12,
        fontFamily: 'Arial',
        fill: 'black',
        fontStyle: 'bold',
        shadowColor: 'white',
        shadowBlur: 10,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 1,
    })
}