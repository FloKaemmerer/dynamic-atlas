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

    activeFiltersStore.activeFiltersMap = new Map()
    filters.map(filter => activeFiltersStore.activeFiltersMap.set(filter.id, {
      id: filter.id,
      activeMapFilters: [],
      activeBossFilters: [],
      activeDivinationCardFilters: [],
    }))

    filterStore.filtersMap = new Map<number, Filter>()
    filters.map(filter => filterStore.filtersMap.set(filter.id, filter))
    filterStore.selectedFilter = filters[0]
  }
}

export default handleUrlQueryFilters
