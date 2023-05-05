import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";

export const handleFilter = (filterText: string,
                             mapTier: number[],
                             excludePhasedBosses: boolean,
                             numberOfBosses: number[],
                             minDivinationCardValue: number,
                             layout: number[],
                             traversability: number[],
                             backtrackFactor: number[]) => {
    const atlasNodeStore = useAtlasNodeStore();
    let result = [] as AtlasNode[]
    const needToFilter = filterText || mapTier[0] > -1 || numberOfBosses[0] > -1 || excludePhasedBosses || minDivinationCardValue > 0 || layout[0] > -1 || traversability[0] > -1 || backtrackFactor[0] > -1;

    if (needToFilter) {
        result = atlasNodeStore.atlasNodes.filter(value => value.active)

        // Filter by Text
        result = filterByText(filterText, result);

        // Filter by MapTier
        result = filterByMapTier(mapTier, result);

        // Filter by Number of Bosses
        result = filterByNumberOfBosses(numberOfBosses, result);

        // Filter by phased Bosses
        result = filterByPhasedBosses(excludePhasedBosses, result);

        // Filter by Divination Card Value
        result = filterByDivinationCardValue(minDivinationCardValue, result);

        // Filter by Layout
        result = filterByLayout(layout, result);

        // Filter by traversability
        result = filterByTraversability(traversability, result);

        result = filterByBacktrackFactor(backtrackFactor,result);
    }
    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}

function filterByMapTier(mapTier: number[], result: AtlasNode[]) {
    if(mapTier[0]>-1){
        result = result.filter(atlasNode =>{
            return mapTier[0] <= atlasNode.mapTier && atlasNode.mapTier <=mapTier[1]
        })
    }
    return result;
}


function filterByNumberOfBosses(numberOfBosses: number[], result: AtlasNode[]) {
    if (numberOfBosses[0] > -1) {
        result = result.filter(atlasNode => {
            return numberOfBosses[0] <= atlasNode.numberOfBosses && atlasNode.numberOfBosses <= numberOfBosses[1]
        })
    }
    return result;
}

function filterByPhasedBosses(excludePhasedBosses: boolean, result: AtlasNode[]) {
    if (excludePhasedBosses) {
        result = result.filter(atlasNode => {
            return !atlasNode.phasedBoss
        })
    }
    return result;
}

function filterByDivinationCardValue(minDivinationCardValue: number, result: AtlasNode[]) {
    if (minDivinationCardValue > 0) {
        result = result.filter(atlasNode => {
            return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= minDivinationCardValue
        })
    }
    return result;
}

function filterByLayout(layout: number[], result: AtlasNode[]) {
    if (layout[0] > -1) {
        result = result.filter(atlasNode => {
            return layout[0] <= atlasNode.layout && atlasNode.layout <= layout[1]
        })
    }
    return result;
}

function filterByTraversability(traversability: number[], result: AtlasNode[]) {
    if (traversability[0] > -1) {
        result = result.filter(atlasNode => {
            console.log("Traversability: " + atlasNode.traversability + ", Min Number: " + traversability[0] + ", Max Number: " + traversability[1])
            return traversability[0] <= atlasNode.traversability && atlasNode.traversability <= traversability[1]
        })
    }
    return result;
}

function filterByBacktrackFactor(backtrackFactor: number[], result: AtlasNode[]) {
    if (backtrackFactor[0] > -1) {
        result = result.filter(atlasNode => {
            console.log("BacktrackFactor: " + atlasNode.backtrackFactor + ", Min Number: " + backtrackFactor[0] + ", Max Number: " + backtrackFactor[1])
            return backtrackFactor[0] <= atlasNode.backtrackFactor && atlasNode.backtrackFactor <= backtrackFactor[1]
        })
    }
    return result;
}

function filterByText(filterText: string, result: AtlasNode[]) {
    if (filterText) {
        const regExp = new RegExp(filterText.toLowerCase());

        result = result.filter(atlasNode =>
            atlasNode.filterTags.some(e => regExp.test(e)))
    }
    return result;
}
