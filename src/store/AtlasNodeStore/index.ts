import type {AtlasNode} from "@/model/atlasNode";
import {defineStore} from "pinia";
// @ts-ignore
import atlasNodes from "@/assets/atlas/atlasNodes.json";


interface State {
    selectedAtlasNode: AtlasNode | null
    atlasNodes: Array<AtlasNode>

    atlasNodesMap: Map<string, AtlasNode>
    filteredAtlasNodes: Array<AtlasNode>
}

export const useAtlasNodeStore = defineStore("atlas-node", {
    state: (): State => {
        return {
            selectedAtlasNode: null,
            atlasNodes: [],
            atlasNodesMap: new Map(),
            filteredAtlasNodes: [],
        }
    },

    actions: {
        SET_SELECTED_ATLAS_NODE(selectedAtlasNode: AtlasNode) {
            this.selectedAtlasNode = selectedAtlasNode;
        },

        SET_FILTERED_ATLAS_NODE_IDS(filteredAtlasNodeIds: Array<AtlasNode>) {
            this.filteredAtlasNodes = filteredAtlasNodeIds
        },

        async setupAtlasData() {
            console.log("setting up Atlas Data")

            atlasNodes.forEach(atlasNodeElement => {
                if (atlasNodeElement.active) {
                    const atlasNode = atlasNodeElement as AtlasNode
                    atlasNode.FilterTags = [atlasNode.Name.toLowerCase()]
                    if (atlasNode.DivinationCards) {
                        atlasNode.FilterTags = atlasNode.FilterTags.concat(atlasNode.DivinationCards.map(value => value.name.toLowerCase()))
                    }
                    atlasNode.FilterTags = atlasNode.FilterTags.concat(getMapTierFilterTags(atlasNode.MapTier))
                    this.atlasNodesMap.set(atlasNode.ID, atlasNode)
                    console.log("added: " + atlasNode.Name + " using ID: " + atlasNode.ID)
                    this.atlasNodes.push(atlasNode)
                }
            });

            function getMapTierFilterTags(mapTier: number): string[] {
                return ["tier " + mapTier, "t" + mapTier, "tier: " + mapTier, "" + mapTier, "natural tier: " + mapTier, "natural tier " + mapTier]
            }
        }
    }
})