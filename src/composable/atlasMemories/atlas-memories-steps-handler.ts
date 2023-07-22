import {calculateAtlasMemoryPaths} from "@/composable/atlasMemories/atlas-memory-path-calculator";
import {useAtlasMemoryNodeStore} from "@/store/AtlasMemoryNodeStores";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";

const atlasMemoryNodeStore = useAtlasMemoryNodeStore();
const atlasNodeStore = useAtlasNodeStore();
export function decreaseAtlasMemorySteps() {
    return function () {
        if (atlasMemoryNodeStore.numberOfMemorySteps > 3) {
            atlasMemoryNodeStore.SET_NUMBER_OF_MEMORY_STEPS(atlasMemoryNodeStore.numberOfMemorySteps - 1)
            if (atlasMemoryNodeStore.atlasMemoryModeEnabled && atlasNodeStore.selectedAtlasNode) {
                calculateAtlasMemoryPaths(atlasNodeStore.selectedAtlasNode, atlasMemoryNodeStore.numberOfMemorySteps)
            }
        }
    }
}

export function increaseAtlasMemorySteps() {
    return function () {
        if (atlasMemoryNodeStore.numberOfMemorySteps < 6) {
            atlasMemoryNodeStore.SET_NUMBER_OF_MEMORY_STEPS(atlasMemoryNodeStore.numberOfMemorySteps + 1)
            if (atlasMemoryNodeStore.atlasMemoryModeEnabled && atlasNodeStore.selectedAtlasNode) {
                calculateAtlasMemoryPaths(atlasNodeStore.selectedAtlasNode, atlasMemoryNodeStore.numberOfMemorySteps)
            }
        }
    }
}