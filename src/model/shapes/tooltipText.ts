import Konva from "konva";

export function drawTooltipBaseText() {
    return new Konva.Text({
        text: "",
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: '#555',
        width: 250,
        padding: 20,
        align: 'left',
        visible: false,
    })
}