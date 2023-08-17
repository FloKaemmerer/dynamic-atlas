import type { LooseFilters } from '@/model/filter/looseFilters'

const baseUrl = `${import.meta.env.VITE_BASE_URL}`
export function buildShareableUrl(queryParams: LooseFilters): string {
  let shareableUrl = ''
  if (JSON.stringify(queryParams).includes(':')) {
    shareableUrl = baseUrl.concat(`&filters=${queryParams.filters}`)
  }
  return shareableUrl
}

export function buildShareableUrlFromPreset(preset: string): string {
  return baseUrl.concat(`&filters=${preset}`)
}
