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
import {onMounted, ref} from "vue";
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

let toggleAboutOverlay = ref(false)
let toggleImproveOverlay = ref(false)
let toggleContactOverlay = ref(false)
let toggleGlossaryOverlay = ref(false)
let toggleChangelogOverlay = ref(false)

onMounted(() => {
    // We need to import the AtlasFilter composable, otherwise it won't trigger, eventhough it is subscribed to the FilterStore
    initFilter()
})

</script>