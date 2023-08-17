import { defineStore } from 'pinia'
import type { AtlasNode } from '@/model/atlasNode'

// @ts-expect-error atlasNodes.json can be imported
import atlasNodes from '/src/assets/atlas/atlasNodes.json'
import type { Filter } from '@/model/filter/filter'

interface State {
  selectedAtlasNode: AtlasNode | null
  atlasNodes: Array<AtlasNode>
  inactiveAtlasNodes: Array<AtlasNode>

  atlasNodesMap: Map<string, AtlasNode>
  filteredAtlasNodesPerFilter: Map<Filter, Array<string>>

  dropRestrictedDivinationCardNames: Array<string>
}

export const useAtlasNodeStore = defineStore('atlas-node', {
  state: (): State => {
    return {
      selectedAtlasNode: null,
      atlasNodes: [],
      inactiveAtlasNodes: [],
      atlasNodesMap: new Map(),
      filteredAtlasNodesPerFilter: new Map(),
      dropRestrictedDivinationCardNames: [],
    }
  },

  actions: {
    SET_SELECTED_ATLAS_NODE(selectedAtlasNode: AtlasNode) {
      this.selectedAtlasNode = selectedAtlasNode
    },

    ADD_FILTERED_ATLAS_NODE_IDS(filter: Filter, filteredAtlasNodeIds: Array<string>) {
      this.filteredAtlasNodesPerFilter.set(filter, filteredAtlasNodeIds)
    },

    async setupAtlasData() {
      console.log('setting up Atlas Data')

      atlasNodes.forEach((atlasNodeElement) => {
        const atlasNode = atlasNodeElement as AtlasNode
        if (atlasNode.active) {
          atlasNode.filterTags = [atlasNode.name.toLowerCase()]
          if (atlasNode.divinationCards) {
            atlasNode.filterTags = atlasNode.filterTags.concat(atlasNode.divinationCards.map((value) => {
              if (!this.dropRestrictedDivinationCardNames.includes(value.name)) {
                this.dropRestrictedDivinationCardNames.push(value.name)
              }
              return value.name.toLowerCase()
            }))
          }
          atlasNode.filterTags = atlasNode.filterTags.concat(getMapTierFilterTags(atlasNode.mapTier))
          atlasNode.additionalTags.forEach(tag => atlasNode.filterTags.push(tag.toLowerCase()))
          this.atlasNodesMap.set(atlasNode.id, atlasNode)
          this.atlasNodes.push(atlasNode)
          if (atlasNode.divinationCards) {
            atlasNode.divinationCards = atlasNode.divinationCards.sort((a, b) => {
              return a.chaosValue >= b.chaosValue ? -1 : 1
            })
          }
        }
        else {
          this.inactiveAtlasNodes.push(atlasNode)
        }
      })
      this.dropRestrictedDivinationCardNames.sort()

      function getMapTierFilterTags(mapTier: number): string[] {
        return [`tier ${mapTier}`, `t${mapTier}`, `tier: ${mapTier}`, `${mapTier}`, `natural tier: ${mapTier}`, `natural tier ${mapTier}`]
      }
    },
  },
})
