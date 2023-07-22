import Konva from "konva";

export function getAtlasMemoriesOverlayText(text: string, targetPoint: { x: number; y: number }) {
    return new Konva.Text({
        Text: text,
        x: targetPoint.x - 3,
        y: targetPoint.y - 32,
        offsetX: text.length * 3.75,
        fontSize: 14,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fill: 'white',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 1,
    })
}