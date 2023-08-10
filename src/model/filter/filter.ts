export interface Filter {
  id: number
  name: string
  color: string
  active: boolean

  filterText?: string
  includeMapTier?: boolean
  mapTier?: number[]
  includeOpenness?: boolean
  openness?: number[]
  includeTraversability?: boolean
  traversability?: number[]
  includeBacktrackFactor?: boolean
  backtrackFactor?: number[]
  includeLinearity?: boolean
  linearity?: number[]
  includeTerrainSlots?: boolean
  terrainSlots?: number[]
  includeBaseMobCount?: boolean
  baseMobCount?: number[]
  rushableBoss?: boolean
  includeNumberOfBosses?: boolean
  numberOfBosses?: number[]
  excludePhasedBosses?: boolean
  includeSkippablePhases?: boolean
  includeSpawnIntro?: boolean
  excludeSpawnedBosses?: boolean
  minDivinationCardPrice?: number
  minEffectiveDivinationCardValue?: number
}
