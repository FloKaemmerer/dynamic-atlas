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
            Filters
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>Layout Filters
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row no-gutters>
                  <v-col>
                    Map Tier
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeMapTier" density="compact"></v-checkbox>
                  </v-col>
                  <v-col>
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
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    Openness
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeLayout" density="compact"></v-checkbox>
                  </v-col>
                  <v-col>
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
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    Traversability
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeTraversability" density="compact"></v-checkbox>
                  </v-col>
                  <v-col>
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
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    Backtrack Factor
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeBacktrackFactor" density="compact"></v-checkbox>
                  </v-col>
                  <v-col>
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
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    Linearity
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeLinearity" density="compact" disabled></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-range-slider
                        v-model="mapTier"
                        strict
                        direction="horizontal"
                        step="1"
                        show-ticks="always"
                        tick-size="4"
                        :max="16"
                        :min="1"
                        disabled
                    >
                      <template v-slot:prepend>
                        <v-label style="white-space: break-spaces">{{ mapTier[0] }}</v-label>
                      </template>
                      <template v-slot:append>
                        <v-label style="white-space: break-spaces">{{ mapTier[1] }}</v-label>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    Base Mob Count
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeBaseMobCount" density="compact" disabled></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-range-slider
                        v-model="mapTier"
                        strict
                        direction="horizontal"
                        step="1"
                        show-ticks="always"
                        tick-size="4"
                        :max="10"
                        :min="1"
                        disabled
                    >
                      <template v-slot:prepend>
                        <v-label style="white-space: break-spaces">{{ mapTier[0] }}</v-label>
                      </template>
                      <template v-slot:append>
                        <v-label style="white-space: break-spaces">{{ mapTier[1] }}</v-label>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-checkbox label="Rushable Boss" v-model="rushableBoss" density="compact" disabled></v-checkbox>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>Boss Filters</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-checkbox label="Exclude Phased Bosses" v-model="excludePhasedBosses" density="compact"
                            disabled></v-checkbox>
                <v-checkbox label="Include Bosses With skippable Phases" v-model="skippablePhases" density="compact"
                            disabled></v-checkbox>
                <v-checkbox label="Include Bosses With Spawn-Intro" v-model="spawnIntro" density="compact"
                            disabled></v-checkbox>
                <v-checkbox label="Include Spawned Bosses" v-model="spawnIntro" density="compact" disabled></v-checkbox>
                <v-row no-gutters>
                  <v-col>
                    Number of Bosses
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                    <v-checkbox v-model="includeNumberOfBosses" density="compact"></v-checkbox>
                  </v-col>
                  <v-col>
                    <v-range-slider
                        v-model="numberOfBosses"
                        strict
                        direction="horizontal"
                        step="1"
                        show-ticks="always"
                        tick-size="4"
                        :max="4"
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
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>Divination Card Filters</v-expansion-panel-title>
              <v-expansion-panel-text>
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
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title class="text-h6">
            Overlays
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>Overlays</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-checkbox label="Openness" v-model="openessOverlay" density="compact" disabled></v-checkbox>
                <v-checkbox label="Traversability" v-model="traversabilityOverlay" density="compact"
                            disabled></v-checkbox>
                <v-checkbox label="Linearity" v-model="linearityOverlay" density="compact" disabled></v-checkbox>
                <v-checkbox label="Backtrack Factor" v-model="backtrackFactorOverlay" density="compact"
                            disabled></v-checkbox>
                <v-checkbox label="Base Mob Count" v-model="baseMapCountOverlay" density="compact"
                            disabled></v-checkbox>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
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
          includeBacktrackFactor.value ? backtrackFactor.value : [-1, -1]
      )
    });

</script>