export interface Boss {
  numberOfBosses: number
  phased: boolean
  skippablePhases: boolean
  introPhase: boolean
  spawned: boolean
  bossArena: boolean
  names: string[]
  notes: any
  [propName: string]: number | boolean | string | string[]
}
