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

    //Filter by search Text
    if (searchText) {
        const regExp = new RegExp(searchText.toLowerCase());

        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode =>
            atlasNode.filterTags.some(e => regExp.test(e))))
    }

    // Filter by Number of Bosses
    if (numberOfBosses[0] > -1) {
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            console.log("Number of Bosses: " + atlasNode.numberOfBosses + ", Min Number: " + numberOfBosses[0] + ", Max Number: " + numberOfBosses[1])
            return numberOfBosses[0] <= atlasNode.numberOfBosses && atlasNode.numberOfBosses <= numberOfBosses[1]
        }))
    }

    // Filter by phased Bosses
    if (excludePhasedBosses) {
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            return !atlasNode.phasedBoss
        }))
    }

    // Filter by Divination Card Value
    if (minDivinationCardValue > 0) {
        console.log()
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= minDivinationCardValue
        }))
    }

    // Filter by Layout
    if (layout[0] > -1) {
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            console.log("Layout: " + atlasNode.layout + ", Min Number: " + layout[0] + ", Max Number: " + layout[1])
            return layout[0] <= atlasNode.layout && atlasNode.layout <= layout[1]
        }))
    }

    // Filter by traversability
    if (traversability[0] > -1) {
        result = result.concat(atlasNodeStore.atlasNodes.filter(atlasNode => {
            console.log("Traversability: " + atlasNode.traversability + ", Min Number: " + traversability[0] + ", Max Number: " + traversability[1])
            return traversability[0] <= atlasNode.traversability && atlasNode.traversability <= traversability[1]
        }))
    }

    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}