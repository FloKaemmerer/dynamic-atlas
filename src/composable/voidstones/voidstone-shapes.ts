import type {Point} from "@/model/point";
import Konva from "konva";
import {useVoidStoneStore} from "@/store/voidStoneStore";

const voidStoneStore = useVoidStoneStore();

export function getNumberOfActiveVoidstonesText(voidstoneCanvasPoint: Point) {
    const id = "voidstone-sockets-text";
    const voidstoneSocketsText = "Active Voidstones: " + voidStoneStore.numberOfSocketedVoidStones + "/4";
    return new Konva.Text({
        id: id,
        Text: voidstoneSocketsText,
        x: voidstoneCanvasPoint.x,
        y: voidstoneCanvasPoint.y - 65,
        offsetX: voidstoneSocketsText.length * 3,
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