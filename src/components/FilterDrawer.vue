<template>
    <v-navigation-drawer floating :width="400" class="bg-surface-variant mb-6" permanent absolute>
        <v-row no-gutters>
            <v-col>
                <v-card>
                    <v-toolbar density="compact">
                        <v-toolbar-title class="text-h6">
                            Filter by Text
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                                v-model="filterText"
                                density="compact"
                                variant="underlined"
                                label="Filter... (eg: Doctor|Nurse|Patient)"
                                prepend-inner-icon="mdi-magnify"
                                single-line
                                class="mx-2"
                                color="#198754"
                                :hide-details="true"
                                clearable></v-text-field>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-toolbar density="compact">
                        <v-toolbar-title class="text-h6">
                            Filters
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title>Map Filters
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-row no-gutters>
                                        <v-col>
                                            Map Tier
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeMapTier" density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="mapTier"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="16"
                                                    :min="1"
                                                    :disabled="!includeMapTier"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">{{
                                                        mapTier[0]
                                                        }}
                                                    </v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">{{
                                                        mapTier[1]
                                                        }}
                                                    </v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            Openness
                                            <v-tooltip
                                                    text="Openness = Narrow = Toxic Sewers; Openness = Open = Dunes">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                                                </template>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeOpenness" density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="layout"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="10"
                                                    :disabled="!includeOpenness"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">Narrow</v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">Open</v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            Traversability
                                            <v-tooltip
                                                    text="Traversability is the Factor how easy it is to travers the map using a Skill like Shield Charge">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                                                </template>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeTraversability"
                                                        density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="traversability"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="10"
                                                    :disabled="!includeTraversability"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">Easy</v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">Annoying</v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            Backtrack Factor
                                            <v-tooltip
                                                    text="A low Backtrack Factor means, that a map can be cleared without the need to Backtrack">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                                                </template>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeBacktrackFactor"
                                                        density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="backtrackFactor"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="10"
                                                    :min="0"
                                                    :disabled="!includeBacktrackFactor"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">None</v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">Alot</v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            Linearity
                                            <v-tooltip
                                                    text="High linearity is a map with a single more or less narrow Path to be followed (Alleyways, Malformation etc)">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                                                </template>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeLinearity" density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="linearity"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="10"
                                                    :min="0"
                                                    :disabled="!includeLinearity"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">Linear</v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">None Linear</v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col>
                                            Base Mob Count
                                            <v-tooltip
                                                    text="The Base Mob count of Monsters present in the normal version of the map.">
                                                <template v-slot:activator="{ props }">
                                                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                                                </template>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeBaseMobCount"
                                                        density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="baseMobCount"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="10"
                                                    :min="1"
                                                    :disabled="!includeBaseMobCount"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">Low
                                                    </v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">High
                                                    </v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-checkbox label="Rushable Boss" v-model="rushableBoss" density="compact">
                                            <template v-slot:append>
                                                <v-tooltip
                                                        text="A Boss is considered Rushable, if it is easy and/or predictable to reach (eg. Mesa, Dunes)">
                                                    <template v-slot:activator="{ props }">
                                                        <v-icon icon="mdi-information-outline"
                                                                v-bind="props"></v-icon>
                                                    </template>
                                                </v-tooltip>
                                            </template>
                                        </v-checkbox>
                                    </v-row>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title>Boss Filters</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-row no-gutters>
                                        <v-col>
                                            Number of Bosses
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="1">
                                            <v-checkbox v-model="includeNumberOfBosses"
                                                        density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col>
                                            <v-range-slider
                                                    v-model="numberOfBosses"
                                                    strict
                                                    direction="horizontal"
                                                    step="1"
                                                    show-ticks="always"
                                                    tick-size="4"
                                                    :max="4"
                                                    :min="0"
                                                    :disabled="!includeNumberOfBosses"
                                            >
                                                <template v-slot:prepend>
                                                    <v-label style="white-space: break-spaces">{{
                                                        numberOfBosses[0]
                                                        }}
                                                    </v-label>
                                                </template>
                                                <template v-slot:append>
                                                    <v-label style="white-space: break-spaces">{{
                                                        numberOfBosses[1]
                                                        }}
                                                    </v-label>
                                                </template>
                                            </v-range-slider>
                                        </v-col>
                                    </v-row>
                                    <v-checkbox label="Exclude Phased Bosses" v-model="excludePhasedBosses"
                                                density="compact"></v-checkbox>
                                    <v-checkbox label="Include Bosses With skippable Phases"
                                                v-model="includeSkippablePhases" density="compact"
                                                :disabled="!excludePhasedBosses"></v-checkbox>
                                    <v-checkbox label="Include Bosses With Spawn-Intro" v-model="includeSpawnIntro"
                                                density="compact"
                                                :disabled="!excludePhasedBosses"></v-checkbox>
                                    <v-checkbox label="Exclude Spawned Bosses" v-model="excludeSpawnedBosses"
                                                density="compact"></v-checkbox>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-text>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title>Divination Card Filters</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-text-field
                                            v-model="minDivinationCardValue"
                                            hide-details
                                            single-line
                                            label="Minimal Value in Chaos Orbs"
                                            type="number"
                                            variant="outlined"
                                            style="width: 100%"
                                            density="compact"
                                            min="0"></v-text-field>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-toolbar density="compact">
                        <v-toolbar-title class="text-h6">
                            Overlays
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title>Overlays</v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <v-radio-group v-model="activeOverlay">
                                        <v-radio label="None"
                                                 value="none"
                                                 density="compact"></v-radio>
                                        <v-radio label="Openness"
                                                 value="opennessOverlay"
                                                 density="compact">
                                        </v-radio>
                                        <v-radio label="Traversability"
                                                 value="traversabilityOverlay"
                                                 density="compact"
                                        ></v-radio>
                                        <v-radio label="Linearity" value="linearityOverlay"
                                                 density="compact"
                                        ></v-radio>
                                        <v-radio label="Backtrack Factor"
                                                 value="backtrackFactorOverlay"
                                                 density="compact"
                                        ></v-radio>
                                        <v-radio label="Base Mob Count"
                                                 value="baseMobCountOverlay"
                                                 density="compact"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn variant="text" @click="aboutOverlay = !aboutOverlay">
                    About
                </v-btn>
                <v-label>|</v-label>
                <v-btn variant="text" @click="improveOverlay = !improveOverlay">
                    Improve
                </v-btn>
                <v-label>|</v-label>
                <v-btn variant="text" @click="contactOverlay = !contactOverlay">
                    Contact
                </v-btn>
            </v-col>
        </v-row>

    </v-navigation-drawer>
    <v-overlay v-model="aboutOverlay" class="align-center justify-center">
        <v-card>
            <v-card-title>About / Credits</v-card-title>
            <v-card-text>
                All Assets used are property of Grinding Gear Games <br>
                <br>
                AtlasNode Data from poedb.tw<br>
                Divination Card Data from poe.ninja<br>
                Some Layout and Boss Values from mapsOfExile.com<br>
                General Data about Maps from poewiki.net
            </v-card-text>
        </v-card>
    </v-overlay>
    <v-overlay v-model="improveOverlay" class="align-center justify-center" min-width="30%">
        <v-sheet>
            <AtlasNodeEditor/>
        </v-sheet>
    </v-overlay>
    <v-overlay v-model="contactOverlay" class="align-center justify-center" min-width="30%">
        <v-sheet>
            <v-card>
                <v-card-text>
                    info@poeatlas.app
                </v-card-text>
            </v-card>
        </v-sheet>
    </v-overlay>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {handleFilter} from "@/composable/atlasFilter";
import {handleOverlay} from "@/composable/overlayHandler";
import AtlasNodeEditor from "@/components/atlas_node_editor/AtlasNodeEditor.vue";

let aboutOverlay = ref(false)
let improveOverlay = ref(false)
let contactOverlay = ref(false)

let filterText = ref("");

let includeMapTier = ref(false)
let includeNumberOfBosses = ref(false)
let includeOpenness = ref(false)
let includeTraversability = ref(false)
let includeBacktrackFactor = ref(false)
let includeLinearity = ref(false)
let includeBaseMobCount = ref(false)

let rushableBoss = ref(false)
let excludePhasedBosses = ref(false)
let includeSkippablePhases = ref(false)
let includeSpawnIntro = ref(false)
let excludeSpawnedBosses = ref(false)

let mapTier = ref([1, 16])
let numberOfBosses = ref([0, 4])
let layout = ref([0, 10])
let traversability = ref([0, 10])
let backtrackFactor = ref([0, 10])
let linearity = ref([0, 10])
let baseMobCount = ref([0, 10])

let minDivinationCardValue = ref()

let activeOverlay = ref('none')

watch([
        filterText,
        includeMapTier,
        mapTier,
        includeNumberOfBosses,
        excludePhasedBosses,
        numberOfBosses,
        minDivinationCardValue,
        includeOpenness,
        layout,
        includeTraversability,
        traversability,
        includeBacktrackFactor,
        backtrackFactor,
        includeLinearity,
        linearity,
        includeBaseMobCount,
        baseMobCount,
        rushableBoss,
        includeSkippablePhases,
        excludeSpawnedBosses,
        includeSpawnIntro],
    () => {
        handleFilter(
            filterText.value,
            includeMapTier.value ? mapTier.value : [-1, -1],
            excludePhasedBosses.value,
            includeNumberOfBosses.value ? numberOfBosses.value : [-1, -1],
            minDivinationCardValue.value,
            includeOpenness.value ? layout.value : [-1, -1],
            includeTraversability.value ? traversability.value : [-1, -1],
            includeBacktrackFactor.value ? backtrackFactor.value : [-1, -1],
            includeLinearity.value ? linearity.value : [-1, -1],
            includeBaseMobCount.value ? baseMobCount.value : [-1, -1],
            rushableBoss.value,
            includeSkippablePhases.value,
            excludeSpawnedBosses.value,
            includeSpawnIntro.value
        )
    });

watch(activeOverlay, () => {
    console.log("Activating overlay for: " + activeOverlay.value)
    handleOverlay(activeOverlay.value)
});
</script>