import type {AtlasNode} from "@/model/atlasNode";

const coordinatesScaleFactor = Number(`${import.meta.env.VITE_ATLAS_COORDINATES_SCALE_FACTOR}`)

export function calculateAtlasMemoryLineCoordinates(sourceNode: AtlasNode, targetNode: AtlasNode, offset: number) {
    const x1 = getScaledAtlasNodeLocX(sourceNode)
    const y1 = getScaledAtlasNodeLocY(sourceNode)
    const x2 = getScaledAtlasNodeLocX(targetNode)
    const y2 = getScaledAtlasNodeLocY(targetNode)
    const m1 = (y2 - y1) / (x2 - x1)
    const c1 = y2 - m1 * x2
    const c1o = c1 + offset;
    const m2 = (-1) / m1
    const c2 = y1 - (m2 * x1)
    const m3 = (-1) / m1
    const c3 = y2 - (m3 * x2)
    const x3Source = (c1o - c2) / (m2 - m1)
    const y3Source = m1 * ((c1o - c2) / (m2 - m1)) + c1o

    const x4Target = (c1o - c3) / (m3 - m1)
    const y4target = m1 * ((c1o - c3) / (m3 - m1)) + c1o
    return {xSource: x3Source, ySource: y3Source, xTarget: x4Target, yTarget: y4target};
}

function getScaledAtlasNodeLocX(atlasNode: AtlasNode) {
    return Number(atlasNode.locX) * coordinatesScaleFactor
}

function getScaledAtlasNodeLocY(atlasNode: AtlasNode) {
    return Number(atlasNode.locY) * coordinatesScaleFactor
}