import { defineStore } from 'pinia'
import type { Filter } from '@/model/filter'
import { getFilterName } from '@/composable/filter/filter-utils'

interface State {
  filters: Filter[]
  currentSelectedFilterIndex: number
}

export const useFilterStore = defineStore('filter', {
  state: (): State => {
    return {
      filters: [{ filterColor: '#ff0000', filterName: getFilterName(0) }],
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
      console.log(`current Selected Filter Index: ${currentSelectedFilterIndex}`)
      this.currentSelectedFilterIndex = currentSelectedFilterIndex
    },

    GET_SELECTED_FILTER() {
      console.log(`Selected Filter: ${this.currentSelectedFilterIndex}`)
      return this.filters[this.currentSelectedFilterIndex]
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
