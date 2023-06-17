import {useAtlasNodeOverlayStore} from "@/store/AtlasNodeOverlayStore";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";
import {OverlayKeys} from "@/model/overlayKeys";


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
        case OverlayKeys.OPENNESS_OVERLAY: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getOpennessOverlayNodes())
            break;
        }
        case OverlayKeys.TRAVERSABILITY_OVERLAY: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getTraversabilityOverlayNodes())
            break;
        }
        case OverlayKeys.LINEARITY_OVERLAY: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getLinearityOverlayNodes())
            break;
        }
        case OverlayKeys.TERRAIN_SLOTS_OVERLAY: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getTerrainSlotsOverlayNodes())
            break;
        }
        case OverlayKeys.BACKTRACK_FACTOR_OVERLAY: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getBacktrackFactorOverlayNodes())
            break;
        }
        case OverlayKeys.BASE_MOB_COUNT_OVERLAY: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(getBaseMobCountOverlayNodes())
            break;
        }
        default: {
            atlasNodeOverlayStore.SET_OVERLAY_ATLAS_NODES(new Map())
            break;
        }
    }
}