import type { LocationQuery } from 'vue-router'
import { useFilterStore } from '@/store/FilterStore'
import { FilterKeys } from '@/model/filter/filterKeys'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'

const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
function handleUrlQueryFilters(queryParams: LocationQuery) {
  console.log(JSON.stringify(queryParams))
  if (queryParams && FilterKeys.FILTERS in queryParams && queryParams.filters) {
    console.log(queryParams.filters)
    const filters = JSON.parse(String(queryParams.filters))
    filterStore.SET_FILTERS(filters)
    if (filters.length > 1) {
      for (let i = 1; i < filters.length; i++) {
        activeFiltersStore.ADD_ACTIVE_FILTERS({
          filterId: Date.now(),
          activeMapFilters: [],
          activeBossFilters: [],
          activeDivinationCardFilters: [],
        })
        // forcing a short wait to make sure we get a different ID
        setTimeout(() => {}, 1)
      }
    }
  }
}

export default handleUrlQueryFilters
