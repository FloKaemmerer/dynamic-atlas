import {useOverlayStore} from "@/store/OverlayStore";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";


const overlayStore = useOverlayStore();
const atlasNodeStore = useAtlasNodeStore();

function getOpennessOverlayNodes() {
    const opennessOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active) {
            opennessOverlayNodes.set(atlasNode, atlasNode.nodeLayout.openness)
        }
    })
    return opennessOverlayNodes;
}

function getTraversabilityOverlayNodes() {
    const traversabilityOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active) {
            traversabilityOverlayNodes.set(atlasNode, atlasNode.nodeLayout.traversability)
        }
    })
    return traversabilityOverlayNodes;
}

function getBacktrackFactorOverlayNodes() {
    const backTrackFactorOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active) {
            backTrackFactorOverlayNodes.set(atlasNode, atlasNode.nodeLayout.backtrackFactor)
        }
    })
    return backTrackFactorOverlayNodes;
}

function getLinearityOverlayNodes() {
    const linearityOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active) {
            linearityOverlayNodes.set(atlasNode, atlasNode.nodeLayout.linearity)
        }
    })
    return linearityOverlayNodes;
}

function getBaseMobCountOverlayNodes() {
    const baseMobCountOverlayNodes = new Map<AtlasNode, number>();
    atlasNodeStore.atlasNodes.filter(atlasNode => {
        if (atlasNode.active) {
            baseMobCountOverlayNodes.set(atlasNode, atlasNode.nodeLayout.baseMobCount)
        }
    })
    return baseMobCountOverlayNodes;
}

export const handleOverlay = (activeOverlay: string) => {

    switch (activeOverlay) {
        case "opennessOverlay": {
            overlayStore.SET_OVERLAY_ATLAS_NODES(getOpennessOverlayNodes())
            break;
        }
        case "traversabilityOverlay": {
            overlayStore.SET_OVERLAY_ATLAS_NODES(getTraversabilityOverlayNodes())
            break;
        }
        case "linearityOverlay": {
            overlayStore.SET_OVERLAY_ATLAS_NODES(getLinearityOverlayNodes())
            break;
        }
        case "backtrackFactorOverlay": {
            overlayStore.SET_OVERLAY_ATLAS_NODES(getBacktrackFactorOverlayNodes())
            break;
        }
        case "baseMobCountOverlay": {
            overlayStore.SET_OVERLAY_ATLAS_NODES(getBaseMobCountOverlayNodes())
            break;
        }
        default: {
            overlayStore.SET_OVERLAY_ATLAS_NODES(new Map())
            break;
        }
    }
}