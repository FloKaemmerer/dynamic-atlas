<script setup lang="ts">
import DivinationCardFilterHolder
  from '@/components/filter_drawer/filters/divination_card_filters/DivinationCardFilterHolder.vue'
import BossFilterHolder from '@/components/filter_drawer/filters/boss_filters/BossFilterHolder.vue'
import MapFilterHolder from '@/components/filter_drawer/filters/map_filters/MapFilterHolder.vue'
import TextFilterHolder from '@/components/filter_drawer/filters/text_filters/TextFilterHolder.vue'
import FilterPropertiesHolder from '@/components/filter_drawer/FilterPropertiesHolder.vue'
</script>

<template>
  <v-card color="transparent">
    <v-card-text class="pl-3 pr-0" style="max-width:400px;">
      <FilterPropertiesHolder />
      <TextFilterHolder />
      <v-expansion-panels multiple>
        <MapFilterHolder />
        <BossFilterHolder />
        <DivinationCardFilterHolder />
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>
