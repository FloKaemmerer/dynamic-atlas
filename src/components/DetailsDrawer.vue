<template>
    <v-navigation-drawer :model-value="drawer" absolute location="right">
        <h1>{{ atlasNode.Name }}</h1>
    </v-navigation-drawer>
</template>

<script setup lang ="ts">

import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import { useDetailsDrawerStore } from '@/store/DetailsDrawerStore';
import { computed } from "vue";
import type { AtlasNode } from '@/mixins/atlasNode'

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

const atlasNode = computed<AtlasNode>(() => atlasNodeStore.selectedAtlasNode);
const drawer = computed<boolean>(() => detailsDrawerStore.drawer)
</script>