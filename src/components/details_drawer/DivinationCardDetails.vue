<script setup lang="ts">
import { ref } from 'vue'
import type { AtlasNode } from '@/model/atlasNode'
import type { DivinationCard } from '@/model/divinationCard'

interface PropsInterface {
  atlasNode: AtlasNode
}

const props = defineProps<PropsInterface>()

const showLowValueCards = ref(false)

function getDivinationCards(): DivinationCard[] | undefined {
  const divinationCards = props.atlasNode.divinationCards
  if (showLowValueCards.value) {
    return divinationCards
  }
  return divinationCards?.filter((divinationCard) => {
    return divinationCard.chaosValue > 5
  })
}
</script>

<template>
  <v-toolbar color="blue" density="compact">
    <v-toolbar-title class="text-h5 text-center text-offwhite">
      Divination Cards
    </v-toolbar-title>
  </v-toolbar>
  <v-card-text class="pl-3 pr-0 py-0" style="max-width:400px;">
    <v-sheet color="transparent" class="py-2 text-center text-offwhite">
      <v-checkbox
        v-model="showLowValueCards" label="Show Low Value Cards"
      />
      <v-sheet color="transparent" class="d-inline-flex justify-center flex-wrap">
        <div
          v-for="divinationCard in getDivinationCards()"
          :key="divinationCard.name" :class="{ 'valuable-card': divinationCard.chaosValue > 5, 'normal-card': divinationCard.chaosValue <= 5 }" class="text-overline mx-1 my-1"
        >
          <v-tooltip v-if="divinationCard.bossOnly" text="Boss only drop">
            <template #activator="{ props }">
              <v-icon class="mr-1" icon="mdi-skull" v-bind="props" />
            </template>
          </v-tooltip>
          <v-tooltip class="divination-card text-gray-light text-center" min-width="300">
            <template #activator="{ props }">
              <span v-bind="props">
                {{ divinationCard.name }}
              </span>
            </template>
            <div class="text-overline" :class="{ 'valuable-card': divinationCard.chaosValue > 5, 'normal-card': divinationCard.chaosValue <= 5 }">
              {{ divinationCard.name }}
            </div>
            <div class="text-gray-light py-2">
              <p v-if="divinationCard.bossOnly">
                Boss Drop Only: <span class="text-white">{{ divinationCard.bossOnly ? 'Yes' : 'No' }}</span>
              </p>
              <p class="d-flex justify-center">
                Sell Price: <span class="text-white ml-1">{{ divinationCard.chaosValue.toFixed(1) }}</span> <img class="ml-1" :width="24" src="/chaos.webp">
              </p>
              <p class="d-flex justify-center">
                Effective Value: <span class="text-white ml-1">{{ divinationCard.effectiveValue.toFixed(1) }}</span> <img class="ml-1" :width="24" src="/chaos.webp">
              </p>
              <p>
                Base Drop Chance: <span class="text-white">{{ (divinationCard.baseDropChance * 100).toFixed(3) }}%</span>
              </p>
              <p>
                Stack Size: <span class="text-white">{{ divinationCard.stackSize }}</span>
              </p>
            </div>
          </v-tooltip>
        </div>
      </v-sheet>
    </v-sheet>
  </v-card-text>
</template>

<style scoped>

</style>
