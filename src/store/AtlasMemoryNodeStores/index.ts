import {defineStore} from "pinia";
import type {AtlasMemoryPath} from "@/model/atlasMemoryPath";

interface State {
    atlasMemoryPaths: AtlasMemoryPath[],
    atlasMemoryModeEnabled: boolean,
    numberOfMemorySteps: number
}

export const useAtlasMemoryNodeStore = defineStore("atlas-memory-nodes", {
    state: (): State => {
        return {
            atlasMemoryPaths: [],
            atlasMemoryModeEnabled: false,
            numberOfMemorySteps: 3
        }
    },

    actions: {
        SET_ATLAS_MEMORY_PATHS(atlasMemoryPaths: AtlasMemoryPath[]) {
            this.atlasMemoryPaths = atlasMemoryPaths
        },

        SET_ATLAS_MEMORY_MODE_ENABLED(atlasMemoryModeEnabled: boolean) {
            this.atlasMemoryModeEnabled = atlasMemoryModeEnabled
        },

        SET_NUMBER_OF_MEMORY_STEPS(numberOfMemorySteps: number) {
            this.numberOfMemorySteps = numberOfMemorySteps
        }
    }
})