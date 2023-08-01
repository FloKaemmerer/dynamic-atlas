import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import type { AtlasNode } from '@/model/atlasNode'

import { useFilterStore } from '@/store/FilterStore'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { FilterKeys } from '@/model/filterKeys'
import type { Filter } from '@/model/filter'

const filterStore = useFilterStore()
const atlasNodeStore = useAtlasNodeStore()
const activeFiltersStore = useActiveFiltersStore()
filterStore.$subscribe((mutation, state) => {
  handleFilter(state.filterText,
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
    state.includeSpawnIntro,
    state.filters[state.currentSelectedFilterIndex])
})

export function initFilter() {
  console.log('Init Atlas Filter')
  filterStore.ADD_FILTER({
    filterName: 'default',
    filterColor: 'red',
  })
}

function hasToFilterByMapTier(filter: Filter) {
  return filter.includeMapTier && filter.mapTier !== undefined && filter.mapTier.length === 2
}

function hasToFilterByFilterText(filter: Filter) {
  return (filter.filterText !== undefined && filter.filterText.length) > 0
}

function hasToFilterByOpenness(filter: Filter) {
  return filter.includeOpenness && filter.openness !== undefined && filter.openness.length === 2
}

export function handleFilter(filterText: string,
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
  spawnIntro: boolean,
  filter: Filter) {
  let result = [] as AtlasNode[]
  const needToFilter
  = hasToFilterByFilterText(filter)
  || hasToFilterByMapTier(filter)
  || hasToFilterByOpenness(filter)
  || numberOfBosses[0] > -1
  || excludePhasedBosses
  || minDivinationCardPrice > 0
  || minEffectiveDivinationCardValue > 0
  || traversability[0] > -1
  || backtrackFactor[0] > -1
  || linearity[0] > -1
  || terrainSlots[0] > -1
  || baseMobCount[0] > -1
  || includeRushableBoss
  || includeSkippablePhases
  || excludeSpawnedBosses
  || spawnIntro

  if (needToFilter) {
    result = atlasNodeStore.atlasNodes.filter(value => value.active)

    // Filter by Text
    result = filterByText(filter, result)

    // Filter by MapTier
    result = filterByMapTier(filter, result)

    // Filter by Openness
    result = filterByOpenness(filter, result)

    // Filter by Number of Bosses
    result = filterByNumberOfBosses(numberOfBosses, result)

    // Filter by phased Bosses
    result = filterByPhasedBosses(excludePhasedBosses, includeSkippablePhases, spawnIntro, result)

    // Filter by Spawned Bosses
    result = filterBySpawnedBosses(excludeSpawnedBosses, result)

    // Filter by Rushable Boss
    result = filterByRushableBoss(includeRushableBoss, result)

    // Filter by minimum Divination Card Price
    result = filterByMinimumDivinationCardPrice(minDivinationCardPrice, result)

    // Filter by minimum effective Divination Card Value
    result = filterByMinimumEffectiveDivinationCardValue(minEffectiveDivinationCardValue, result)

    // Filter by Traversability
    result = filterByTraversability(traversability, result)

    // Filter by BacktrackFactor
    result = filterByBacktrackFactor(backtrackFactor, result)

    // Filter by Linearity
    result = filterByLinearity(linearity, result)

    // Filter by TerrainSlots
    result = filterByTerrainSlots(terrainSlots, result)

    // Filter by BaseMobCount
    result = filterByBaseMobCount(baseMobCount, result)
  }
  else {
    activeFiltersStore.$reset()
  }
  atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}

function filterByMapTier(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByMapTier(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByMapTier' we check for length == 2
      return filter.mapTier[0] <= atlasNode.mapTier && atlasNode.mapTier <= filter.mapTier[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.MAP_TIER)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.MAP_TIER)
  }
  return result
}

function filterByNumberOfBosses(numberOfBosses: number[], result: AtlasNode[]) {
  if (numberOfBosses[0] > -1) {
    result = result.filter((atlasNode) => {
      return numberOfBosses[0] <= atlasNode.boss.numberOfBosses && atlasNode.boss.numberOfBosses <= numberOfBosses[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.NUMBER_OF_BOSSES)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.NUMBER_OF_BOSSES)
  }
  return result
}

function filterByPhasedBosses(excludePhasedBosses: boolean, includeSkippablePhases: boolean, includeSpawnIntro: boolean, result: AtlasNode[]) {
  if (excludePhasedBosses) {
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_PHASED_BOSSES)
    if (includeSkippablePhases && includeSpawnIntro) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.skippablePhases)
     || (atlasNode.boss.phased && atlasNode.boss.introPhase)
      })
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
    }
    else if (includeSkippablePhases && !includeSpawnIntro) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.skippablePhases)
      })
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
      activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
    }
    else if (!includeSkippablePhases && includeSpawnIntro) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.introPhase)
      })
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
      activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
    }
    else {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
      })
      activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
      activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
    }
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_PHASED_BOSSES)
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
  }
  return result
}

function filterBySpawnedBosses(excludeSpawnedBosses: boolean, result: AtlasNode[]) {
  if (excludeSpawnedBosses) {
    result = result.filter((atlasNode) => {
      return !atlasNode.boss.spawned && !atlasNode.uniqueMap
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_SPAWNED_BOSSES)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_SPAWNED_BOSSES)
  }
  return result
}

function filterByRushableBoss(includeRushableBoss: boolean, result: AtlasNode[]) {
  if (includeRushableBoss) {
    result = result.filter((atlasNode) => {
      return atlasNode.nodeLayout.rushableBoss
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.RUSHABLE_BOSS)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.RUSHABLE_BOSS)
  }
  return result
}

function filterByMinimumDivinationCardPrice(minDivinationCardPrice: number, result: AtlasNode[]) {
  if (minDivinationCardPrice > 0) {
    result = result.filter((atlasNode) => {
      return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= minDivinationCardPrice
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_DIVINATION_CARD_PRICE)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_DIVINATION_CARD_PRICE)
  }
  return result
}

function filterByMinimumEffectiveDivinationCardValue(minEffectiveDivinationCardValue: number, result: AtlasNode[]) {
  if (minEffectiveDivinationCardValue > 0) {
    result = result.filter((atlasNode) => {
      const highestEffectiveValueDivinationCard = atlasNode.highestEffectiveValueDivinationCard
      const effectiveValue = highestEffectiveValueDivinationCard.effectiveValue
      if (effectiveValue) {
        return effectiveValue >= minEffectiveDivinationCardValue
      }
      else {
        return false
      }
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE)
  }
  return result
}

function filterByOpenness(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByOpenness(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByMapTier' we checked for length == 2
      return filter.openness[0] <= atlasNode.nodeLayout.openness && atlasNode.nodeLayout.openness <= filter.openness[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.OPENNESS)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.OPENNESS)
  }
  return result
}

function filterByTraversability(traversability: number[], result: AtlasNode[]) {
  if (traversability[0] > -1) {
    result = result.filter((atlasNode) => {
      return traversability[0] <= atlasNode.nodeLayout.traversability && atlasNode.nodeLayout.traversability <= traversability[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.TRAVERSABILITY)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.TRAVERSABILITY)
  }
  return result
}

function filterByBacktrackFactor(backtrackFactor: number[], result: AtlasNode[]) {
  if (backtrackFactor[0] > -1) {
    result = result.filter((atlasNode) => {
      return backtrackFactor[0] <= atlasNode.nodeLayout.backtrackFactor && atlasNode.nodeLayout.backtrackFactor <= backtrackFactor[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.BACKTRACK_FACTOR)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.BACKTRACK_FACTOR)
  }
  return result
}

function filterByBaseMobCount(baseMobCount: number[], result: AtlasNode[]) {
  if (baseMobCount[0] > -1) {
    result = result.filter((atlasNode) => {
      return baseMobCount[0] <= atlasNode.nodeLayout.baseMobCount && atlasNode.nodeLayout.baseMobCount <= baseMobCount[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.BASE_MOB_COUNT)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.BASE_MOB_COUNT)
  }
  return result
}

function filterByLinearity(linearity: number[], result: AtlasNode[]) {
  if (linearity[0] > -1) {
    result = result.filter((atlasNode) => {
      return linearity[0] <= atlasNode.nodeLayout.linearity && atlasNode.nodeLayout.linearity <= linearity[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.LINEARITY)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.LINEARITY)
  }
  return result
}

function filterByTerrainSlots(terrainSlots: number[], result: AtlasNode[]) {
  if (terrainSlots[0] > -1) {
    result = result.filter((atlasNode) => {
      return terrainSlots[0] <= atlasNode.nodeLayout.terrainSlots && atlasNode.nodeLayout.terrainSlots <= terrainSlots[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.TERRAIN_SLOTS)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.TERRAIN_SLOTS)
  }
  return result
}

function filterByText(filter: Filter, result: AtlasNode[]) {
  if (filter.filterText) {
    const regExp = new RegExp(filter.filterText.toLowerCase())

    result = result.filter(atlasNode =>
      atlasNode.filterTags.some(e => regExp.test(e)))
  }
  return result
}
