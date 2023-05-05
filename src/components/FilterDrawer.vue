<template>
  <v-navigation-drawer floating :width="400" class="bg-surface-variant mb-6">
    <v-container>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Filter by Text
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
              v-model="filterText"
              density="compact"
              variant="underlined"
              label="Filter... (eg: Doctor|Nurse|Patient)"
              prepend-inner-icon="mdi-magnify"
              single-line
              class="mx-2"
              color="#198754"
              :hide-details="true"
              clearable></v-text-field>
        </v-card-text>
      </v-card>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Map Tier
          </v-toolbar-title>
          <template v-slot:append>
            <v-checkbox v-model="includeMapTier" density="compact"></v-checkbox>
          </template>
        </v-toolbar>
        <v-card-text>
          <template v-slot:default>
            <v-range-slider
                v-model="mapTier"
                strict
                direction="horizontal"
                step="1"
                show-ticks="always"
                tick-size="4"
                :max="16"
                :min="1"
                :disabled="!includeMapTier"
            >
              <template v-slot:prepend>
                <v-label style="white-space: break-spaces">{{ mapTier[0] }}</v-label>
              </template>
              <template v-slot:append>
                <v-label style="white-space: break-spaces">{{ mapTier[1] }}</v-label>
              </template>
            </v-range-slider>
          </template>
        </v-card-text>
      </v-card>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Bosses
          </v-toolbar-title>

          <template v-slot:append>
            <v-checkbox v-model="includeNumberOfBosses" density="compact"></v-checkbox>
          </template>
        </v-toolbar>
        <v-card-text>
          <template v-slot:default>
            <v-checkbox label="Exclude Phased Bosses" v-model="excludePhasedBosses" density="compact"></v-checkbox>
            <v-range-slider
                v-model="numberOfBosses"
                strict
                direction="horizontal"
                step="1"
                show-ticks="always"
                tick-size="4"
                :max="6"
                :min="0"
                :disabled="!includeNumberOfBosses"
            >
              <template v-slot:prepend>
                <v-label style="white-space: break-spaces">{{ numberOfBosses[0] }}</v-label>
              </template>
              <template v-slot:append>
                <v-label style="white-space: break-spaces">{{ numberOfBosses[1] }}</v-label>
              </template>
            </v-range-slider>
          </template>
        </v-card-text>
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6" style="white-space: break-spaces" text="Divination Card Value:">
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
              v-model="minDivinationCardValue"
              hide-details
              single-line
              label="Minimal Value in Chaos Orbs"
              type="number"
              variant="outlined"
              style="width: 100%"
              density="compact"
              min="0"></v-text-field>
        </v-card-text>
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Layout
          </v-toolbar-title>
          <template v-slot:append>
            <v-checkbox v-model="includeLayout" density="compact"></v-checkbox>
          </template>
        </v-toolbar>
        <v-card-text>
          <template v-slot:default>
            <v-range-slider
                v-model="layout"
                strict
                direction="horizontal"
                step="1"
                show-ticks="always"
                tick-size="4"
                :max="10"
                :disabled="!includeLayout"
            >
              <template v-slot:prepend>
                <v-label style="white-space: break-spaces">Closed</v-label>
              </template>
              <template v-slot:append>
                <v-label style="white-space: break-spaces">Open</v-label>
              </template>
            </v-range-slider>
          </template>
        </v-card-text>
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Traversability
          </v-toolbar-title>
          <template v-slot:append>
            <v-checkbox v-model="includeTraversability" density="compact"></v-checkbox>
          </template>
        </v-toolbar>
        <v-card-text>
          <template v-slot:default>
            <v-range-slider
                v-model="traversability"
                strict
                direction="horizontal"
                step="1"
                show-ticks="always"
                tick-size="4"
                :max="10"
                :disabled="!includeTraversability"
            >
              <template v-slot:prepend>
                <v-label style="white-space: break-spaces">Easy</v-label>
              </template>
              <template v-slot:append>
                <v-label style="white-space: break-spaces">Annoying</v-label>
              </template>
            </v-range-slider>
          </template>
        </v-card-text>
      </v-card>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Backtrack Factor
          </v-toolbar-title>
          <template v-slot:append>
            <v-checkbox v-model="includeBacktrackFactor" density="compact"></v-checkbox>
          </template>
        </v-toolbar>
        <v-card-text>
          <template v-slot:default>
            <v-range-slider
                v-model="backtrackFactor"
                strict
                direction="horizontal"
                step="1"
                show-ticks="always"
                tick-size="4"
                :max="10"
                :disabled="!includeBacktrackFactor"
            >
              <template v-slot:prepend>
                <v-label style="white-space: break-spaces">None</v-label>
              </template>
              <template v-slot:append>
                <v-label style="white-space: break-spaces">Alot</v-label>
              </template>
            </v-range-slider>
          </template>
        </v-card-text>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {handleFilter} from "@/composable/atlasFilter";

let filterText = ref("");
let includeMapTier = ref(false)
let mapTier = ref([1, 16])
let includeNumberOfBosses = ref(false)
let excludePhasedBosses = ref(false)
let numberOfBosses = ref([0, 6])
let minDivinationCardValue = ref()
let includeLayout = ref(false)
let layout = ref([0, 10])
let includeTraversability = ref(false)
let traversability = ref([0, 10])
let includeBacktrackFactor = ref(false)
let backtrackFactor = ref([0, 10])

watch([
      filterText,
      includeMapTier,
      mapTier,
      includeNumberOfBosses,
      excludePhasedBosses,
      numberOfBosses,
      minDivinationCardValue,
      includeLayout,
      layout,
      includeTraversability,
      traversability,
      includeBacktrackFactor,
      backtrackFactor],
    () => {
      handleFilter(
          filterText.value,
          includeMapTier.value ? mapTier.value : [-1, -1],
          excludePhasedBosses.value,
          includeNumberOfBosses.value ? numberOfBosses.value : [-1, -1],
          minDivinationCardValue.value,
          includeLayout.value ? layout.value : [-1, -1],
          includeTraversability.value ? traversability.value : [-1, -1],
          includeBacktrackFactor.value ? backtrackFactor.value : [-1,-1]

      )    });

</script>