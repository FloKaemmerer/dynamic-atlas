import { AtlasNode } from "@/model/atlasNode";
import { defineStore } from "pinia";
// @ts-ignore
import atlasNodes from "@/assets/atlas/atlasNodes.json";


interface State {
    selectedAtlasNode: AtlasNode
    atlasNodes: Array<AtlasNode>

    atlasNodesMap: Map<string, AtlasNode>
}

export const useAtlasNodeStore = defineStore("atlas-node",{
    state: (): State => ({
        selectedAtlasNode: new AtlasNode("", "", "","", "", "",false ),
        atlasNodes: [],
        atlasNodesMap: new Map(),
    }),

    actions: {
        SET_SELECTED_ATLAS_NODE(selectedAtlasNode: AtlasNode){
            this.selectedAtlasNode = selectedAtlasNode;
        },

        async setupAtlasData(){
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