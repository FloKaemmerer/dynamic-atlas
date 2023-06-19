import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {useDivinationCardOverlayStore} from "@/store/DivinationCardOverlayStore";
import type {AtlasNode} from "@/model/atlasNode";
import {OverlayKeys} from "@/model/overlayKeys";


const divinationCardOverlayStore = useDivinationCardOverlayStore();
const atlasNodeStore = useAtlasNodeStore();

export const handleDivinationCardOverlay = (activeDivinationCardOverlay: string, divinationCardName: string) => {
    console.log("selected Divination Card Overlay: " + activeDivinationCardOverlay)
    switch (activeDivinationCardOverlay) {
        case OverlayKeys.BASE_DROP_CHANCE: {
            divinationCardOverlayStore.SET_DIVINATION_CARDS_OVERLAY_NODES(getBaseDropChanceOverlayMap(divinationCardName))
            break;
        }
        case OverlayKeys.HIGHEST_CARD_PRICE_OVERLAY: {
            divinationCardOverlayStore.SET_DIVINATION_CARDS_OVERLAY_NODES(getHighestCardPriceOverlayMap())
            break;
        }
        case OverlayKeys.HIGHEST_EFFECTIVE_VALUE_OVERLAY: {
            divinationCardOverlayStore.SET_DIVINATION_CARDS_OVERLAY_NODES(getHighestEffectiveValueOverlayMap())
            break;
        }
        default: {
            divinationCardOverlayStore.SET_DIVINATION_CARDS_OVERLAY_NODES(new Map())
            break;
        }

    }
}

function getBaseDropChanceOverlayMap(divinationCardName: string) {
    const baseDropChanceOverlayMap = new Map<AtlasNode, string>();
    if (divinationCardName) {
        atlasNodeStore.atlasNodes.forEach(atlasNode => {
            atlasNode.divinationCards.filter(divinationCard => divinationCard.name == divinationCardName)
                .map(divinationCard => baseDropChanceOverlayMap.set(atlasNode, (divinationCard.baseDropChance * 100).toFixed(3) + "%"))
        })
    }
    return baseDropChanceOverlayMap;
}

function getHighestCardPriceOverlayMap() {
    const highestCardPriceOverlayMap = new Map<AtlasNode, string>();
    atlasNodeStore.atlasNodes.forEach(atlasNode => {
        highestCardPriceOverlayMap.set(atlasNode, atlasNode.highestValueDivinationCard.chaosValue.toFixed(0) + "C")
    })
    return highestCardPriceOverlayMap;
}

function getHighestEffectiveValueOverlayMap() {
    const highestEffectiveValueOverlayMap = new Map<AtlasNode, string>();
    atlasNodeStore.atlasNodes.forEach(atlasNode => {
        highestEffectiveValueOverlayMap.set(atlasNode, atlasNode.highestEffectiveValueDivinationCard.effectiveValue.toFixed(0) + "C")
    })
    return highestEffectiveValueOverlayMap;
}
