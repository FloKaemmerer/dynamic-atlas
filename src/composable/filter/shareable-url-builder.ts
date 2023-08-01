import type { LooseFilters } from '@/model/looseFilters'

function buildShareableUrl(queryParams: LooseFilters): string {
  let baseUrl = `${import.meta.env.VITE_BASE_URL}`
  if (JSON.stringify(queryParams).includes(':')) {
    baseUrl = baseUrl.concat(`&filters=${queryParams.filters}`)
  }
  return baseUrl
}

export default buildShareableUrl
