import { FilterKeys } from '@/model/filterKeys'
import type { LooseFilters } from '@/model/looseFilters'

function buildShareableUrl(queryParams: LooseFilters): string {
  let shareableUrl = `${import.meta.env.VITE_BASE_URL}`

  let firstFilterValue = true
  // ----- Map Filters -----
  if (FilterKeys.FILTER_TEXT in queryParams && queryParams.filterText && String(queryParams.filterText).length > 0) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.FILTER_TEXT}=${queryParams.filterText}`)
    firstFilterValue = false
  }

  if (FilterKeys.MAP_TIER in queryParams && queryParams.mapTier) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.MAP_TIER}=${queryParams.mapTier}`)
    firstFilterValue = false
  }
  if (FilterKeys.OPENNESS in queryParams && queryParams.openness) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.OPENNESS}=${queryParams.openness}`)
    firstFilterValue = false
  }
  if (FilterKeys.TRAVERSABILITY in queryParams && queryParams.traversability) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.TRAVERSABILITY}=${queryParams.traversability}`)
    firstFilterValue = false
  }
  if (FilterKeys.BACKTRACK_FACTOR in queryParams && queryParams.backtrackFactor) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.BACKTRACK_FACTOR}=${queryParams.backtrackFactor}`)
    firstFilterValue = false
  }
  if (FilterKeys.LINEARITY in queryParams && queryParams.linearity) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.LINEARITY}=${queryParams.linearity}`)
    firstFilterValue = false
  }
  if (FilterKeys.TERRAIN_SLOTS in queryParams && queryParams.terrainSlots) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.TERRAIN_SLOTS}=${queryParams.terrainSlots}`)
    firstFilterValue = false
  }
  if (FilterKeys.BASE_MOB_COUNT in queryParams && queryParams.baseMobCount) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.BASE_MOB_COUNT}=${queryParams.baseMobCount}`)
    firstFilterValue = false
  }
  if (FilterKeys.RUSHABLE_BOSS in queryParams && queryParams.rushableBoss) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.RUSHABLE_BOSS}=${queryParams.rushableBoss}`)
    firstFilterValue = false
  }
  // --------------------------

  // ------ Boss Filters ------
  if (FilterKeys.NUMBER_OF_BOSSES in queryParams && queryParams.numberOfBosses) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.NUMBER_OF_BOSSES}=${queryParams.numberOfBosses}`)
    firstFilterValue = false
  }
  if (FilterKeys.EXCLUDE_PHASED_BOSSES in queryParams && queryParams.excludePhasedBosses) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.EXCLUDE_PHASED_BOSSES}=${queryParams.excludePhasedBosses}`)
    firstFilterValue = false
  }
  if (FilterKeys.INCLUDE_SKIPPABLE_PHASES in queryParams && queryParams.includeSkippablePhases) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.INCLUDE_SKIPPABLE_PHASES}=${queryParams.includeSkippablePhases}`)
    firstFilterValue = false
  }
  if (FilterKeys.INCLUDE_SPAWN_INTRO in queryParams && queryParams.includeSpawnIntro) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.INCLUDE_SPAWN_INTRO}=${queryParams.includeSpawnIntro}`)
    firstFilterValue = false
  }
  if (FilterKeys.EXCLUDE_SPAWNED_BOSSES in queryParams && queryParams.excludeSpawnedBosses) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.EXCLUDE_SPAWNED_BOSSES}=${queryParams.excludeSpawnedBosses}`)
    firstFilterValue = false
  }
  // ---------------------------

  // - Divination Card Filters -
  if (FilterKeys.MIN_DIVINATION_CARD_PRICE in queryParams && queryParams.minDivinationCardPrice) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.MIN_DIVINATION_CARD_PRICE}=${queryParams.minDivinationCardPrice}`)
    firstFilterValue = false
  }
  if (FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE in queryParams && queryParams.minEffectiveDivinationCardValue) {
    shareableUrl = shareableUrl.concat(firstFilterValue ? '?' : '&')
    shareableUrl = shareableUrl.concat(`${FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE}=${queryParams.minEffectiveDivinationCardValue}`)
    firstFilterValue = false
  }
  return shareableUrl
}

export default buildShareableUrl
