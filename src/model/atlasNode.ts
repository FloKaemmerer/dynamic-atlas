import type {DivinationCard} from "@/model/divinationCard";

export interface AtlasNode {

    active: boolean

    id: string

    linked: string

    mapTier: number

    locX: string

    locY: string

    name: string

    uniqueMap: boolean

    divinationCards: DivinationCard[]

    layout: number

    filterTags: any[]

    traversability: number

    numberOfBosses: number

    additionalTags: any[]

    highestValueDivinationCard: DivinationCard

    phasedBoss: boolean
}