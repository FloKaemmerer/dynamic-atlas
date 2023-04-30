<template>
  <v-label>Static Map Properties</v-label>
  <v-row no-gutters>
    <v-col cols="2">
      <v-sheet class="pa-2">
        Map Tier
      </v-sheet>
    </v-col>
    <v-col cols="5">
      <v-sheet class="pa-2">
        <v-label>{{atlasNode.mapTier}}</v-label>
      </v-sheet>
    </v-col>
    <v-col cols="5"></v-col>

    <v-col cols="2">
      <v-sheet class="pa-2">
        ID
      </v-sheet>
    </v-col>
    <v-col cols="5">
      <v-sheet class="pa-2">
        <v-label>{{atlasNode.id}}</v-label>
      </v-sheet>
    </v-col>
    <v-col cols="5"></v-col>

    <v-col cols="2">
      <v-sheet class="pa-2">
        Linked Maps
      </v-sheet>
    </v-col>
    <v-col cols="5">
      <v-sheet class="pa-2">
        <v-label>{{atlasNode.linked}}</v-label>
      </v-sheet>
    </v-col>
    <v-col cols="5"></v-col>

    <v-col cols="2">
      <v-sheet class="pa-2">
        Loc X
      </v-sheet>
    </v-col>
    <v-col cols="5">
      <v-sheet class="pa-2">
        <v-label>{{atlasNode.locX}}</v-label>
      </v-sheet>
    </v-col>
    <v-col cols="5"></v-col>

    <v-col cols="2">
      <v-sheet class="pa-2">
        Loc Y
      </v-sheet>
    </v-col>
    <v-col cols="5">
      <v-sheet class="pa-2">
        <v-label>{{atlasNode.locY}}</v-label>
      </v-sheet>
    </v-col>
    <v-col cols="5"></v-col>

    <v-col cols="2">
      <v-sheet class="pa-2">
        Unique Map
      </v-sheet>
    </v-col>
    <v-col cols="5">
      <v-sheet class="pa-2">
        <v-label>{{atlasNode.uniqueMap}}</v-label>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">

import type {AtlasNode} from "@/model/atlasNode";

defineProps<{
  atlasNode?: AtlasNode
}>()

</script>

<style scoped>

</style>