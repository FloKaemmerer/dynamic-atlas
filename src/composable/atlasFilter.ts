import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";

import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();
const atlasNodeStore = useAtlasNodeStore();
filterStore.$subscribe((mutation, state) => {
    handleFilter(state.filterText,
        state.includeMapTier ? state.mapTier : [-1, -1],
        state.excludePhasedBosses,
        state.includeNumberOfBosses ? state.numberOfBosses : [-1, -1],
        state.minDivinationCardPrice,
        state.minEffectiveDivinationCardValue,
        state.includeOpenness ? state.openness : [-1, -1],
        state.includeTraversability ? state.traversability : [-1, -1],
        state.includeBacktrackFactor ? state.backtrackFactor : [-1, -1],
        state.includeLinearity ? state.linearity : [-1, -1],
        state.includeTerrainSlots ? state.terrainSlots : [-1, -1],
        state.includeBaseMobCount ? state.baseMobCount : [-1, -1],
        state.rushableBoss,
        state.includeSkippablePhases,
        state.excludeSpawnedBosses,
        state.includeSpawnIntro)
})

export const initFilter = () => {
    console.log("Init Atlas Filter")
}

export const handleFilter = (filterText: string,
                             mapTier: number[],
                             excludePhasedBosses: boolean,
                             numberOfBosses: number[],
                             minDivinationCardPrice: number,
                             minEffectiveDivinationCardValue: number,
                             openness: number[],
                             traversability: number[],
                             backtrackFactor: number[],
                             linearity: number[],
                             terrainSlots: number[],
                             baseMobCount: number[],
                             includeRushableBoss: boolean,
                             includeSkippablePhases: boolean,
                             excludeSpawnedBosses: boolean,
                             spawnIntro: boolean) => {
    let result = [] as AtlasNode[]
    const needToFilter =
        (filterText && filterText.length) > 0 ||
        mapTier[0] > -1 ||
        numberOfBosses[0] > -1 ||
        excludePhasedBosses ||
        minDivinationCardPrice > 0 ||
        minEffectiveDivinationCardValue > 0 ||
        openness[0] > -1 ||
        traversability[0] > -1 ||
        backtrackFactor[0] > -1 ||
        linearity[0] > -1 ||
        terrainSlots[0] > -1 ||
        baseMobCount[0] > -1 ||
        includeRushableBoss ||
        includeSkippablePhases ||
        excludeSpawnedBosses ||
        spawnIntro;

    if (needToFilter) {
        result = atlasNodeStore.atlasNodes.filter(value => value.active)

        // Filter by Text
        result = filterByText(filterText, result);

        // Filter by MapTier
        result = filterByMapTier(mapTier, result);

        // Filter by Number of Bosses
        result = filterByNumberOfBosses(numberOfBosses, result);

        // Filter by phased Bosses
        result = filterByPhasedBosses(excludePhasedBosses, includeSkippablePhases, spawnIntro, result);

        // Filter by Spawned Bosses
        result = filterBySpawnedBosses(excludeSpawnedBosses, result)

        // Filter by Rushable Boss
        result = filterByRushableBoss(includeRushableBoss, result)

        // Filter by minimum Divination Card Price
        result = filterByMinimumDivinationCardPrice(minDivinationCardPrice, result);

        // Filter by minimum effective Divination Card Value
        result = filterByMinimumEffectiveDivinationCardValue(minEffectiveDivinationCardValue, result)

        // Filter by Openness
        result = filterByOpenness(openness, result);

        // Filter by Traversability
        result = filterByTraversability(traversability, result);

        //Filter by BacktrackFactor
        result = filterByBacktrackFactor(backtrackFactor, result);

        // Filter by Linearity
        result = filterByLinearity(linearity, result)

        // Filter by TerrainSlots
        result = filterByTerrainSlots(terrainSlots, result)

        // Filter by BaseMobCount
        result = filterByBaseMobCount(baseMobCount, result)
    }
    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}

function filterByMapTier(mapTier: number[], result: AtlasNode[]) {
    if (mapTier[0] > -1) {
        result = result.filter(atlasNode => {
            return mapTier[0] <= atlasNode.mapTier && atlasNode.mapTier <= mapTier[1]
        })
    }
    return result;
}


function filterByNumberOfBosses(numberOfBosses: number[], result: AtlasNode[]) {
    if (numberOfBosses[0] > -1) {
        result = result.filter(atlasNode => {
            return numberOfBosses[0] <= atlasNode.boss.numberOfBosses && atlasNode.boss.numberOfBosses <= numberOfBosses[1]
        })
    }
    return result;
}

function filterByPhasedBosses(excludePhasedBosses: boolean, includeSkippablePhases: boolean, includeSpawnIntro: boolean, result: AtlasNode[]) {
    if (excludePhasedBosses) {
        if (includeSkippablePhases && includeSpawnIntro) {
            result = result.filter(atlasNode => {
                return !atlasNode.boss.phased ||
                    atlasNode.boss.phased && atlasNode.boss.skippablePhases ||
                    atlasNode.boss.phased && atlasNode.boss.introPhase
            })
        } else if (includeSkippablePhases && !includeSpawnIntro) {
            result = result.filter(atlasNode => {
                return !atlasNode.boss.phased ||
                    atlasNode.boss.phased && atlasNode.boss.skippablePhases
            })
        } else if (!includeSkippablePhases && includeSpawnIntro) {
            result = result.filter(atlasNode => {
                return !atlasNode.boss.phased ||
                    atlasNode.boss.phased && atlasNode.boss.introPhase
            })
        } else {
            result = result.filter(atlasNode => {
                return !atlasNode.boss.phased
            })
        }
    }
    return result;
}

function filterBySpawnedBosses(excludeSpawnedBosses: boolean, result: AtlasNode[]) {
    if (excludeSpawnedBosses) {
        result = result.filter(atlasNode => {
            return !atlasNode.boss.spawned
        })
    }
    return result;
}

function filterByRushableBoss(includeRushableBoss: boolean, result: AtlasNode[]) {
    if (includeRushableBoss) {
        result = result.filter(atlasNode => {
            return atlasNode.nodeLayout.rushableBoss;
        })
    }
    return result;
}

function filterByMinimumDivinationCardPrice(minDivinationCardPrice: number, result: AtlasNode[]) {
    if (minDivinationCardPrice > 0) {
        result = result.filter(atlasNode => {
            return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= minDivinationCardPrice
        })
    }
    return result;
}

function filterByMinimumEffectiveDivinationCardValue(minEffectiveDivinationCardValue: number, result: AtlasNode[]) {
    if (minEffectiveDivinationCardValue > 0) {
        result = result.filter(atlasNode => {
            const highestEffectiveValueDivinationCard = atlasNode.highestEffectiveValueDivinationCard;
            const effectiveValue = highestEffectiveValueDivinationCard.effectiveValue;
            if (effectiveValue) {
                console.log("Div Card '" + highestEffectiveValueDivinationCard.name + "', Effective Value: " + effectiveValue)
                return effectiveValue >= minEffectiveDivinationCardValue
            } else {
                return false
            }
        })
    }
    return result;
}

function filterByOpenness(layout: number[], result: AtlasNode[]) {
    if (layout[0] > -1) {
        result = result.filter(atlasNode => {
            return layout[0] <= atlasNode.nodeLayout.openness && atlasNode.nodeLayout.openness <= layout[1]
        })
    }
    return result;
}

function filterByTraversability(traversability: number[], result: AtlasNode[]) {
    if (traversability[0] > -1) {
        result = result.filter(atlasNode => {
            return traversability[0] <= atlasNode.nodeLayout.traversability && atlasNode.nodeLayout.traversability <= traversability[1]
        })
    }
    return result;
}

function filterByBacktrackFactor(backtrackFactor: number[], result: AtlasNode[]) {
    if (backtrackFactor[0] > -1) {
        result = result.filter(atlasNode => {
            return backtrackFactor[0] <= atlasNode.nodeLayout.backtrackFactor && atlasNode.nodeLayout.backtrackFactor <= backtrackFactor[1]
        })
    }
    return result;
}

function filterByBaseMobCount(baseMobCount: number[], result: AtlasNode[]) {
    if (baseMobCount[0] > -1) {
        result = result.filter(atlasNode => {
            return baseMobCount[0] <= atlasNode.nodeLayout.baseMobCount && atlasNode.nodeLayout.baseMobCount <= baseMobCount[1]
        })
    }
    return result;
}

function filterByLinearity(linearity: number[], result: AtlasNode[]) {
    if (linearity[0] > -1) {
        result = result.filter(atlasNode => {
            return linearity[0] <= atlasNode.nodeLayout.linearity && atlasNode.nodeLayout.linearity <= linearity[1]
        })
    }
    return result;
}

function filterByTerrainSlots(terrainSlots: number[], result: AtlasNode[]) {
    if (terrainSlots[0] > -1) {
        result = result.filter(atlasNode => {
            return terrainSlots[0] <= atlasNode.nodeLayout.terrainSlots && atlasNode.nodeLayout.terrainSlots <= terrainSlots[1]
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
