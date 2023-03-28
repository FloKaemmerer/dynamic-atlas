<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, onMounted, ref, watch } from "vue";
import FilterDrawer from '@/components/FilterDrawer.vue'


</script>

<template>
  <v-layout>
    <FilterDrawer />
    <v-main style="width: 100%">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
