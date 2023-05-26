import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {useDivinationCardOverlayStore} from "@/store/DivinationCardOverlayStore";
import type {AtlasNode} from "@/model/atlasNode";


const divinationCardOverlayStore = useDivinationCardOverlayStore();
const atlasNodeStore = useAtlasNodeStore();

export const handleDivinationCardOverlay = (activeDivinationCardOverlay: string, divinationCardName: string) => {
    console.log("selected Divination Card Overlay: " + activeDivinationCardOverlay)
    switch (activeDivinationCardOverlay) {
        case 'baseDropChance': {
            divinationCardOverlayStore.SET_DIVINATION_CARDS_OVERLAY_NODES(getBaseDropChanceOverlayMap(divinationCardName))
            break;
        }

        default: {
            divinationCardOverlayStore.SET_DIVINATION_CARDS_OVERLAY_NODES(new Map())
            break;
        }

    }
}

function getBaseDropChanceOverlayMap(divinationCardName: string) {
    const baseDropChanceOverlayMap = new Map<AtlasNode, number>();
    if (divinationCardName) {
        atlasNodeStore.atlasNodes.forEach(atlasNode => {
            atlasNode.divinationCards.filter(divinationCard => divinationCard.name == divinationCardName)
                .map(divinationCard => baseDropChanceOverlayMap.set(atlasNode, divinationCard.baseDropChance))
        })
    }
    return baseDropChanceOverlayMap;
}
