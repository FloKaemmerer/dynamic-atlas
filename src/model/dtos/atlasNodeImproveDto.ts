import type {Boss} from "@/model/boss";
import type {Layout} from "@/model/layout";
import type {DivinationCardImproveDto} from "@/model/dtos/divinationCardImproveDto";

export interface AtlasNodeImproveDto {
    active: boolean
    id: string
    linked: string
    mapTier: number
    locX: string
    locY: string
    name: string
    uniqueMap: boolean
    divinationCards: DivinationCardImproveDto[]
    filterTags: any[]
    additionalTags: any[]
    highestValueDivinationCard: DivinationCardImproveDto
    boss: Boss
    nodeLayout: Layout
    notes: any
}