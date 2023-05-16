import type {AtlasNode} from "@/model/atlasNode";
import {defineStore} from "pinia";


interface State {
    overlayNodesMap: Map<AtlasNode, number>
}

export const useOverlayStore = defineStore("overlay-nodes", {
    state: (): State => {
        return {
            overlayNodesMap: new Map(),
        }
    },

    actions: {

        SET_OVERLAY_ATLAS_NODES(overlayAtlasNodesMap: Map<AtlasNode, number>) {
            this.overlayNodesMap = overlayAtlasNodesMap;
        },
    }
})