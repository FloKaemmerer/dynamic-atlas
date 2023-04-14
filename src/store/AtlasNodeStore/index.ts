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
                    atlasNode.filterTags = [atlasNode.name.toLowerCase()]
                    if (atlasNode.divinationCards) {
                        atlasNode.filterTags = atlasNode.filterTags.concat(atlasNode.divinationCards.map(value => value.name.toLowerCase()))
                    }
                    atlasNode.filterTags = atlasNode.filterTags.concat(getMapTierFilterTags(atlasNode.mapTier))
                    this.atlasNodesMap.set(atlasNode.id, atlasNode)
                    console.log("added: " + atlasNode.name + " using ID: " + atlasNode.id)
                    this.atlasNodes.push(atlasNode)
                    if (atlasNode.divinationCards) {
                        atlasNode.divinationCards = atlasNode.divinationCards.sort((a, b) => {
                            return a.chaosValue >= b.chaosValue ? -1 : 1
                        })
                    }
                }
            });

            function getMapTierFilterTags(mapTier: number): string[] {
                return ["tier " + mapTier, "t" + mapTier, "tier: " + mapTier, "" + mapTier, "natural tier: " + mapTier, "natural tier " + mapTier]
            }
        }
    }
})