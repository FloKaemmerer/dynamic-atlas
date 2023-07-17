import type {AtlasNode} from "@/model/atlasNode";

const coordinatesScaleFactor = Number(`${import.meta.env.VITE_ATLAS_COORDINATES_SCALE_FACTOR}`)
export function toPoint(atlasNode: AtlasNode) {
    return {x: getScaledAtlasNodeLocX(atlasNode), y: getScaledAtlasNodeLocY(atlasNode)}
}

function getScaledAtlasNodeLocX(atlasNode: AtlasNode) {
    return Number(atlasNode.locX) * coordinatesScaleFactor
}

function getScaledAtlasNodeLocY(atlasNode: AtlasNode) {
    return Number(atlasNode.locY) * coordinatesScaleFactor
}