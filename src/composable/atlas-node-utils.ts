import type {AtlasNode} from "@/model/atlasNode";

const coordinatesScaleFactor = Number(`${import.meta.env.VITE_ATLAS_COORDINATES_SCALE_FACTOR}`)

export function atlasNodeToPoint(atlasNode: AtlasNode, scaled: boolean) {
    if (scaled) {
        return {x: getScaledAtlasNodeLocX(atlasNode), y: getScaledAtlasNodeLocY(atlasNode)}
    }
    return {x: Number(atlasNode.locX), y: Number(atlasNode.locY)}
}

export function locsToPoint(locX: number, locY: number, scaled: boolean) {
    if (scaled) {
        return {x: locX * coordinatesScaleFactor, y: locY * coordinatesScaleFactor}
    }
    return {x: locX, y: locY}
}

function getScaledAtlasNodeLocX(atlasNode: AtlasNode) {
    return Number(atlasNode.locX) * coordinatesScaleFactor
}

function getScaledAtlasNodeLocY(atlasNode: AtlasNode) {
    return Number(atlasNode.locY) * coordinatesScaleFactor
}