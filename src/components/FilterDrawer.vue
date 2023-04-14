<template>
  <v-navigation-drawer permanent floating :width="350">
    <v-container>
      <v-card>
        <v-card-text>
          <v-card-title>Search:</v-card-title>
          <v-text-field
              v-model="searchText"
              density="compact"
              variant="underlined"
              label="Search... (eg: Atoll, Doctor)"
              prepend-inner-icon="mdi-magnify"
              single-line
              class="mx-2"
              color="#198754"
              :hide-details="true"
              clearable></v-text-field>
        </v-card-text>
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-card-title>Bosses:</v-card-title>
        <v-card-text>
          <v-checkbox label="Exclude Phased Bosses" v-model="excludePhasedBosses" density="compact"></v-checkbox>
          <v-checkbox label="Include Number of Bosses" v-model="includeNumberOfBosses" density="compact"></v-checkbox>
          <v-row no-gutters>
            <v-col> Min:</v-col>
            <v-col> Max:</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-text-field
                  v-model="minNumberOfBosses"
                  hide-details
                  single-line
                  type="number"
                  variant="outlined"
                  density="compact"
                  style="width: 70px"
                  min="0"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  v-model="maxNumberOfBosses"
                  hide-details
                  single-line
                  type="number"
                  variant="outlined"
                  style="width: 70px"
                  density="compact"
                  min="0"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-card-title style="white-space: break-spaces">Minimum Divination Card Value:</v-card-title>
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
        <v-card-title>Layout (Openness of the Map)</v-card-title>
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
        <v-card-title>Traversability</v-card-title>
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
    </v-container>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {handleSearch} from "@/composable/atlasSearch";

let searchText = ref("");
let includeNumberOfBosses = ref(false)
let excludePhasedBosses = ref(false)
let maxNumberOfBosses = ref(6)
let minNumberOfBosses = ref(1)
let minDivinationCardValue = ref()
let layout = ref([0, 10])
let traversability = ref([0,10])

watch([searchText, includeNumberOfBosses,excludePhasedBosses, minNumberOfBosses, maxNumberOfBosses, minDivinationCardValue, layout, traversability],
    (searchValues) => {
      if (includeNumberOfBosses.value) {
        handleSearch(searchValues[0], searchValues[2],[searchValues[3], searchValues[4]], searchValues[5], searchValues[6],searchValues[7])
      } else {
        handleSearch(searchValues[0],  searchValues[2],[-1, -1], searchValues[5], searchValues[6],searchValues[7])
      }
    });

</script>