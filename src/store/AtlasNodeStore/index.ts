import {AtlasNode} from "@/model/atlasNode";
import {defineStore} from "pinia";
// @ts-ignore
import atlasNodes from "@/assets/atlas/atlasNodes.json";


interface State {
    selectedAtlasNode: AtlasNode
    atlasNodes: Array<AtlasNode>

    atlasNodesMap: Map<string, AtlasNode>
    filteredAtlasNodes: Array<AtlasNode>
}

export const useAtlasNodeStore = defineStore("atlas-node", {
    state: (): State => {
        return {
            selectedAtlasNode: new AtlasNode("","","",",","","",false,[],0,[],0,0,[]),
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
                const atlasNode = atlasNodeElement as AtlasNode
                atlasNode.FilterTags = [atlasNode.Name.toLowerCase()]
                if(atlasNode.DivinationCards) {
                    atlasNode.FilterTags = atlasNode.FilterTags.concat(atlasNode.DivinationCards.map(value => value.toLowerCase()))
                }
                atlasNode.FilterTags = atlasNode.FilterTags.concat(getMapTierFilterTags(atlasNode.MapTier))
                this.atlasNodesMap.set(atlasNodeElement.ID, atlasNode)
                this.atlasNodes.push(atlasNode)
            });
            function getMapTierFilterTags(mapTier: string): string[] {
                return ["tier "+mapTier,"t"+mapTier, "tier: "+mapTier,mapTier,"natural tier: "+mapTier,"natural tier "+mapTier]
            }
        }
    }
})