import type {AtlasNode} from "@/model/atlasNode";
import {defineStore} from "pinia";


interface State {
    overlayAtlasNodesMap: Map<AtlasNode, number>
}

export const useAtlasNodeOverlayStore = defineStore("atlas-node-overlay-nodes", {
    state: (): State => {
        return {
            overlayAtlasNodesMap: new Map(),
        }
    },

    actions: {

        SET_OVERLAY_ATLAS_NODES(overlayAtlasNodesMap: Map<AtlasNode, number>) {
            this.overlayAtlasNodesMap = overlayAtlasNodesMap;
        },
    }
})