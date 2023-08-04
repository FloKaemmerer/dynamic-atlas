import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import type { AtlasNode } from '@/model/atlasNode'

import { useFilterStore } from '@/store/FilterStore'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { FilterKeys } from '@/model/filterKeys'
import type { Filter } from '@/model/filter'
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
  handleFilter(state.filters)
})

export function initFilter() {
  console.log('Init Atlas Filter')
}

export function handleFilter(filters: Filter[]) {
  let result = [] as AtlasNode[]
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i]
    if (hasActiveFilters(filter)) {
      result = atlasNodeStore.atlasNodes.filter(value => value.active)

      // Filter by Text
      result = filterByText(filter, result)

      // Filter by MapTier
      result = filterByMapTier(filter, result)

      // Filter by Openness
      result = filterByOpenness(filter, result)

      // Filter by Traversability
      result = filterByTraversability(filter, result)

      // Filter by BacktrackFactor
      result = filterByBacktrackFactor(filter, result)

      // Filter by Linearity
      result = filterByLinearity(filter, result)

      // Filter by TerrainSlots
      result = filterByTerrainSlots(filter, result)

      // Filter by BaseMobCount
      result = filterByBaseMobCount(filter, result)

      // Filter by Rushable Boss
      result = filterByRushableBoss(filter, result)

      // Filter by Number of Bosses
      result = filterByNumberOfBosses(filter, result)

      // Filter by phased Bosses
      result = filterByPhasedBosses(filter, result)

      // Filter by Spawned Bosses
      result = filterBySpawnedBosses(filter, result)

      // Filter by minimum Divination Card Price
      result = filterByMinimumDivinationCardPrice(filter, result)

      // Filter by minimum effective Divination Card Value
      result = filterByMinimumEffectiveDivinationCardValue(filter, result)
    }
    else {
      activeFiltersStore.$reset()
    }
    atlasNodeStore.ADD_FILTERED_ATLAS_NODE_IDS(filter, result.map(value => value.id))
  }
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

function filterByNumberOfBosses(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByNumberOfBosses(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByNumberOfBosses' we check for length == 2
      return filter.numberOfBosses[0] <= atlasNode.boss.numberOfBosses && atlasNode.boss.numberOfBosses <= filter.numberOfBosses[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.NUMBER_OF_BOSSES)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.NUMBER_OF_BOSSES)
  }
  return result
}

function filterByPhasedBosses(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByExcludePhasedBosses(filter)) {
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_PHASED_BOSSES)
    if (hasToFilterBySkippablePhases(filter) && hasToFilterBySpawnIntro(filter)) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.skippablePhases)
     || (atlasNode.boss.phased && atlasNode.boss.introPhase)
      })
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
    }
    else if (hasToFilterBySkippablePhases(filter) && !hasToFilterBySpawnIntro(filter)) {
      result = result.filter((atlasNode) => {
        return !atlasNode.boss.phased
     || (atlasNode.boss.phased && atlasNode.boss.skippablePhases)
      })
      activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
      activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
    }
    else if (!hasToFilterBySkippablePhases(filter) && hasToFilterBySpawnIntro(filter)) {
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

function filterBySpawnedBosses(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterBySpawnedBosses(filter)) {
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

function filterByRushableBoss(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByRushableBoss(filter)) {
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

function filterByMinimumDivinationCardPrice(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByMinimumDivinationCardPrice(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByMinimumDivinationCardPrice' we check for !== undefined
      return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= filter.minDivinationCardPrice
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_DIVINATION_CARD_PRICE)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_DIVINATION_CARD_PRICE)
  }
  return result
}

function filterByMinimumEffectiveDivinationCardValue(filter: Filter, result: AtlasNode[]) {
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
      // @ts-expect-error within 'hasToFilterByOpenness' we checked for length == 2
      return filter.openness[0] <= atlasNode.nodeLayout.openness && atlasNode.nodeLayout.openness <= filter.openness[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.OPENNESS)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.OPENNESS)
  }
  return result
}

function filterByTraversability(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByTraversability(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByTraversability' we checked for length == 2
      return filter.traversability[0] <= atlasNode.nodeLayout.traversability && atlasNode.nodeLayout.traversability <= filter.traversability[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.TRAVERSABILITY)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.TRAVERSABILITY)
  }
  return result
}

function filterByBacktrackFactor(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByBacktrackFactor(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByBacktrackFactor' we checked for length == 2
      return filter.backtrackFactor[0] <= atlasNode.nodeLayout.backtrackFactor && atlasNode.nodeLayout.backtrackFactor <= filter.backtrackFactor[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.BACKTRACK_FACTOR)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.BACKTRACK_FACTOR)
  }
  return result
}

function filterByBaseMobCount(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByBaseMobCount(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByBaseMobCount' we checked for length == 2
      return filter.baseMobCount[0] <= atlasNode.nodeLayout.baseMobCount && atlasNode.nodeLayout.baseMobCount <= filter.baseMobCount[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.BASE_MOB_COUNT)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.BASE_MOB_COUNT)
  }
  return result
}

function filterByLinearity(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByLinearity(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByLinearity' we checked for length == 2
      return filter.linearity[0] <= atlasNode.nodeLayout.linearity && atlasNode.nodeLayout.linearity <= filter.linearity[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.LINEARITY)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.LINEARITY)
  }
  return result
}

function filterByTerrainSlots(filter: Filter, result: AtlasNode[]) {
  if (hasToFilterByTerrainSlots(filter)) {
    result = result.filter((atlasNode) => {
      // @ts-expect-error within 'hasToFilterByTerrainSlots' we checked for length == 2
      return filter.terrainSlots[0] <= atlasNode.nodeLayout.terrainSlots && atlasNode.nodeLayout.terrainSlots <= filter.terrainSlots[1]
    })
    activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.TERRAIN_SLOTS)
  }
  else {
    activeFiltersStore.REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(FilterKeys.TERRAIN_SLOTS)
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