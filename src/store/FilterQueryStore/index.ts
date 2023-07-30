import { defineStore } from 'pinia'
import type { LooseFilters } from '@/model/looseFilters'

interface State {
  filterQuery: LooseFilters
}

export const useFilterQueryStore = defineStore('filter-query', {
  state: (): State => ({
    filterQuery: {},
  }),
  actions: {
    SET_FILTER_QUERY(filterQuery: LooseFilters) {
      this.filterQuery = filterQuery
    },
  },
})
