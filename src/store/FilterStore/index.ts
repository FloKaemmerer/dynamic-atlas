import { defineStore } from 'pinia'
import type { Filter } from '@/model/filter/filter'
import { getFilterName } from '@/composable/filter/filter-utils'

interface State {
  filters: Filter[]
  filtersMap: Map<number, Filter>
  currentSelectedFilterIndex: number
}

export const useFilterStore = defineStore('filter', {
  state: (): State => {
    const id = Date.now()
    const filtersMap = new Map()
    const filter = { id, color: '#ff0000', name: getFilterName(0), active: true }
    filtersMap.set(id, filter)
    return {
      filters: [filter],
      filtersMap,
      currentSelectedFilterIndex: 0,
    }
  },

  actions: {
    SET_FILTERS(filters: Filter[]) {
      this.filters = filters
    },

    ADD_FILTER(filter: Filter) {
      this.filters.push(filter)
    },

    SET_CURRENT_SELECTED_FILTER_INDEX(currentSelectedFilterIndex: number) {
      this.currentSelectedFilterIndex = currentSelectedFilterIndex
    },

    GET_SELECTED_FILTER() {
      return this.filters[this.currentSelectedFilterIndex]
    },

    DELETE_CURRENT_FILTER() {
      const tmpIndex = this.currentSelectedFilterIndex
      if (this.currentSelectedFilterIndex === this.filters.length - 1) {
        this.currentSelectedFilterIndex = this.currentSelectedFilterIndex - 1
      }
      this.filters.splice(tmpIndex, 1)
      this.currentSelectedFilterIndex = 0
    },

    CLEAR_CURRENT_FILTER() {
      this.CLEAR_TEXT_FILTER()
      this.CLEAR_MAP_FILTERS()
      this.CLEAR_BOSS_FILTERS()
      this.CLEAR_DIVINATION_CARD_FILTERS()
    },

    CLEAR_TEXT_FILTER() {
      this.filters[this.currentSelectedFilterIndex].filterText = undefined
    },

    CLEAR_MAP_FILTERS() {
      this.filters[this.currentSelectedFilterIndex].includeMapTier = undefined
      this.filters[this.currentSelectedFilterIndex].mapTier = undefined
      this.filters[this.currentSelectedFilterIndex].includeOpenness = undefined
      this.filters[this.currentSelectedFilterIndex].openness = undefined
      this.filters[this.currentSelectedFilterIndex].includeTraversability = undefined
      this.filters[this.currentSelectedFilterIndex].traversability = undefined
      this.filters[this.currentSelectedFilterIndex].includeBacktrackFactor = undefined
      this.filters[this.currentSelectedFilterIndex].backtrackFactor = undefined
      this.filters[this.currentSelectedFilterIndex].includeLinearity = undefined
      this.filters[this.currentSelectedFilterIndex].linearity = undefined
      this.filters[this.currentSelectedFilterIndex].includeTerrainSlots = undefined
      this.filters[this.currentSelectedFilterIndex].terrainSlots = undefined
      this.filters[this.currentSelectedFilterIndex].includeBaseMobCount = undefined
      this.filters[this.currentSelectedFilterIndex].baseMobCount = undefined
      this.filters[this.currentSelectedFilterIndex].rushableBoss = undefined
      this.filters[this.currentSelectedFilterIndex].includeNumberOfBosses = undefined
    },

    CLEAR_BOSS_FILTERS() {
      this.filters[this.currentSelectedFilterIndex].includeNumberOfBosses = undefined
      this.filters[this.currentSelectedFilterIndex].numberOfBosses = undefined
      this.filters[this.currentSelectedFilterIndex].excludePhasedBosses = undefined
      this.filters[this.currentSelectedFilterIndex].includeSkippablePhases = undefined
      this.filters[this.currentSelectedFilterIndex].includeSpawnIntro = undefined
      this.filters[this.currentSelectedFilterIndex].excludeSpawnedBosses = undefined
    },

    CLEAR_DIVINATION_CARD_FILTERS() {
      this.filters[this.currentSelectedFilterIndex].minDivinationCardPrice = undefined
      this.filters[this.currentSelectedFilterIndex].minEffectiveDivinationCardValue = undefined
    },
  },
})
