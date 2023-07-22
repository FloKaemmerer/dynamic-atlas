import Konva from "konva";

export function getTooltipContainer(height: number) {
    return new Konva.Rect({
        stroke: '#555',
        strokeWidth: 5,
        fill: '#ddd',
        width: 250,
        height: height,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.2,
        cornerRadius: 10,
        visible: false,
    })
}