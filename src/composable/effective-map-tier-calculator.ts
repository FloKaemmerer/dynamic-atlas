import {useVoidStoneStore} from "@/store/voidStoneStore";

const voidStoneStore = useVoidStoneStore()
const calculateEffectiveMapTier = (mapTier: number) => {
    const numberOfSocketedVoidStones = voidStoneStore.numberOfSocketedVoidStones;
    if (numberOfSocketedVoidStones == 0) {
        return mapTier
    }
    if (numberOfSocketedVoidStones == 1) {
        return Math.min(mapTier + 3, 16)
    }
    return Math.min(mapTier + numberOfSocketedVoidStones * 4 - 1, 16)
}

export default calculateEffectiveMapTier