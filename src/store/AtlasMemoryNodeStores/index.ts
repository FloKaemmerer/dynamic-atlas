import {defineStore} from "pinia";
import type {AtlasMemoryPath} from "@/model/atlasMemoryPath";

interface State {
    atlasMemoryPaths: AtlasMemoryPath[],
    atlasMemoryModeEnabled: boolean,
}

export const useAtlasMemoryNodeStore = defineStore("atlas-memory-nodes", {
    state: (): State => {
        return {
            atlasMemoryPaths: [],
            atlasMemoryModeEnabled: false,
        }
    },

    actions: {
        SET_ATLAS_MEMORY_PATHS(atlasMemoryPaths: AtlasMemoryPath[]) {
            this.atlasMemoryPaths = atlasMemoryPaths
        },

        SET_ATLAS_MEMORY_MODE_ENABLED(atlasMemoryModeEnabled: boolean) {
            this.atlasMemoryModeEnabled = atlasMemoryModeEnabled
        }
    }
})