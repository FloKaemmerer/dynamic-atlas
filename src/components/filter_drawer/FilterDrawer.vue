<template>
    <v-navigation-drawer floating :width="400" class="bg-surface-variant mb-6" permanent absolute>
        <v-row no-gutters>
            <v-col>
                <v-card>
                    <v-toolbar density="compact">
                        <v-toolbar-title class="text-h6">
                            Filters
                        </v-toolbar-title>
                        <template v-slot:append>
                            <v-tooltip>
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-content-copy" @click="copyShareableLinkToClipboard()"
                                           v-bind="props"></v-btn>
                                </template>
                                <p>Copy Shareable Link to Clipboard</p>
                            </v-tooltip>
                        </template>
                    </v-toolbar>
                    <v-card-text>
                        <TextFilterHolder/>

                        <MapFilterHolder/>
                        <BossFilterHolder/>
                        <DivinationCardFilterHolder/>
                    </v-card-text>
                </v-card>
                <AtlasOverlayHolder/>

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn variant="text" @click="toggleAboutOverlay = !toggleAboutOverlay">
                    About
                </v-btn>
                <v-label>|</v-label>
                <v-btn variant="text" @click="toggleImproveOverlay = !toggleImproveOverlay">
                    Improve
                </v-btn>
                <v-label>|</v-label>
                <v-btn variant="text" @click="toggleContactOverlay = !toggleContactOverlay">
                    Contact
                </v-btn>
                <v-label>|</v-label>
                <v-btn variant="text" @click="toggleGlossaryOverlay = !toggleGlossaryOverlay">
                    Glossary
                </v-btn>
                <v-label>|</v-label>
                <v-btn variant="text" @click="toggleChangelogOverlay = !toggleChangelogOverlay">
                    Changelog
                </v-btn>
            </v-col>
        </v-row>
    </v-navigation-drawer>
    <AboutOverlay :toggleOverlay="toggleAboutOverlay"></AboutOverlay>
    <ImproveOverlay :toggleOverlay="toggleImproveOverlay"></ImproveOverlay>
    <ContactOverlay :toggleOverlay="toggleContactOverlay"></ContactOverlay>
    <GlossaryOverlay :toggle-overlay="toggleGlossaryOverlay"></GlossaryOverlay>
    <ChangelogOverlay :toggle-overlay="toggleChangelogOverlay"></ChangelogOverlay>

</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {initFilter} from "@/composable/atlasFilter";
import DivinationCardFilterHolder
    from "@/components/filter_drawer/filters/divination_card_filters/DivinationCardFilterHolder.vue";
import BossFilterHolder from "@/components/filter_drawer/filters/boss_filters/BossFilterHolder.vue";
import MapFilterHolder from "@/components/filter_drawer/filters/map_filters/MapFilterHolder.vue";
import TextFilterHolder from "@/components/filter_drawer/filters/text_filters/TextFilterHolder.vue";
import AtlasOverlayHolder from "@/components/overlays/atlas_overlays/overlayHolder.vue";
import AboutOverlay from "@/components/overlays/AboutOverlay.vue";
import ImproveOverlay from "@/components/overlays/ImproveOverlay.vue";
import ContactOverlay from "@/components/overlays/ContactOverlay.vue";
import GlossaryOverlay from "@/components/overlays/GlossaryOverlay.vue";
import ChangelogOverlay from "@/components/overlays/ChangelogOverlay.vue";
import type {LocationQuery, RouteLocationNormalizedLoaded, Router} from "vue-router";
import {useRoute, useRouter} from "vue-router";
import {useFilterStore} from "@/store/FilterStore";
import type {LooseFilters} from "@/model/looseFilters";
import {useFilterQueryStore} from "@/store/FilterQueryStore";
import buildShareableUrl from "@/composable/shareable-url-builder";
import copyToClipBoard from "@/composable/copy-utils";
import handleUrlQueryFilters from "@/composable/url-query-filter-handler";

let toggleAboutOverlay = ref(false)
let toggleImproveOverlay = ref(false)
let toggleContactOverlay = ref(false)
let toggleGlossaryOverlay = ref(false)
let toggleChangelogOverlay = ref(false)

const filterStore = useFilterStore();
const filterQueryStore = useFilterQueryStore();
const route: RouteLocationNormalizedLoaded = useRoute();
const router: Router = useRouter();


onBeforeMount(() => {
    // We need to import the AtlasFilter composable, otherwise it won't trigger, even though it is subscribed to the FilterStore
    initFilter()
    handleQueryParams()
})

async function handleQueryParams() {
    await router.isReady();
    const queryParams: LocationQuery = route.query;
    handleUrlQueryFilters(queryParams)
}

filterStore.$subscribe((mutation, state) => {
    let queryFilters: LooseFilters = {}
    // ----- Map Filters -----
    if (state.filterText && state.filterText.length > 0) {
        queryFilters.filterText = state.filterText
    }
    if (state.mapTier[0] >= 0 && state.includeMapTier) {
        queryFilters.mapTier = String(state.mapTier)
    }
    if (state.openness[0] >= 0 && state.includeOpenness) {
        queryFilters.openness = String(state.openness)
    }
    if (state.traversability[0] >= 0 && state.includeTraversability) {
        queryFilters.traversability = String(state.traversability)
    }
    if (state.backtrackFactor[0] >= 0 && state.includeBacktrackFactor) {
        queryFilters.backtrackFactor = String(state.backtrackFactor)
    }
    if (state.linearity[0] >= 0 && state.includeLinearity) {
        queryFilters.linearity = String(state.linearity)
    }
    if (state.baseMobCount[0] >= 0 && state.includeBaseMobCount) {
        queryFilters.baseMobCount = String(state.baseMobCount)
    }
    if (state.rushableBoss) {
        queryFilters.rushableBoss = String(state.rushableBoss)
    }
    //--------------------------

    //------ Boss Filters ------
    if (state.numberOfBosses[0] >= 0 && state.includeNumberOfBosses) {
        queryFilters.numberOfBosses = String(state.numberOfBosses)
    }
    if (state.excludePhasedBosses) {
        queryFilters.excludePhasedBosses = String(state.excludePhasedBosses)
    }
    if (state.includeSkippablePhases) {
        queryFilters.includeSkippablePhases = String(state.includeSkippablePhases)
    }
    if (state.includeSpawnIntro) {
        queryFilters.includeSpawnIntro = String(state.includeSpawnIntro)
    }
    if (state.excludeSpawnedBosses) {
        queryFilters.excludeSpawnedBosses = String(state.excludeSpawnedBosses)
    }
    //---------------------------

    //- Divination Card Filters -
    if (state.minDivinationCardPrice > 0) {
        queryFilters.minDivinationCardPrice = state.minDivinationCardPrice
    }
    if (state.minEffectiveDivinationCardValue > 0) {
        queryFilters.minEffectiveDivinationCardValue = state.minEffectiveDivinationCardValue
    }
    //---------------------------

    filterQueryStore.SET_FILTER_QUERY(queryFilters)

    pushToRouter(queryFilters).then(() => {
        console.log(route.query)
    })
})

function copyShareableLinkToClipboard() {
    const queryParams = filterQueryStore.filterQuery;

    const shareableUrl = buildShareableUrl(queryParams);
    copyToClipBoard(shareableUrl)
}

async function pushToRouter(queryFilters: LooseFilters) {
    await router.isReady();
    await router.push({query: queryFilters})
}
</script>