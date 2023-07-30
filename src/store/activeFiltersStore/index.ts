import { defineStore } from 'pinia'

interface State {
  activeMapFilters: string[]
  activeBossFilters: string[]
  activeDivinationCardFilters: string[]
}

export const useActiveFiltersStore = defineStore('active-filters', {
  state: (): State => ({
    activeMapFilters: [],
    activeBossFilters: [],
    activeDivinationCardFilters: [],
  }),
  actions: {
    ADD_FILTER_TO_ACTIVE_MAP_FILTERS(filterKey: string) {
      if (!this.activeMapFilters.includes(filterKey)) {
        this.activeMapFilters.push(filterKey)
      }
    },
    REMOVE_FILTER_FROM_ACTIVE_MAP_FILTERS(filterKey: string) {
      if (this.activeMapFilters.includes(filterKey)) {
        this.activeMapFilters.splice(this.activeMapFilters.indexOf(filterKey), 1)
      }
    },
    ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(filterKey: string) {
      if (!this.activeBossFilters.includes(filterKey)) {
        this.activeBossFilters.push(filterKey)
      }
    },
    REMOVE_FILTER_FROM_ACTIVE_BOSS_FILTERS(filterKey: string) {
      if (this.activeBossFilters.includes(filterKey)) {
        this.activeBossFilters.splice(this.activeBossFilters.indexOf(filterKey), 1)
      }
    },
    ADD_FILTER_TO_ACTIVE_DIVINATION_CARD_FILTERS(filterKey: string) {
      if (!this.activeDivinationCardFilters.includes(filterKey)) {
        this.activeDivinationCardFilters.push(filterKey)
      }
    },
    REMOVE_FILTER_FROM_ACTIVE_DIVINATION_CARD_FILTERS(filterKey: string) {
      if (this.activeDivinationCardFilters.includes(filterKey)) {
        this.activeDivinationCardFilters.splice(this.activeDivinationCardFilters.indexOf(filterKey), 1)
      }
    },
  },
})
