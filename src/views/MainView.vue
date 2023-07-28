<script setup lang="ts">
import DynamicAtlas from '@/components/DynamicAtlas.vue'
import FilterDrawer from '@/components/filter_drawer/FilterDrawer.vue'
import DetailsDrawer from '@/components/details_drawer/DetailsDrawer.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <FilterDrawer />
  <MainHeader />
  <DynamicAtlas />
  <DetailsDrawer :drawer="false" />
  <MainFooter />
</template>
