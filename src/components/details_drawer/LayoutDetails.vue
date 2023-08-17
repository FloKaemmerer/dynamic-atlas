<script setup lang="ts">
import type { AtlasNode } from '@/model/atlasNode'
import GenericMapSpecifications from '@/components/generics/GenericMapSpecifications.vue'

interface PropsInterface {
  atlasNode: AtlasNode
}

const { atlasNode } = defineProps<PropsInterface>()
const layoutSpecificationsOrder = [
  'openness',
  'traversability',
  'linearity',
  'terrainSlots',
  'backtrackFactor',
  'baseMobCount',
  'rushableBoss',
]
</script>

<template>
  <GenericMapSpecifications
    :specifications-order="layoutSpecificationsOrder"
    :specifications="atlasNode.nodeLayout"
  />
</template>

<style scoped>

</style>
