import type { LocationQuery } from 'vue-router'
import { useFilterStore } from '@/store/FilterStore'
import { FilterKeys } from '@/model/filter/filterKeys'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import type { Filter } from '@/model/filter/filter'

const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
function handleUrlQueryFilters(queryParams: LocationQuery) {
  console.log(JSON.stringify(queryParams))
  if (queryParams && FilterKeys.FILTERS in queryParams && queryParams.filters) {
    console.log(queryParams.filters)
    const filters: Filter[] = JSON.parse(String(queryParams.filters))

    activeFiltersStore.activeFilterList = []
    filters.map(filter => activeFiltersStore.activeFilterList.push({
      id: filter.id,
      activeMapFilters: [],
      activeBossFilters: [],
      activeDivinationCardFilters: [],
    }))

    filterStore.SET_FILTERS(filters)
    filterStore.filtersMap = new Map<number, Filter>()

    filters.map(filter => filterStore.filtersMap.set(filter.id, filter))

    if (filters.length > 1) {
      for (let i = 1; i < filters.length; i++) {
        activeFiltersStore.ADD_ACTIVE_FILTERS({
          id: Date.now(),
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
