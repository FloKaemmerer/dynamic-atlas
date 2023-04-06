import type {DivinationCard} from "@/model/divinationCard";

export interface AtlasNode {
    active: boolean
    ID: string
    Linked: string
    MapTier: number
    LocX: string
    LocY: string
    Name: string
    UniqueMap: boolean
    DivinationCards: DivinationCard[]
    Layout: number
    FilterTags: any[]
    Traversability: number
    NumberOfBosses: number
    AdditionalTags: any[]

}