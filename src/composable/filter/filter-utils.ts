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
