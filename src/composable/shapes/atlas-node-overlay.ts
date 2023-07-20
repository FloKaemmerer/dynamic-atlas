import Konva from "konva";
import getOverlayColor from "@/composable/overlay-color-utils";

export function getOverlayCircle(id: string, atlasNodePoint: { x: number; y: number }, colorValue: number) {
    return new Konva.Circle({
        id: id + "-circle",
        x: atlasNodePoint.x,
        y: atlasNodePoint.y,
        fill: getOverlayColor(colorValue),
        radius: 20,
        opacity: 1,
    })
}

export function getOverlayRect(id: string, atlasNodePoint: { x: number; y: number }, colorValue: number) {
    return new Konva.Rect({
        id: id + "-rect",
        x: atlasNodePoint.x - 13,
        y: atlasNodePoint.y - 38,
        fill: getOverlayColor(colorValue),
        width: 25,
        height: 25,
        cornerRadius: 5,
        opacity: 1,
    })
}

export function getOverlayText(value: string, atlasNodePoint: { x: number; y: number }) {
    return new Konva.Text({
        Text: value,
        x: atlasNodePoint.x - 3,
        y: atlasNodePoint.y - 32,
        offsetX: value.length * 3.75,
        fontSize: 20,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fill: 'white',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 1,
    })
}