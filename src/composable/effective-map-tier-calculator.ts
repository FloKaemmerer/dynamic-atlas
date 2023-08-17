import { useVoidStoneStore } from '@/store/voidStoneStore'

const voidStoneStore = useVoidStoneStore()
function calculateEffectiveMapTier(mapTier: number | undefined): number {
  if (!mapTier) {
    return 0
  }
  const numberOfSocketedVoidStones = voidStoneStore.numberOfSocketedVoidStones
  return numberOfSocketedVoidStones === 0 ? mapTier : Math.min(mapTier + numberOfSocketedVoidStones * 4 - 1, 16)
}

export default calculateEffectiveMapTier
