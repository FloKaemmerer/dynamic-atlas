import {useVoidStoneStore} from "@/store/voidStoneStore";

const voidStoneStore = useVoidStoneStore()
const calculateEffectiveMapTier = (mapTier: number) => {
    const numberOfSocketedVoidStones = voidStoneStore.numberOfSocketedVoidStones;
    return numberOfSocketedVoidStones == 0 ? mapTier : Math.min(mapTier + numberOfSocketedVoidStones * 4 - 1, 16)
}

export default calculateEffectiveMapTier