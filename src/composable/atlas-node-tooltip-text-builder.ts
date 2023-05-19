import type {AtlasNode} from "@/model/atlasNode";


const buildAtlasNodeTooltipText = (atlasNode: AtlasNode): string => {

    return atlasNode.name +
        "\n\n" +
        "Natural Tier: " + atlasNode.mapTier +
        "\nSome useful Information about the Map. Like layout (open or close), some ratings, number of Bosses, noteable Divcards and so on."
}

export default buildAtlasNodeTooltipText