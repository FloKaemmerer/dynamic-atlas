<template>
    <v-navigation-drawer v-if="atlasNode" :model-value="drawer" absolute location="right" :width="350">
        <v-container>
            <v-label class="text-h4">{{ atlasNode.name }}</v-label>
            <v-label class="text-h5">Natural Tier: {{ atlasNode.mapTier }}</v-label>
            <v-label class="text-h5">Effective Tier: {{ calculateEffectiveMapTier(atlasNode.mapTier) }}</v-label>

            <AdditionalTagsDetails :atlas-node="atlasNode"/>
            <LayoutDetails :atlas-node="atlasNode"/>
            <BossDetails :atlas-node="atlasNode"/>
            <DivinationCardDetails :atlas-node="atlasNode"/>
        </v-container>
    </v-navigation-drawer>
</template>

<script setup lang="ts">

import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {computed} from "vue";
import type {AtlasNode} from '@/model/atlasNode'
import AdditionalTagsDetails from "@/components/details_drawer/AdditionalTagsDetails.vue";
import LayoutDetails from "@/components/details_drawer/LayoutDetails.vue";
import BossDetails from "@/components/details_drawer/BossDetails.vue";
import DivinationCardDetails from "@/components/details_drawer/DivinationCardDetails.vue";
import calculateEffectiveMapTier from "../../composable/effective-map-tier-calculator";

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

const atlasNode = computed<AtlasNode | null>(() => atlasNodeStore.selectedAtlasNode);
const drawer = computed<boolean>(() => detailsDrawerStore.drawer)

</script>