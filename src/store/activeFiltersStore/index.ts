import { defineStore } from 'pinia'
import type { ActiveFilters } from '@/model/filter/activeFilters'

interface State {
  activeFilterList: ActiveFilters[]
  activeFiltersMap: Map<number, ActiveFilters>
  currentSelectedActiveFiltersIndex: number
}

export const useActiveFiltersStore = defineStore('active-filters', {
  state: (): State => {
    const id = Date.now()
    const activeFilter = {
      id,
      activeMapFilters: [],
      activeBossFilters: [],
      activeDivinationCardFilters: [],
    }
    const activeFiltersMap = new Map()
    activeFiltersMap.set(id, activeFilter)
    return {
      activeFilterList: [activeFilter],
      activeFiltersMap,
      currentSelectedActiveFiltersIndex: 0,
    }
  },

  actions: {
    ADD_ACTIVE_FILTERS(activeFilters: ActiveFilters) {
      this.activeFilterList.push(activeFilters)
    },

    SET_CURRENT_SELECTED_ACTIVE_FILTER_INDEX(currentSelectedActiveFiltersIndex: number) {
      this.currentSelectedActiveFiltersIndex = currentSelectedActiveFiltersIndex
    },

    CLEAR_ACTIVE_FILTERS(currentSelectedActiveFiltersIndex: number) {
      this.activeFilterList[currentSelectedActiveFiltersIndex].activeBossFilters = []
      this.activeFilterList[currentSelectedActiveFiltersIndex].activeMapFilters = []
      this.activeFilterList[currentSelectedActiveFiltersIndex].activeDivinationCardFilters = []
    },

    ADD_ACTIVE_MAP_FILTER(filterKey: string, currentSelectedActiveFiltersIndex: number) {
      const selectedActiveFilterList = this.activeFilterList[currentSelectedActiveFiltersIndex]
      if (!selectedActiveFilterList.activeMapFilters.includes(filterKey)) {
        selectedActiveFilterList.activeMapFilters.push(filterKey)
      }
    },

    REMOVE_ACTIVE_MAP_FILTER(filterKey: string, currentSelectedActiveFiltersIndex: number) {
      if (this.activeFilterList[currentSelectedActiveFiltersIndex].activeMapFilters.includes(filterKey)) {
        this.activeFilterList[currentSelectedActiveFiltersIndex].activeMapFilters.splice(this.activeFilterList[currentSelectedActiveFiltersIndex].activeMapFilters.indexOf(filterKey), 1)
      }
    },

    ADD_ACTIVE_BOSS_FILTER(filterKey: string, currentSelectedActiveFiltersIndex: number) {
      if (!this.activeFilterList[currentSelectedActiveFiltersIndex].activeBossFilters.includes(filterKey)) {
        this.activeFilterList[currentSelectedActiveFiltersIndex].activeBossFilters.push(filterKey)
      }
    },

    REMOVE_ACTIVE_BOSS_FILTER(filterKey: string, currentSelectedActiveFiltersIndex: number) {
      if (this.activeFilterList[currentSelectedActiveFiltersIndex].activeBossFilters.includes(filterKey)) {
        this.activeFilterList[currentSelectedActiveFiltersIndex].activeBossFilters.splice(this.activeFilterList[currentSelectedActiveFiltersIndex].activeBossFilters.indexOf(filterKey), 1)
      }
    },

    ADD_ACTIVE_DIVINATION_CARD_FILTER(filterKey: string, currentSelectedActiveFiltersIndex: number) {
      if (!this.activeFilterList[currentSelectedActiveFiltersIndex].activeDivinationCardFilters.includes(filterKey)) {
        this.activeFilterList[currentSelectedActiveFiltersIndex].activeDivinationCardFilters.push(filterKey)
      }
    },

    REMOVE_ACTIVE_DIVINATION_CARD_FILTER(filterKey: string, currentSelectedActiveFiltersIndex: number) {
      if (this.activeFilterList[currentSelectedActiveFiltersIndex].activeDivinationCardFilters.includes(filterKey)) {
        this.activeFilterList[currentSelectedActiveFiltersIndex].activeDivinationCardFilters.splice(this.activeFilterList[currentSelectedActiveFiltersIndex].activeDivinationCardFilters.indexOf(filterKey), 1)
      }
    },

  },
})
