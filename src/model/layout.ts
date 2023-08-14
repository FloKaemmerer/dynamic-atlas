export interface Layout {
  linearity: number
  traversability: number
  backtrackFactor: number
  rushableBoss: boolean
  notes: string
  openness: number
  baseMobCount: number
  terrainSlots: number
  [propName: string]: number | boolean | string
}
