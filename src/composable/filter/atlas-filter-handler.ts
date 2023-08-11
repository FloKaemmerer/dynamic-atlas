import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import type { AtlasNode } from '@/model/atlasNode'

import { useFilterStore } from '@/store/FilterStore'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { FilterKeys } from '@/model/filter/filterKeys'
import type { Filter } from '@/model/filter/filter'
import {
  hasActiveFilters, hasToFilterByBacktrackFactor, hasToFilterByBaseMobCount,
  hasToFilterByExcludePhasedBosses, hasToFilterByFilterText,
  hasToFilterByLinearity, hasToFilterByMapTier, hasToFilterByMinimumDivinationCardPrice,
  hasToFilterByMinimumEffectiveDivinationCardValue, hasToFilterByNumberOfBosses,
  hasToFilterByOpenness,
  hasToFilterByRushableBoss,
  hasToFilterBySkippablePhases,
  hasToFilterBySpawnIntro, hasToFilterBySpawnedBosses, hasToFilterByTerrainSlots, hasToFilterByTraversability,
} from '@/composable/filter/filter-utils'

const filterStore = useFilterStore()
const atlasNodeStore = useAtlasNodeStore()
const activeFiltersStore = useActiveFiltersStore()
filterStore.$subscribe((mutation, state) => {
  handleFilter(Array.from(state.filtersMap.values()))
})

export function initFilter() {
  console.log('Init Atlas Filter')
  activeFiltersStore.ADD_ACTIVE_FILTERS({
    id: filterStore.selectedFilter.id,
    activeMapFilters: [],
    activeBossFilters: [],
    activeDivinationCardFilters: [],
  })
}

export function handleFilter(filters: Filter[]) {
  atlasNodeStore.filteredAtlasNodesPerFilter = new Map<Filter, Array<string>>()
  for (let i = 0; i < filters.length; i++) {
    let result = [] as AtlasNode[]
    const filter = filters[i]
    if (filter.active && hasActiveFilters(filter)) {
      result = atlasNodeStore.atlasNodes.filter(value => value.active)
      // Filter by Text
      result = filterByText(filter, result)

      // Filter by MapTier
      result = filterByMapTier(filter, i, result)

      // Filter by Openness
      result = filterByOpenness(filter, i, result)

      // Filter by Traversability
      result = filterByTraversability(filter, i, result)

      // Filter by BacktrackFactor
      result = filterByBacktrackFactor(filter, i, result)

      // Filter by Linearity
      result = filterByLinearity(filter, i, result)

      // Filter by TerrainSlots
      result = filterByTerrainSlots(filter, i, result)

      // Filter by BaseMobCount
      result = filterByBaseMobCount(filter, i, result)

      // Filter by Rushable Boss
      result = filterByRushableBoss(filter, i, result)

      // Filter by Number of Bosses
      result = filterByNumberOfBosses(filter, i, result)

      // Filter by phased Bosses
      result = filterByPhasedBosses(filter, i, result)

      // Filter by Spawned Bosses
      result = filterBySpawnedBosses(filter, i, result)

      // Filter by minimum Divination Card Price
      result = filterByMinimumDivinationCardPrice(filter, i, result)

      // Filter by minimum effective Divination Card Value
      result = filterByMinimumEffectiveDivinationCardValue(filter, i, result)
    }
    else {
      activeFiltersStore.CLEAR_ACTIVE_FILTERS(filter.id)
    }
    atlasNodeStore.ADD_FILTERED_ATLAS_NODE_IDS(filter, result.map(value => value.id))
  }
}

function filterByMapTier(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByMapTier(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByMapTier' we check for length == 2
      return filter.mapTier[0] <= atlasNode.mapTier && atlasNode.mapTier <= filter.mapTier[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.MAP_TIER, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.MAP_TIER, filter.id)
  }
  return result
}

function filterByNumberOfBosses(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByNumberOfBosses(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByNumberOfBosses' we check for length == 2
      return filter.numberOfBosses[0] <= atlasNode.boss.numberOfBosses && atlasNode.boss.numberOfBosses <= filter.numberOfBosses[1]
    })
    activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.NUMBER_OF_BOSSES, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.NUMBER_OF_BOSSES, filter.id)
  }
  return result
}

function filterByPhasedBosses(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByExcludePhasedBosses(filter)) {
    activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.EXCLUDE_PHASED_BOSSES, filter.id)
    if (hasToFilterBySkippablePhases(filter) && hasToFilterBySpawnIntro(filter)) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.skippablePhases)
     || (atlasNode.boss.phased && atlasNode.boss.introPhase)
      })
      activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SKIPPABLE_PHASES, filter.id)
      activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SPAWN_INTRO, filter.id)
    }
    else if (hasToFilterBySkippablePhases(filter) && !hasToFilterBySpawnIntro(filter)) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.skippablePhases)
      })
      activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SKIPPABLE_PHASES, filter.id)
      activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SPAWN_INTRO, filter.id)
    }
    else if (!hasToFilterBySkippablePhases(filter) && hasToFilterBySpawnIntro(filter)) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.introPhase)
      })
      activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SPAWN_INTRO, filter.id)
      activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SKIPPABLE_PHASES, filter.id)
    }
    else {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
      })
      activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SKIPPABLE_PHASES, filter.id)
      activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SPAWN_INTRO, filter.id)
    }
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.EXCLUDE_PHASED_BOSSES, filter.id)
    activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SKIPPABLE_PHASES, filter.id)
    activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.INCLUDE_SPAWN_INTRO, filter.id)
  }
  return result
}

function filterBySpawnedBosses(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterBySpawnedBosses(filter)) {
    result = result.filter((atlasNode) => {
      return !atlasNode.boss.spawned && !atlasNode.uniqueMap
    })
    activeFiltersStore.ADD_ACTIVE_BOSS_FILTER(FilterKeys.EXCLUDE_SPAWNED_BOSSES, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_BOSS_FILTER(FilterKeys.EXCLUDE_SPAWNED_BOSSES, filter.id)
  }
  return result
}

function filterByRushableBoss(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByRushableBoss(filter)) {
    result = result.filter((atlasNode) => {
      return atlasNode.nodeLayout.rushableBoss
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.RUSHABLE_BOSS, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.RUSHABLE_BOSS, filter.id)
  }
  return result
}

function filterByMinimumDivinationCardPrice(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByMinimumDivinationCardPrice(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByMinimumDivinationCardPrice' we check for !== undefined
      return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= filter.minDivinationCardPrice
    })
    activeFiltersStore.ADD_ACTIVE_DIVINATION_CARD_FILTER(FilterKeys.MIN_DIVINATION_CARD_PRICE, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_DIVINATION_CARD_FILTER(FilterKeys.MIN_DIVINATION_CARD_PRICE, filter.id)
  }
  return result
}

function filterByMinimumEffectiveDivinationCardValue(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByMinimumEffectiveDivinationCardValue(filter)) {
    result = result.filter((atlasNode) => {
      const highestEffectiveValueDivinationCard = atlasNode.highestEffectiveValueDivinationCard
      const effectiveValue = highestEffectiveValueDivinationCard.effectiveValue
      if (effectiveValue) {
        // @ts-expect-error within 'hasToFilterByMinimumEffectiveDivinationCardValue' we check for !== undefined
        return effectiveValue >= filter.minEffectiveDivinationCardValue
      }
      else {
        return false
      }
    })
    activeFiltersStore.ADD_ACTIVE_DIVINATION_CARD_FILTER(FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_DIVINATION_CARD_FILTER(FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE, filter.id)
  }
  return result
}

function filterByOpenness(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByOpenness(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByOpenness' we checked for length == 2
      return filter.openness[0] <= atlasNode.nodeLayout.openness && atlasNode.nodeLayout.openness <= filter.openness[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.OPENNESS, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.OPENNESS, filter.id)
  }
  return result
}

function filterByTraversability(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByTraversability(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByTraversability' we checked for length == 2
      return filter.traversability[0] <= atlasNode.nodeLayout.traversability && atlasNode.nodeLayout.traversability <= filter.traversability[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.TRAVERSABILITY, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.TRAVERSABILITY, filter.id)
  }
  return result
}

function filterByBacktrackFactor(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByBacktrackFactor(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByBacktrackFactor' we checked for length == 2
      return filter.backtrackFactor[0] <= atlasNode.nodeLayout.backtrackFactor && atlasNode.nodeLayout.backtrackFactor <= filter.backtrackFactor[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.BACKTRACK_FACTOR, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.BACKTRACK_FACTOR, filter.id)
  }
  return result
}

function filterByBaseMobCount(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByBaseMobCount(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByBaseMobCount' we checked for length == 2
      return filter.baseMobCount[0] <= atlasNode.nodeLayout.baseMobCount && atlasNode.nodeLayout.baseMobCount <= filter.baseMobCount[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.BASE_MOB_COUNT, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.BASE_MOB_COUNT, filter.id)
  }
  return result
}

function filterByLinearity(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByLinearity(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByLinearity' we checked for length == 2
      return filter.linearity[0] <= atlasNode.nodeLayout.linearity && atlasNode.nodeLayout.linearity <= filter.linearity[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.LINEARITY, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.LINEARITY, filter.id)
  }
  return result
}

function filterByTerrainSlots(filter: Filter, index: number, result: AtlasNode[]) {
  if (hasToFilterByTerrainSlots(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByTerrainSlots' we checked for length == 2
      return filter.terrainSlots[0] <= atlasNode.nodeLayout.terrainSlots && atlasNode.nodeLayout.terrainSlots <= filter.terrainSlots[1]
    })
    activeFiltersStore.ADD_ACTIVE_MAP_FILTER(FilterKeys.TERRAIN_SLOTS, filter.id)
  }
  else {
    activeFiltersStore.REMOVE_ACTIVE_MAP_FILTER(FilterKeys.TERRAIN_SLOTS, filter.id)
  }
  return result
}

function filterByText(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByFilterText(filter)) {
    // @ts-expect-error within 'hasToFilterByFilterText' we checked !== undefined
    const regExp = new RegExp(filter.filterText.toLowerCase())

    result = result.filter(atlasNode =>
      atlasNode.filterTags.some(e => regExp.test(e)))
  }
  return result
}
