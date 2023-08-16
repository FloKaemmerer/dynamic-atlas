import type {AtlasNode} from "@/model/atlasNode";
import {defineStore} from "pinia";
// @ts-ignore
import atlasNodes from "@/assets/atlas/atlasNodes.json";


interface State {
    selectedAtlasNode: AtlasNode | null
    atlasNodes: Array<AtlasNode>
    inactiveAtlasNodes: Array<AtlasNode>

    atlasNodesMap: Map<string, AtlasNode>
    filteredAtlasNodes: Array<AtlasNode>

    dropRestrictedDivinationCardNames: Array<string>
}

export const useAtlasNodeStore = defineStore("atlas-node", {
    state: (): State => {
        return {
            selectedAtlasNode: null,
            atlasNodes: [],
            inactiveAtlasNodes: [],
            atlasNodesMap: new Map(),
            filteredAtlasNodes: [],
            dropRestrictedDivinationCardNames: [],
        }
    },

    actions: {
        SET_SELECTED_ATLAS_NODE(selectedAtlasNode: AtlasNode) {
            this.selectedAtlasNode = selectedAtlasNode;
        },

        RESET_SELECTED_ATLAS_NODE() {
            this.selectedAtlasNode = null;
        },

        SET_FILTERED_ATLAS_NODE_IDS(filteredAtlasNodeIds: Array<AtlasNode>) {
            this.filteredAtlasNodes = filteredAtlasNodeIds
        },

        async setupAtlasData() {
            console.log("setting up Atlas Data")

            atlasNodes.forEach(atlasNodeElement => {
                const atlasNode = atlasNodeElement as AtlasNode
                if (atlasNode.active) {
                    atlasNode.filterTags = [atlasNode.name.toLowerCase()]
                    if (atlasNode.divinationCards) {
                        atlasNode.filterTags = atlasNode.filterTags.concat(atlasNode.divinationCards.map(value => {
                            if (!this.dropRestrictedDivinationCardNames.includes(value.name)) {
                                this.dropRestrictedDivinationCardNames.push(value.name)
                            }
                            return value.name.toLowerCase()
                        }))

                    }
                    atlasNode.filterTags = atlasNode.filterTags.concat(getMapTierFilterTags(atlasNode.mapTier))
                    atlasNode.additionalTags.forEach(tag => atlasNode.filterTags.push(tag.toLowerCase()))
                    this.atlasNodesMap.set(atlasNode.id, atlasNode)
                    this.atlasNodes.push(atlasNode)
                    if (atlasNode.divinationCards) {
                        atlasNode.divinationCards = atlasNode.divinationCards.sort((a, b) => {
                            return a.chaosValue >= b.chaosValue ? -1 : 1
                        })
                    }
                } else {
                    this.inactiveAtlasNodes.push(atlasNode)
                }
            });
            this.dropRestrictedDivinationCardNames.sort()

            function getMapTierFilterTags(mapTier: number): string[] {
                return ["tier " + mapTier, "t" + mapTier, "tier: " + mapTier, "" + mapTier, "natural tier: " + mapTier, "natural tier " + mapTier]
            }
        }
    }
})