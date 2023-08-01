import type { LooseFilters } from '@/model/looseFilters'

function buildShareableUrl(queryParams: LooseFilters): string {
  let baseUrl = `${import.meta.env.VITE_BASE_URL}`
  let filterParams = ''
  if (JSON.stringify(queryParams).includes(':')) {
    filterParams = filterParams.concat(`${queryParams.filters}`)
    baseUrl = baseUrl.concat(`&filters=${filterParams}`)
  }
  return baseUrl
}

export default buildShareableUrl
