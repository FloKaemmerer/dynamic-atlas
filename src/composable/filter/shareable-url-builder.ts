import { FilterKeys } from '@/model/filterKeys'
import type { LooseFilters } from '@/model/looseFilters'

function buildShareableUrl(queryParams: LooseFilters): string {
  let baseUrl = `${import.meta.env.VITE_BASE_URL}`
  let filterParams = ''
  if (JSON.stringify(queryParams).includes(':')) {
    filterParams = filterParams.concat(`${queryParams.filters}`)

    // ----- Map Filters -----
    if (FilterKeys.BASE_MOB_COUNT in queryParams && queryParams.baseMobCount) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.BASE_MOB_COUNT}=${queryParams.baseMobCount}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.BASE_MOB_COUNT}=${queryParams.baseMobCount}`)
    }
    if (FilterKeys.RUSHABLE_BOSS in queryParams && queryParams.rushableBoss) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.RUSHABLE_BOSS}=${queryParams.rushableBoss}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.RUSHABLE_BOSS}=${queryParams.rushableBoss}`)
    }
    // --------------------------

    // ------ Boss Filters ------
    if (FilterKeys.NUMBER_OF_BOSSES in queryParams && queryParams.numberOfBosses) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.NUMBER_OF_BOSSES}=${queryParams.numberOfBosses}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.NUMBER_OF_BOSSES}=${queryParams.numberOfBosses}`)
    }
    if (FilterKeys.EXCLUDE_PHASED_BOSSES in queryParams && queryParams.excludePhasedBosses) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.EXCLUDE_PHASED_BOSSES}=${queryParams.excludePhasedBosses}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.EXCLUDE_PHASED_BOSSES}=${queryParams.excludePhasedBosses}`)
    }
    if (FilterKeys.INCLUDE_SKIPPABLE_PHASES in queryParams && queryParams.includeSkippablePhases) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.INCLUDE_SKIPPABLE_PHASES}=${queryParams.includeSkippablePhases}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.INCLUDE_SKIPPABLE_PHASES}=${queryParams.includeSkippablePhases}`)
    }
    if (FilterKeys.INCLUDE_SPAWN_INTRO in queryParams && queryParams.includeSpawnIntro) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.INCLUDE_SPAWN_INTRO}=${queryParams.includeSpawnIntro}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.INCLUDE_SPAWN_INTRO}=${queryParams.includeSpawnIntro}`)
    }
    if (FilterKeys.EXCLUDE_SPAWNED_BOSSES in queryParams && queryParams.excludeSpawnedBosses) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.EXCLUDE_SPAWNED_BOSSES}=${queryParams.excludeSpawnedBosses}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.EXCLUDE_SPAWNED_BOSSES}=${queryParams.excludeSpawnedBosses}`)
    }
    // ---------------------------

    // - Divination Card Filters -
    if (FilterKeys.MIN_DIVINATION_CARD_PRICE in queryParams && queryParams.minDivinationCardPrice) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.MIN_DIVINATION_CARD_PRICE}=${queryParams.minDivinationCardPrice}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.MIN_DIVINATION_CARD_PRICE}=${queryParams.minDivinationCardPrice}`)
    }
    if (FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE in queryParams && queryParams.minEffectiveDivinationCardValue) {
      baseUrl = baseUrl.concat(baseUrl.includes('?') ? '&' : '?')
      baseUrl = baseUrl.concat(`${FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE}=${queryParams.minEffectiveDivinationCardValue}`)
      filterParams = filterParams.concat(filterParams.includes('=') ? ',' : '')
      filterParams = filterParams.concat(`${FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE}=${queryParams.minEffectiveDivinationCardValue}`)
    }
    console.log(filterParams)
    baseUrl = baseUrl.concat(`&filters=${filterParams}`)
  }
  console.log(baseUrl)
  return baseUrl
}

export default buildShareableUrl
