import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";


export const handleSearch = (searchText: string,
                             excludePhasedBosses: boolean,
                             numberOfBosses: number[],
                             minDivinationCardValue: number,
                             layout: number[],
                             traversability: number[]) => {
    const atlasNodeStore = useAtlasNodeStore();
    let result = [] as AtlasNode[]
    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS([])
    if (searchText) {
        const regExp = new RegExp(searchText.toLowerCase());

        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode =>
            atlasNode.filterTags.some(e => regExp.test(e))))
    }

    if (numberOfBosses[0] > -1) {
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            console.log("Number of Bosses: " + atlasNode.numberOfBosses + ", Min Number: " + numberOfBosses[0] + ", Max Number: " + numberOfBosses[1])
            return numberOfBosses[0] <= atlasNode.numberOfBosses && atlasNode.numberOfBosses <= numberOfBosses[1]
        }))
    }

    if(excludePhasedBosses){
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode =>{
            return !atlasNode.phasedBoss
        } ))
    }

    if (minDivinationCardValue > 0) {
        console.log()
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            return atlasNode.highestValueDivinationCard.chaosValue  && atlasNode.highestValueDivinationCard.chaosValue >= minDivinationCardValue
        }))
    }

    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}