import {defineStore} from "pinia";
import type {AtlasMemoryPath} from "@/model/atlasMemoryPath";

interface State {
    atlasMemoryNodes: Map<string, number>,
    atlasMemoryPaths: AtlasMemoryPath[],
    done: boolean
}

export const useAtlasMemoryNodeStore = defineStore("atlas-memory-nodes", {
    state: (): State => {
        return {
            atlasMemoryNodes: new Map(),
            atlasMemoryPaths: [],
            done: false
        }
    },

    actions: {
        SET_ATLAS_MEMORY_NODES(atlasMemoryNodes: Map<string, number>) {
            this.atlasMemoryNodes = atlasMemoryNodes
        },
        SET_ATLAS_MEMORY_PATHS(atlasMemoryPaths: AtlasMemoryPath[]) {
            this.atlasMemoryPaths = atlasMemoryPaths
        },
    }
})