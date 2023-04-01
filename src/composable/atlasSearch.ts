import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";


export const handleSearch = (searchText: string, includeNumberOfBosses: boolean, numberOfBosses: number[]) => {
    const atlasNodeStore = useAtlasNodeStore();
    let result = [] as AtlasNode[]
    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS([])
    if (searchText) {
        const regExp = new RegExp(searchText.toLowerCase()) ;

         result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode =>
            atlasNode.FilterTags.some(e => regExp.test(e)) ))
    }
    if (includeNumberOfBosses){

        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            console.log("Number of Bosses: "+atlasNode.NumberOfBosses+", Min Number: "+numberOfBosses[0]+", Max Number: "+numberOfBosses[1])
            return numberOfBosses[0] <= atlasNode.NumberOfBosses && atlasNode.NumberOfBosses <= numberOfBosses[1]
        }))
    }

    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}