import {defineStore} from "pinia";
import type {AtlasMemoryPath} from "@/model/atlasMemoryPath";

interface State {
    atlasMemoryPaths: AtlasMemoryPath[],
    numberOfPathsNodeIsIncludedIn: Map<string, number>
}

export const useAtlasMemoryNodeStore = defineStore("atlas-memory-nodes", {
    state: (): State => {
        return {
            atlasMemoryPaths: [],
            numberOfPathsNodeIsIncludedIn: new Map<string, number>()
        }
    },

    actions: {
        SET_ATLAS_MEMORY_PATHS(atlasMemoryPaths: AtlasMemoryPath[]) {
            this.atlasMemoryPaths = atlasMemoryPaths
        },

        SET_NUMBER_OF_PATHS_NODE_IS_INCLUDED_IN(numberOfPathsNodeIsIncludedIn: Map<string, number>) {
            this.numberOfPathsNodeIsIncludedIn = numberOfPathsNodeIsIncludedIn
        },
    }
})