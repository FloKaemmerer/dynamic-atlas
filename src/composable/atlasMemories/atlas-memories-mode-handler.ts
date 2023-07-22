import {useAtlasMemoryNodeStore} from "@/store/AtlasMemoryNodeStores";

const atlasMemoryNodeStore = useAtlasMemoryNodeStore();

export function toggleAtlasMemoryMode() {
    return function () {
        atlasMemoryNodeStore.SET_ATLAS_MEMORY_PATHS([])
        atlasMemoryNodeStore.SET_ATLAS_MEMORY_MODE_ENABLED(!atlasMemoryNodeStore.atlasMemoryModeEnabled)
    }
}