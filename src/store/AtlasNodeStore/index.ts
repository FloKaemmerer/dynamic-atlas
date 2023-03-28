import { AtlasNode } from "@/mixins/atlasNode";
import { defineStore } from "pinia";


interface State {
    selectedAtlasNode: AtlasNode
    atlasNodes: Array<AtlasNode>
}

export const useAtlasNodeStore = defineStore("atlas-node",{
    state: (): State => ({
        selectedAtlasNode: new AtlasNode("", "", "","", "", "",false ),
        atlasNodes: [],
    }),

    actions: {
        SET_SELECTED_ATLAS_NODE(selectedAtlasNode: AtlasNode){
            this.selectedAtlasNode = selectedAtlasNode;
        },

        SET_ATLAS_NODES(atlasNodes: Array<AtlasNode>){
            this.atlasNodes = atlasNodes;
        }
    }
})