import {useAtlasNodeOverlayStore} from "@/store/AtlasNodeOverlayStore";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";


const atlasNodeOverlayStore = useAtlasNodeOverlayStore();
const atlasNodeStore = useAtlasNodeStore();

function getOpennessOverlayNodes() {
    const opennessOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active && !atlasNode.uniqueMap) {
            opennessOverlayNodes.set(atlasNode, atlasNode.nodeLayout.openness)
        }
    })
    return opennessOverlayNodes;
}

function getTraversabilityOverlayNodes() {
    const traversabilityOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active && !atlasNode.uniqueMap) {
            traversabilityOverlayNodes.set(atlasNode, atlasNode.nodeLayout.traversability)
        }
    })
    return traversabilityOverlayNodes;
}

function getBacktrackFactorOverlayNodes() {
    const backTrackFactorOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active && !atlasNode.uniqueMap) {
            backTrackFactorOverlayNodes.set(atlasNode, atlasNode.nodeLayout.backtrackFactor)
        }
    })
    return backTrackFactorOverlayNodes;
}

function getLinearityOverlayNodes() {
    const linearityOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active && !atlasNode.uniqueMap) {
            linearityOverlayNodes.set(atlasNode, atlasNode.nodeLayout.linearity)
        }
    })
    return linearityOverlayNodes;
}

function getTerrainSlotsOverlayNodes() {
    const terrainSlotsOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active && !atlasNode.uniqueMap) {
            terrainSlotsOverlayNodes.set(atlasNode, atlasNode.nodeLayout.terrainSlots)
        }
    })
    return terrainSlotsOverlayNodes;
}

function getBaseMobCountOverlayNodes() {
    const baseMobCountOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active && !atlasNode.uniqueMap) {
            baseMobCountOverlayNodes.set(atlasNode, atlasNode.nodeLayout.baseMobCount)
        }
    })
    return baseMobCountOverlayNodes;
}

export const handleAtlasNodeOverlay = (activeOverlay: string) => {

    switch (activeOverlay) {
        case "opennessOverlay": {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getOpennessOverlayNodes())
            break;
        }
        case "traversabilityOverlay": {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getTraversabilityOverlayNodes())
            break;
        }
        case "linearityOverlay": {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getLinearityOverlayNodes())
            break;
        }
        case "terrainSlotsOverlay": {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getTerrainSlotsOverlayNodes())
            break;
        }
        case "backtrackFactorOverlay": {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getBacktrackFactorOverlayNodes())
            break;
        }
        case "baseMobCountOverlay": {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getBaseMobCountOverlayNodes())
            break;
        }
        default: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(new Map())
            break;
        }
    }
}