<template>
  <v-navigation-drawer v-if="atlasNode" :model-value="drawer" absolute location="right" :width="350">
    <v-container>
      <v-label class="text-h4">{{ atlasNode.Name}}</v-label>
      <v-spacer></v-spacer>
      <v-label class="text-h5">Natural Tier: {{ atlasNode.MapTier }}</v-label>
      <v-spacer></v-spacer>
      <v-label class="text-h5">Number of Bosses: {{ atlasNode.NumberOfBosses }}</v-label>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-col>
          <v-sheet
              elevation="10"
              rounded="xl">
            <v-sheet class="pa-3 bg-black"
                     rounded="t-xl">Divination Cards
            </v-sheet>

            <div class="pa-4">
              <v-chip-group
                            selected-class="text-primary"
                            column>
                <v-chip
                    v-for="divinationCard in atlasNode.DivinationCards"
                    :key="divinationCard">
                  {{ divinationCard.name }} - {{ divinationCard.chaosValue}} Chaos
                </v-chip>
              </v-chip-group>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {computed} from "vue";
import type {AtlasNode} from '@/model/atlasNode'

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

const atlasNode = computed<AtlasNode | null>(() => atlasNodeStore.selectedAtlasNode);
const drawer = computed<boolean>(() => detailsDrawerStore.drawer)
</script>