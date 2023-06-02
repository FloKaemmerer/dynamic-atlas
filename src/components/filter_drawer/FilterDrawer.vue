<template>
    <v-navigation-drawer floating :width="400" class="bg-surface-variant mb-6" permanent absolute>
        <v-row no-gutters>
            <v-col>
                <TextFilterHolder/>

                <v-toolbar density="compact">
                    <v-toolbar-title class="text-h6">
                        Filters
                    </v-toolbar-title>
                </v-toolbar>

                <MapFilterHolder/>
                <BossFilterHolder/>
                <DivinationCardFilterHolder/>

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

let toggleAboutOverlay = ref(false)
let toggleImproveOverlay = ref(false)
let toggleContactOverlay = ref(false)
let toggleGlossaryOverlay = ref(false)
let toggleChangelogOverlay = ref(false)

const filterStore = useFilterStore();
const route: RouteLocationNormalizedLoaded = useRoute();
const router: Router = useRouter();


onBeforeMount(() => {
    // We need to import the AtlasFilter composable, otherwise it won't trigger, eventhough it is subscribed to the FilterStore
    initFilter()
    handleQueryParams()
})

async function handleQueryParams() {
    await router.isReady();
    const queryParams: LocationQuery = route.query;
    if (queryParams) {
        // ----- Map Filters -----
        if ('filterText' in queryParams && queryParams.filterText && queryParams.filterText.toString().length > 0) {
            const filterText: string = queryParams.filterText as string;
            console.log("Setting FilterText to: " + filterText)
            filterStore.SET_FILTER_TEXT(filterText)
        }
        if ('mapTier' in queryParams && queryParams.mapTier) {
            filterStore.SET_INCLUDE_MAP_TIER(true)
            const split = queryParams.mapTier.toString().split(',');
            filterStore.SET_MAP_TIER([Number(split[0]), Number(split[1])])
        }
        if ('openness' in queryParams && queryParams.openness) {
            filterStore.SET_INCLUDE_OPENNESS(true)
            const split = queryParams.openness.toString().split(',');
            filterStore.SET_OPENNESS([Number(split[0]), Number(split[1])])
        }
        if ('traversability' in queryParams && queryParams.traversability) {
            filterStore.SET_INCLUDE_TRAVERSABILITY(true)
            const split = queryParams.traversability.toString().split(',');
            filterStore.SET_TRAVERSABILITY([Number(split[0]), Number(split[1])])
        }
        if ('backtrackFactor' in queryParams && queryParams.backtrackFactor) {
            filterStore.SET_INCLUDE_BACKTRACK_FACTOR(true)
            const split = queryParams.backtrackFactor.toString().split(',');
            filterStore.SET_BACKTRACK_FACTOR([Number(split[0]), Number(split[1])])
        }
        if ('linearity' in queryParams && queryParams.linearity) {
            filterStore.SET_INCLUDE_LINEARITY(true)
            const split = queryParams.linearity.toString().split(',');
            filterStore.SET_LINEARITY([Number(split[0]), Number(split[1])])
        }
        if ('baseMobCount' in queryParams && queryParams.baseMobCount) {
            filterStore.SET_INCLUDE_BASE_MOB_COUNT(true)
            const split = queryParams.baseMobCount.toString().split(',');
            filterStore.SET_BASE_MOB_COUNT([Number(split[0]), Number(split[1])])
        }
        if ('rushableBoss' in queryParams && queryParams.rushableBoss) {
            filterStore.SET_RUSHABLE_BOSS(Boolean(queryParams.rushableBoss))
        }
        //--------------------------

        //------ Boss Filters ------
        if ('numberOfBosses' in queryParams && queryParams.numberOfBosses) {
            filterStore.SET_INCLUDE_NUMBER_OF_BOSSES(true)
            const split = queryParams.numberOfBosses.toString().split(',');
            filterStore.SET_NUMBER_OF_BOSSES([Number(split[0]), Number(split[1])])
        }
        if ('excludePhasedBosses' in queryParams && queryParams.excludePhasedBosses) {
            filterStore.SET_EXCLUDE_PHASED_BOSSES(Boolean(queryParams.excludePhasedBosses))
        }
        if ('includeSkippablePhases' in queryParams && queryParams.includeSkippablePhases) {
            filterStore.SET_INCLUDE_SKIPPABLE_PHASES(Boolean(queryParams.includeSkippablePhases))
        }
        if ('includeSpawnIntro' in queryParams && queryParams.includeSpawnIntro) {
            filterStore.SET_INCLUDE_SPAWN_INTRO(Boolean(queryParams.includeSpawnIntro))
        }
        if ('excludeSpawnedBosses' in queryParams && queryParams.excludeSpawnedBosses) {
            filterStore.SET_EXCLUDE_SPAWNED_BOSSES(Boolean(queryParams.excludeSpawnedBosses))
        }
        //---------------------------

        //- Divination Card Filters -
        if ('minDivinationCardPrice' in queryParams && queryParams.minDivinationCardPrice) {
            filterStore.SET_MINIMUM_DIVINATION_CARD_PRICE(Number(queryParams.minDivinationCardPrice))
        }
        if ('minEffectiveDivinationCardValue' in queryParams && queryParams.minEffectiveDivinationCardValue) {
            filterStore.SET_MINIMUM_EFFECTIVE_DIVINATION_CARD_VALUE(Number(queryParams.minEffectiveDivinationCardValue))
        }
    }
}

filterStore.$subscribe((mutation, state) => {
    let newQueryFilters: LooseFilters = {}
    // ----- Map Filters -----
    if (state.filterText && state.filterText.length > 0) {
        newQueryFilters.filterText = state.filterText
    }
    if (state.mapTier[0] >= 0 && state.includeMapTier) {
        newQueryFilters.mapTier = String(state.mapTier)
    }
    if (state.openness[0] >= 0 && state.includeOpenness) {
        newQueryFilters.openness = String(state.openness)
    }
    if (state.traversability[0] >= 0 && state.includeTraversability) {
        newQueryFilters.traversability = String(state.traversability)
    }
    if (state.backtrackFactor[0] >= 0 && state.includeBacktrackFactor) {
        newQueryFilters.backtrackFactor = String(state.backtrackFactor)
    }
    if (state.linearity[0] >= 0 && state.includeLinearity) {
        newQueryFilters.linearity = String(state.linearity)
    }
    if (state.baseMobCount[0] >= 0 && state.includeBaseMobCount) {
        newQueryFilters.baseMobCount = String(state.baseMobCount)
    }
    if (state.rushableBoss) {
        newQueryFilters.rushableBoss = String(state.rushableBoss)
    }
    //--------------------------

    //------ Boss Filters ------
    if (state.numberOfBosses[0] >= 0 && state.includeNumberOfBosses) {
        newQueryFilters.numberOfBosses = String(state.numberOfBosses)
    }
    if (state.excludePhasedBosses) {
        newQueryFilters.excludePhasedBosses = String(state.excludePhasedBosses)
    }
    if (state.includeSkippablePhases) {
        newQueryFilters.includeSkippablePhases = String(state.includeSkippablePhases)
    }
    if (state.includeSpawnIntro) {
        newQueryFilters.includeSpawnIntro = String(state.includeSpawnIntro)
    }
    if (state.excludeSpawnedBosses) {
        newQueryFilters.excludeSpawnedBosses = String(state.excludeSpawnedBosses)
    }
    //---------------------------

    //- Divination Card Filters -
    if (state.minDivinationCardPrice > 0) {
        newQueryFilters.minDivinationCardPrice = state.minDivinationCardPrice
    }
    if (state.minEffectiveDivinationCardValue > 0) {
        newQueryFilters.minEffectiveDivinationCardValue = state.minEffectiveDivinationCardValue
    }
    pushToRouter(newQueryFilters).then(() => {
        console.log(route.query)
    })
})

async function pushToRouter(queryFilters: LooseFilters) {
    await router.isReady();
    await router.push({name: 'home', query: queryFilters})
}
</script>