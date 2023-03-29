<template>
  <v-navigation-drawer>
    <v-label>Search:</v-label>
    <v-responsive>
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
    </v-responsive>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {handleTextSearch} from "@/composable/text-search";

let searchText = ref("");

watch( searchText,
    (searchText) => {
      handleTextSearch(searchText)
    });

</script>