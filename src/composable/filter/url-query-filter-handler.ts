import type { LocationQuery } from 'vue-router'
import { useFilterStore } from '@/store/FilterStore'
import { FilterKeys } from '@/model/filter/filterKeys'

const filterStore = useFilterStore()
function handleUrlQueryFilters(queryParams: LocationQuery) {
  console.log(JSON.stringify(queryParams))
  if (queryParams && FilterKeys.FILTERS in queryParams && queryParams.filters) {
    console.log(queryParams.filters)
    const filters = JSON.parse(String(queryParams.filters))
    filterStore.SET_FILTERS(filters)
  }
}

export default handleUrlQueryFilters
