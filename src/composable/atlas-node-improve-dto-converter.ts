import type {AtlasNode} from "@/model/atlasNode";
import type {DivinationCardImproveDto} from "@/model/dtos/divinationCardImproveDto";
import type {AtlasNodeImproveDto} from "@/model/dtos/atlasNodeImproveDto";

const convertToAtlasNodeImproveDto = (atlasNode: AtlasNode) => {
    const divinationCardImproveDtos: DivinationCardImproveDto[] = []
    atlasNode?.divinationCards.forEach(value => {
        divinationCardImproveDtos.push({
            name: value.name
        })
    })
    const atlasNodeImproveDto: AtlasNodeImproveDto = {
        active: atlasNode.active,
        boss: atlasNode.boss,
        additionalTags: atlasNode.additionalTags,
        divinationCards: divinationCardImproveDtos,
        filterTags: atlasNode.filterTags,
        highestValueDivinationCard: {name: atlasNode.highestValueDivinationCard.name},
        linked: atlasNode.linked,
        locX: atlasNode.locX,
        locY: atlasNode.locY,
        mapTier: atlasNode.mapTier,
        nodeLayout: atlasNode.nodeLayout,
        name: atlasNode.name,
        notes: atlasNode.notes,
        uniqueMap: atlasNode.uniqueMap,
        id: atlasNode.id
    }
    return atlasNodeImproveDto;
}

export default convertToAtlasNodeImproveDto