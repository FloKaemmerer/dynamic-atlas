<script setup lang="ts">
import { computed } from 'vue'
import calculateEffectiveMapTier from '@/composable/effective-map-tier-calculator'

import type { AtlasNode } from '@/model/atlasNode'

export interface MapToolTipData {
  show: boolean
  x: number
  y: number
  node: AtlasNode
  currentScale: number
}
const props = defineProps<{ toolTipData: MapToolTipData }>()
const tooltipX = computed(() => props.toolTipData.x + 15)
const tooltipY = computed(() => props.toolTipData.y - 5)
</script>

<template>
  <VFadeTransition>
    <div v-if="toolTipData.show" id="tooltip" :style="{ left: `${tooltipX}px`, top: `${tooltipY}px` }">
      <div class="title">
        {{ toolTipData.node.name }}
      </div>
      <div class="text-gray-light text-body-2 my-2 px-4">
        <p v-if="toolTipData.node.additionalTags.length">
          {{ toolTipData.node.additionalTags.join(',') }}
        </p>
        <p>Natural Map Tier: <span class="text-white">{{ toolTipData.node.mapTier }}</span></p>
        <p>Effective Map Tier: <span class="text-white">{{ calculateEffectiveMapTier(toolTipData.node.mapTier) }}</span></p>
        <p>Openness: <span class="text-white">{{ toolTipData.node.nodeLayout.openness }}</span></p>
        <p>Traversability: <span class="text-white">{{ toolTipData.node.nodeLayout.traversability }}</span></p>
        <v-divider :thickness="2" class="border-opacity-50 my-1" color="blue" />
        <div>
          Dropable Tier 17 Maps:
          <p class="d-inline-flex align-center text-white">
            {{ toolTipData.node.tierSeventeenMaps.join(', ') }}
          </p>
        </div>
        <v-divider :thickness="2" class="border-opacity-50 my-1" color="blue" />
        <div>
          Highest Price Div Card: <p class="d-inline-flex align-center text-white">
            {{ toolTipData.node.highestValueDivinationCard.name }} <span class="ml-2 text-accent-light">{{ toolTipData.node.highestValueDivinationCard.chaosValue }}</span><img class="chaos" src="/chaos.webp">
          </p>
        </div>
        <div>
          Highest Effective Value Div Card: <p class="d-inline-flex align-center text-white">
            {{ toolTipData.node.highestEffectiveValueDivinationCard.name }} <span class="ml-2 text-accent-light">{{ toolTipData.node.highestEffectiveValueDivinationCard.effectiveValue.toFixed(1) }}</span><img class="chaos" src="/chaos.webp">
          </p>
        </div>
        <v-divider v-if="toolTipData.node.notes" :thickness="2" class="border-opacity-50 my-1" color="blue" />
        <div v-if="toolTipData.node.notes">
          Notes: <p class="d-inline-flex text-white">
            {{ toolTipData.node.notes }}
          </p>
        </div>
      </div>
    </div>
  </VFadeTransition>
</template>

<style scoped>
#tooltip{
    width:300px;
    text-align:center;
    position:absolute;
    background: rgba(0,0,0,0.75);
}
#tooltip .title{
    color: rgb(var(--v-theme-offwhite));
    width:100%;
    background-color: rgb(var(--v-theme-blue));
    padding: 0.5rem 0;
}
#tooltip .chaos{
    margin-left:0.125rem;
    width:1rem!important;
    height:1rem!important;
}
</style>
