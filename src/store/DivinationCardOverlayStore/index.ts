import type {AtlasNode} from "@/model/atlasNode";
import {defineStore} from "pinia";

interface State {
    overlayDivinationCardsMap: Map<AtlasNode, number>
}

export const useDivinationCardOverlayStore = defineStore("divination-card-overlay-nodes", {
    state: (): State => {
        return {
            overlayDivinationCardsMap: new Map(),
        }
    },

    actions: {
        SET_DIVINATION_CARDS_OVERLAY_NODES(overlayAtlasNodesMap: Map<AtlasNode, number>) {
            this.overlayDivinationCardsMap = overlayAtlasNodesMap;
        },
    }
})