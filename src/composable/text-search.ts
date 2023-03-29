import {useAtlasNodeStore} from "@/store/AtlasNodeStore";


export const handleTextSearch = (searchText: string) => {
    const atlasNodeStore = useAtlasNodeStore();
    const result = atlasNodeStore.atlasNodes.filter(atlasNode => atlasNode.Name.includes(searchText))
    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}