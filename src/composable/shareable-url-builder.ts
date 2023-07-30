import { FilterKeys } from '@/model/filterKeys'
import type { LooseFilters } from '@/model/looseFilters'

function buildShareableUrl(queryParams: LooseFilters): string {
  let shareableUrl = `${import.meta.env.VITE_BASE_URL}`

  // ----- Map Filters -----
  if (FilterKeys.FILTER_TEXT in queryParams && queryParams.filterText && String(queryParams.filterText).length > 0) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.FILTER_TEXT}=${queryParams.filterText}`)
  }

  if (FilterKeys.MAP_TIER in queryParams && queryParams.mapTier) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.MAP_TIER}=${queryParams.mapTier}`)
  }
  if (FilterKeys.OPENNESS in queryParams && queryParams.openness) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.OPENNESS}=${queryParams.openness}`)
  }
  if (FilterKeys.TRAVERSABILITY in queryParams && queryParams.traversability) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.TRAVERSABILITY}=${queryParams.traversability}`)
  }
  if (FilterKeys.BACKTRACK_FACTOR in queryParams && queryParams.backtrackFactor) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.BACKTRACK_FACTOR}=${queryParams.backtrackFactor}`)
  }
  if (FilterKeys.LINEARITY in queryParams && queryParams.linearity) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.LINEARITY}=${queryParams.linearity}`)
  }
  if (FilterKeys.TERRAIN_SLOTS in queryParams && queryParams.terrainSlots) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.TERRAIN_SLOTS}=${queryParams.terrainSlots}`)
  }
  if (FilterKeys.BASE_MOB_COUNT in queryParams && queryParams.baseMobCount) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.BASE_MOB_COUNT}=${queryParams.baseMobCount}`)
  }
  if (FilterKeys.RUSHABLE_BOSS in queryParams && queryParams.rushableBoss) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.RUSHABLE_BOSS}=${queryParams.rushableBoss}`)
  }
  // --------------------------

  // ------ Boss Filters ------
  if (FilterKeys.NUMBER_OF_BOSSES in queryParams && queryParams.numberOfBosses) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.NUMBER_OF_BOSSES}=${queryParams.numberOfBosses}`)
  }
  if (FilterKeys.EXCLUDE_PHASED_BOSSES in queryParams && queryParams.excludePhasedBosses) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.EXCLUDE_PHASED_BOSSES}=${queryParams.excludePhasedBosses}`)
  }
  if (FilterKeys.INCLUDE_SKIPPABLE_PHASES in queryParams && queryParams.includeSkippablePhases) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.INCLUDE_SKIPPABLE_PHASES}=${queryParams.includeSkippablePhases}`)
  }
  if (FilterKeys.INCLUDE_SPAWN_INTRO in queryParams && queryParams.includeSpawnIntro) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.INCLUDE_SPAWN_INTRO}=${queryParams.includeSpawnIntro}`)
  }
  if (FilterKeys.EXCLUDE_SPAWNED_BOSSES in queryParams && queryParams.excludeSpawnedBosses) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.EXCLUDE_SPAWNED_BOSSES}=${queryParams.excludeSpawnedBosses}`)
  }
  // ---------------------------

  // - Divination Card Filters -
  if (FilterKeys.MIN_DIVINATION_CARD_PRICE in queryParams && queryParams.minDivinationCardPrice) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.MIN_DIVINATION_CARD_PRICE}=${queryParams.minDivinationCardPrice}`)
  }
  if (FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE in queryParams && queryParams.minEffectiveDivinationCardValue) {
    shareableUrl = shareableUrl.concat(shareableUrl.includes('?') ? '&' : '?')
    shareableUrl = shareableUrl.concat(`${FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE}=${queryParams.minEffectiveDivinationCardValue}`)
  }
  return shareableUrl
}

export default buildShareableUrl
