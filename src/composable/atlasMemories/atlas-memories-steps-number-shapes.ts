import type {Point} from "@/model/point";
import Konva from "konva";
import {useAtlasMemoryNodeStore} from "@/store/AtlasMemoryNodeStores";

const atlasMemoryNodeStore = useAtlasMemoryNodeStore();

export function getAtlasMemoryStepsUpReactiveArea(atlasMemoriesPoint: Point) {
    return new Konva.Rect({
        x: atlasMemoriesPoint.x + 25,
        y: atlasMemoriesPoint.y + 31,
        fill: 'red',
        width: 10,
        height: 10,
        opacity: 0
    })
}

export function getAtlasMemoryStepsDownReactiveArea(atlasMemoriesPoint: Point) {
    return new Konva.Rect({
        x: atlasMemoriesPoint.x + 25,
        y: atlasMemoriesPoint.y + 42,
        fill: 'blue',
        width: 10,
        height: 10,
        opacity: 0
    })
}

export function getAtlasMemoryStepsDownShape(atlasMemoriesPoint: Point) {
    return new Konva.RegularPolygon({
        x: atlasMemoriesPoint.x + 30,
        y: atlasMemoriesPoint.y + 45,
        sides: 3,
        radius: 4,
        rotation: 180,
        fill: 'black',
        stroke: 'white',
        strokeWidth: 2,
        lineJoin: 'round'
    });
}

export function getAtlasMemoryStepsUpShape(atlasMemoriesPoint: Point) {
    return new Konva.RegularPolygon({
        x: atlasMemoriesPoint.x + 30,
        y: atlasMemoriesPoint.y + 38,
        sides: 3,
        radius: 4,
        fill: 'black',
        stroke: 'white',
        strokeWidth: 2,
        lineJoin: 'round'
    });
}

export function getAtlasMemoryTitleText(atlasMemoriesPoint: Point) {
    const titleTextId = "atlas-memory-number-text";

    const atlasMemoryTitleText = "Steps: " + atlasMemoryNodeStore.numberOfMemorySteps;
    return new Konva.Text({
        id: titleTextId,
        Text: atlasMemoryTitleText,
        x: atlasMemoriesPoint.x - 15,
        y: atlasMemoriesPoint.y + 35,
        offsetX: atlasMemoryTitleText.length * 3,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: 'black',
        fontStyle: 'bold',
        shadowColor: 'white',
        shadowBlur: 10,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 1,
    })
}
