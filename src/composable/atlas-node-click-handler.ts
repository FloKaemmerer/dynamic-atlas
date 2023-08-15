import type {AtlasNode} from "@/model/atlasNode";
import {calculateAtlasMemoryPaths} from "@/composable/atlasMemories/atlas-memory-path-calculator";
import {useAtlasMemoryNodeStore} from "@/store/AtlasMemoryNodeStores";
import {useDetailsDrawerStore} from "@/store/DetailsDrawerStore";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";

const atlasMemoryNodeStore = useAtlasMemoryNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();
const atlasNodeStore = useAtlasNodeStore();

export function handleAtlasNodeClicked(atlasNode: AtlasNode) {
    console.log(atlasNode)
    if (atlasMemoryNodeStore.atlasMemoryModeEnabled) {
        calculateAtlasMemoryPaths(atlasNode, atlasMemoryNodeStore.numberOfMemorySteps)
    } else {
        detailsDrawerStore.SET_DRAWER(true)
    }
    if (atlasNodeStore.selectedAtlasNode == atlasNode) {
        atlasNodeStore.RESET_SELECTED_ATLAS_NODE()
    } else {
        atlasNodeStore.SET_SELECTED_ATLAS_NODE(atlasNode)
    }
}