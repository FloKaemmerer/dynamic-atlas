import { defineStore } from 'pinia'
import type { Filter } from '@/model/filter/filter'
import { getFilterName } from '@/composable/filter/filter-utils'

interface State {
  filtersMap: Map<number, Filter>
  selectedFilter: Filter
}

export const useFilterStore = defineStore('filter', {
  state: (): State => {
    const id = Date.now()
    const filtersMap = new Map()
    const filter = { id, color: '#ff0000', name: getFilterName(0), active: true }
    filtersMap.set(id, filter)
    return {
      filtersMap,
      selectedFilter: filter,
    }
  },

  actions: {
    GET_SELECTED_FILTER() {
      return this.selectedFilter
    },

    DELETE_CURRENT_FILTER() {
      this.filtersMap.delete(this.selectedFilter.id)
      this.selectedFilter = this.filtersMap.values().next().value
    },

    CLEAR_FILTER(filterId: number) {
      const filter = this.filtersMap.get(filterId)
      if (filter) {
        filter.filterText = undefined
        filter.includeMapTier = undefined
        filter.mapTier = undefined
        filter.includeOpenness = undefined
        filter.openness = undefined
        filter.includeTraversability = undefined
        filter.traversability = undefined
        filter.includeBacktrackFactor = undefined
        filter.backtrackFactor = undefined
        filter.includeLinearity = undefined
        filter.linearity = undefined
        filter.includeTerrainSlots = undefined
        filter.terrainSlots = undefined
        filter.includeBaseMobCount = undefined
        filter.baseMobCount = undefined
        filter.rushableBoss = undefined
        filter.includeNumberOfBosses = undefined
        filter.numberOfBosses = undefined
        filter.excludePhasedBosses = undefined
        filter.includeSkippablePhases = undefined
        filter.includeSpawnIntro = undefined
        filter.excludeSpawnedBosses = undefined
        filter.minDivinationCardPrice = undefined
        filter.minEffectiveDivinationCardValue = undefined
      }
    },

    CLEAR_CURRENT_FILTER() {
      this.CLEAR_TEXT_FILTER()
      this.CLEAR_MAP_FILTERS()
      this.CLEAR_BOSS_FILTERS()
      this.CLEAR_DIVINATION_CARD_FILTERS()
    },

    CLEAR_TEXT_FILTER() {
      this.selectedFilter.filterText = undefined
    },

    CLEAR_MAP_FILTERS() {
      this.selectedFilter.includeMapTier = undefined
      this.selectedFilter.mapTier = undefined
      this.selectedFilter.includeOpenness = undefined
      this.selectedFilter.openness = undefined
      this.selectedFilter.includeTraversability = undefined
      this.selectedFilter.traversability = undefined
      this.selectedFilter.includeBacktrackFactor = undefined
      this.selectedFilter.backtrackFactor = undefined
      this.selectedFilter.includeLinearity = undefined
      this.selectedFilter.linearity = undefined
      this.selectedFilter.includeTerrainSlots = undefined
      this.selectedFilter.terrainSlots = undefined
      this.selectedFilter.includeBaseMobCount = undefined
      this.selectedFilter.baseMobCount = undefined
      this.selectedFilter.rushableBoss = undefined
    },

    CLEAR_BOSS_FILTERS() {
      this.selectedFilter.includeNumberOfBosses = undefined
      this.selectedFilter.numberOfBosses = undefined
      this.selectedFilter.excludePhasedBosses = undefined
      this.selectedFilter.includeSkippablePhases = undefined
      this.selectedFilter.includeSpawnIntro = undefined
      this.selectedFilter.excludeSpawnedBosses = undefined
    },

    CLEAR_DIVINATION_CARD_FILTERS() {
      this.selectedFilter.minDivinationCardPrice = undefined
      this.selectedFilter.minEffectiveDivinationCardValue = undefined
    },
  },
})
