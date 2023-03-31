import {useAtlasNodeStore} from "@/store/AtlasNodeStore";


export const handleTextSearch = (searchText: string) => {
    const atlasNodeStore = useAtlasNodeStore();
    if(searchText){
        const regExp = new RegExp(searchText.toLowerCase());

        const result = atlasNodeStore.atlasNodes.filter(atlasNode => atlasNode.FilterTags.some(e => regExp.test(e)))
        atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
    } else {
        atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS([])
    }
}