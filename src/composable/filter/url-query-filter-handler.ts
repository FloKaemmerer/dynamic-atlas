import type { LocationQuery } from 'vue-router'
import { useFilterStore } from '@/store/FilterStore'
import { FilterKeys } from '@/model/filterKeys'

const filterStore = useFilterStore()
function handleUrlQueryFilters(queryParams: LocationQuery) {
  console.log(JSON.stringify(queryParams))
  if (queryParams && FilterKeys.FILTERS in queryParams && queryParams.filters) {
    console.log(queryParams.filters)
    filterStore.SET_FILTERS(JSON.parse(String(queryParams.filters)))
  }
}

export default handleUrlQueryFilters
