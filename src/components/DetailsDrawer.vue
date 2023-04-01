<template>
  <v-navigation-drawer :model-value="drawer" absolute location="right" :width="350">
    <v-label class="text-h4">{{ atlasNode.Name }}</v-label>
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
                  v-for="tag in atlasNode.DivinationCards"
                  :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {computed} from "vue";
import type {AtlasNode} from '@/model/atlasNode'

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

const atlasNode = computed<AtlasNode>(() => atlasNodeStore.selectedAtlasNode);
const drawer = computed<boolean>(() => detailsDrawerStore.drawer)
</script>