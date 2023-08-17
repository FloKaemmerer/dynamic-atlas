<script setup lang="ts">
import type { AtlasNode } from '@/model/atlasNode'
import GenericMapSpecifications from '@/components/generics/GenericMapSpecifications.vue'

interface PropsInterface {
  atlasNode: AtlasNode
}

defineProps<PropsInterface>()
const bossSpecificationsOrder = [
  'numberOfBosses',
  'phased',
  'skippablePhases',
  'introPhase',
  'spawned',
  'bossArena',
]
</script>

<template>
  <GenericMapSpecifications
    :specifications-order="bossSpecificationsOrder"
    :specifications="atlasNode.boss"
  />
</template>

<style scoped>

</style>
