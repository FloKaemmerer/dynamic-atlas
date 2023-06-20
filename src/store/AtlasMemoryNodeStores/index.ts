import {defineStore} from "pinia";

interface State {
    atlasMemoryNodes: Map<string, number>,
    done: boolean
}

export const useAtlasMemoryNodeStore = defineStore("atlas-memory-nodes", {
    state: (): State => {
        return {
            atlasMemoryNodes: new Map(),
            done: false
        }
    },

    actions: {
        SET_ATLAS_MEMORY_NODES(atlasMemoryNodes: Map<string, number>) {
            this.atlasMemoryNodes = atlasMemoryNodes
        },
    }
})