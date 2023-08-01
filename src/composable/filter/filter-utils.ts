import type { Filter } from '@/model/filter'

export function hasActiveFilters(filter: Filter) {
  return (filter.filterText !== undefined)
  || (filter.mapTier !== undefined)
  || (filter.openness !== undefined)
  || (filter.traversability !== undefined)
  || (filter.backtrackFactor !== undefined)
  || (filter.linearity !== undefined)
  || (filter.terrainSlots !== undefined)
  || (filter.baseMobCount !== undefined)
  || (filter.rushableBoss !== undefined)
  || (filter.numberOfBosses !== undefined)
  || (filter.excludePhasedBosses !== undefined)
  || (filter.includeSkippablePhases !== undefined)
  || (filter.includeSpawnIntro !== undefined)
  || (filter.excludeSpawnedBosses !== undefined)
  || (filter.minDivinationCardPrice !== undefined)
  || (filter.minEffectiveDivinationCardValue !== undefined)
}

export function hasToFilterByMapTier(filter: Filter) {
  return filter.includeMapTier && filter.mapTier !== undefined && filter.mapTier.length === 2
}

export function hasToFilterByFilterText(filter: Filter) {
  return (filter.filterText !== undefined && filter.filterText.length) > 0
}

export function hasToFilterByOpenness(filter: Filter) {
  return filter.includeOpenness && filter.openness !== undefined && filter.openness.length === 2
}

export function hasToFilterByRushableBoss(filter: Filter) {
  return filter.rushableBoss !== undefined && filter.rushableBoss
}

export function hasToFilterByTraversability(filter: Filter) {
  return filter.includeTraversability && filter.traversability !== undefined && filter.traversability.length === 2
}

export function hasToFilterByBacktrackFactor(filter: Filter) {
  return filter.includeBacktrackFactor && filter.backtrackFactor !== undefined && filter.backtrackFactor.length === 2
}

export function hasToFilterByLinearity(filter: Filter) {
  return filter.includeLinearity && filter.linearity !== undefined && filter.linearity.length === 2
}

export function hasToFilterByTerrainSlots(filter: Filter) {
  return filter.includeTerrainSlots && filter.terrainSlots !== undefined && filter.terrainSlots.length === 2
}

export function hasToFilterByBaseMobCount(filter: Filter) {
  return filter.includeBaseMobCount && filter.baseMobCount !== undefined && filter.baseMobCount.length === 2
}

export function hasToFilterByNumberOfBosses(filter: Filter) {
  return filter.includeNumberOfBosses && filter.numberOfBosses !== undefined && filter.numberOfBosses.length === 2
}

export function hasToFilterByExcludePhasedBosses(filter: Filter) {
  return filter.excludePhasedBosses !== undefined && filter.excludePhasedBosses
}

export function hasToFilterBySkippablePhases(filter: Filter) {
  return filter.includeSkippablePhases !== undefined && filter.includeSkippablePhases
}

export function hasToFilterBySpawnIntro(filter: Filter) {
  return filter.includeSpawnIntro !== undefined && filter.includeSpawnIntro
}

export function hasToFilterBySpawnedBosses(filter: Filter) {
  return filter.excludeSpawnedBosses !== undefined && filter.excludeSpawnedBosses
}

export function hasToFilterByMinimumDivinationCardPrice(filter: Filter) {
  return filter.minDivinationCardPrice !== undefined && filter.minDivinationCardPrice > 0
}

export function hasToFilterByMinimumEffectiveDivinationCardValue(filter: Filter) {
  return filter.minEffectiveDivinationCardValue !== undefined && filter.minEffectiveDivinationCardValue > 0
}
