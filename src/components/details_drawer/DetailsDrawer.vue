<script setup lang="ts">
import { computed } from 'vue'
import calculateEffectiveMapTier from '@/composable/effective-map-tier-calculator'
import DivinationCardDetails from '@/components/details_drawer/DivinationCardDetails.vue'
import GenericMapSpecifications from '@/components/generics/GenericMapSpecifications.vue'
import BossDetails from '@/components/details_drawer/BossDetails.vue'
import LayoutDetails from '@/components/details_drawer/LayoutDetails.vue'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import { useDetailsDrawerStore } from '@/store/DetailsDrawerStore'
import type { AtlasNode } from '@/model/atlasNode'

const atlasNodeStore = useAtlasNodeStore()
const detailsDrawerStore = useDetailsDrawerStore()

const atlasNode = computed<AtlasNode | null>(() => atlasNodeStore.selectedAtlasNode)
const drawer = computed<boolean>(() => detailsDrawerStore.drawer)

const tags = computed(() => atlasNode.value?.additionalTags.join(', ') ?? '')
const mapSpecificationsOrder = computed(() => [
  tags.value,
  'naturalMapTier',
  'effectiveMapTier',
])
const mapsSpecifications = computed(() => ({
  [tags.value]: null,
  naturalMapTier: atlasNode.value?.mapTier ?? 0,
  effectiveMapTier: calculateEffectiveMapTier(atlasNode.value?.mapTier),
}))
</script>

<template>
  <v-navigation-drawer v-if="atlasNode" :model-value="drawer" absolute color="black" location="right" :width="416">
    <v-card color="transparent" rounded="0" flat>
      <v-toolbar color="blue" density="compact">
        <v-toolbar-title class="text-h5 text-center text-offwhite">
          {{ atlasNode.name }} Map
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pl-3 pr-0 py-0" style="max-width:400px;">
        <GenericMapSpecifications
          :specifications="mapsSpecifications"
          :specifications-order="mapSpecificationsOrder"
        />
        <v-divider :thickness="2" class="border-opacity-50" color="blue" />
        <LayoutDetails :atlas-node="atlasNode" />
        <v-divider :thickness="2" class="border-opacity-50" color="blue" />
        <BossDetails :atlas-node="atlasNode" />
        <v-divider :thickness="2" class="border-opacity-50" color="blue" />
      </v-card-text>
      <DivinationCardDetails :atlas-node="atlasNode" />
    </v-card>
  </v-navigation-drawer>
</template>
