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
            selectedAtlasNode: new AtlasNode("", "", "", "", "", "", false),
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
                const atlasNode = new AtlasNode(atlasNodeElement.ID,
                    atlasNodeElement.Linked,
                    atlasNodeElement.MapTier,
                    atlasNodeElement.LocX,
                    atlasNodeElement.LocY,
                    atlasNodeElement.Name,
                    atlasNodeElement.Unique);
                this.atlasNodesMap.set(atlasNodeElement.ID, atlasNode)
                this.atlasNodes.push(atlasNode)
            });
        }
    }
})