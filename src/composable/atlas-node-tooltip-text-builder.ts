import type { AtlasNode } from '@/model/atlasNode'
import calculateEffectiveMapTier from '@/composable/effective-map-tier-calculator'

function buildAtlasNodeTooltipText(atlasNode: AtlasNode): string {
  function getFormattedAdditionalTags() {
    let additionalTags = ''
    let first = true
    atlasNode.additionalTags.forEach((value) => {
      if (first) {
        additionalTags = additionalTags.concat(value)
        first = false
      }
      else {
        additionalTags = additionalTags.concat(`, ${value}`)
      }
    })
    return additionalTags
  }

  return `${atlasNode.name
        }\n\n`
        + `Natural Tier: ${atlasNode.mapTier}\n`
        + `Effective Tier: ${calculateEffectiveMapTier(atlasNode.mapTier)}\n`
        + `Openness: ${atlasNode.nodeLayout.openness}\n`
        + `Traversability: ${atlasNode.nodeLayout.traversability}\n`
        + '\n'
        + `Tags: ${getFormattedAdditionalTags()}\n`
        + '\n'
        + `Highest Price Div Card:\n${atlasNode.highestValueDivinationCard.name} - ${atlasNode.highestValueDivinationCard.chaosValue}C` + '\n'
        + '\n'
        + `Highest Effective Value Div Card:\n${atlasNode.highestEffectiveValueDivinationCard.name} - ${atlasNode.highestEffectiveValueDivinationCard.effectiveValue.toFixed(3)}C` + '\n'
        + '\n'
        + `Notes: ${atlasNode.notes ? atlasNode : ''}`
}

export default buildAtlasNodeTooltipText
