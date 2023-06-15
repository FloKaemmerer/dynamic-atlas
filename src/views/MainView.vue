<script setup lang="ts">

import DynamicAtlas from "@/components/DynamicAtlas.vue";
import FilterDrawer from "@/components/filter_drawer/FilterDrawer.vue";
import DetailsDrawer from "@/components/details_drawer/DetailsDrawer.vue";
</script>

<template>
    <FilterDrawer/>
    <DynamicAtlas></DynamicAtlas>
    <DetailsDrawer :drawer="false"/>
</template>

<style scoped>

</style>