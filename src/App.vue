<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import { useVoidStoneStore } from '@/store/voidStoneStore'

const atlasNodeStore = useAtlasNodeStore()
const voidstoneStore = useVoidStoneStore()

atlasNodeStore.setupAtlasData()
voidstoneStore.setupVoidstoneData()
</script>

<template>
  <v-app :style="{ background: '#282828' }">
    <v-layout>
      <RouterView />
    </v-layout>
  </v-app>
</template>

<style scoped></style>
