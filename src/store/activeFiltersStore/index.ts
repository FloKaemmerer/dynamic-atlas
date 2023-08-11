import { defineStore } from 'pinia'
import type { ActiveFilters } from '@/model/filter/activeFilters'

interface State {
  activeFiltersMap: Map<number, ActiveFilters>
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
      activeFiltersMap: new Map(),
    }
  },

  actions: {
    ADD_ACTIVE_FILTERS(activeFilters: ActiveFilters) {
      this.activeFiltersMap.set(activeFilters.id, activeFilters)
    },

    CLEAR_ACTIVE_FILTERS(filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters) {
        activeFilters.activeBossFilters = []
        activeFilters.activeMapFilters = []
        activeFilters.activeDivinationCardFilters = []
      }
    },

    ADD_ACTIVE_MAP_FILTER(filterKey: string, filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters && !activeFilters.activeMapFilters.includes(filterKey)) {
        activeFilters.activeMapFilters.push(filterKey)
      }
    },

    REMOVE_ACTIVE_MAP_FILTER(filterKey: string, filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters && activeFilters.activeMapFilters.includes(filterKey)) {
        activeFilters.activeMapFilters.splice(activeFilters.activeMapFilters.indexOf(filterKey), 1)
      }
    },

    ADD_ACTIVE_BOSS_FILTER(filterKey: string, filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters && !activeFilters.activeBossFilters.includes(filterKey)) {
        activeFilters.activeBossFilters.push(filterKey)
      }
    },

    REMOVE_ACTIVE_BOSS_FILTER(filterKey: string, filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters && activeFilters.activeBossFilters.includes(filterKey)) {
        activeFilters.activeBossFilters.splice(activeFilters.activeBossFilters.indexOf(filterKey), 1)
      }
    },

    ADD_ACTIVE_DIVINATION_CARD_FILTER(filterKey: string, filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters && !activeFilters.activeDivinationCardFilters.includes(filterKey)) {
        activeFilters.activeDivinationCardFilters.push(filterKey)
      }
    },

    REMOVE_ACTIVE_DIVINATION_CARD_FILTER(filterKey: string, filterId: number) {
      const activeFilters = this.activeFiltersMap.get(filterId)
      if (activeFilters && activeFilters.activeDivinationCardFilters.includes(filterKey)) {
        activeFilters.activeDivinationCardFilters.splice(activeFilters.activeDivinationCardFilters.indexOf(filterKey), 1)
      }
    },

  },
})
