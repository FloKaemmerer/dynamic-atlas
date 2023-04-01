<template>
  <v-navigation-drawer permanent floating :width="350">
    <v-container>
      <v-card>
        <v-card-text>
          <v-label class="text-h4">Search:</v-label>
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
        <v-card-text>
          <v-label class="text-h4">Number of Bosses:</v-label>
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
              ></v-text-field>
            </v-col>
          </v-row>
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
let maxNumberOfBosses = ref(6)
let minNumberOfBosses = ref(1)

watch([searchText, includeNumberOfBosses, minNumberOfBosses, maxNumberOfBosses],
    (searchValues) => {
      console.log(searchValues[2])
      console.log(searchValues[3])
      handleSearch(searchValues[0], searchValues[1], [searchValues[2], searchValues[3]])
    });

</script>