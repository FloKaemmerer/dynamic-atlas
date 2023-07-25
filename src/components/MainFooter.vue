
<script setup lang="ts">
import { ref } from "vue";

import AboutOverlay from "@/components/filter_drawer/overlays/AboutOverlay.vue";
import ImproveOverlay from "@/components/filter_drawer/overlays/ImproveOverlay.vue";
import ContactOverlay from "@/components/filter_drawer/overlays/ContactOverlay.vue";
import GlossaryOverlay from "@/components/filter_drawer/overlays/GlossaryOverlay.vue";
import ChangelogOverlay from "@/components/filter_drawer/overlays/ChangelogOverlay.vue";


let toggleAboutOverlay = ref(false)
let toggleImproveOverlay = ref(false)
let toggleContactOverlay = ref(false)
let toggleGlossaryOverlay = ref(false)
let toggleChangelogOverlay = ref(false)
</script>
<template>
<v-footer border app color='grey-darken-4' class="text-grey-lighten-3" >
    <v-row justify="center" no-gutters> 
      <v-col class="text-center" cols="12">
        <v-btn variant="text" @click="toggleAboutOverlay = !toggleAboutOverlay">
          About
        </v-btn>
        |
        <v-btn variant="text" @click="toggleImproveOverlay = !toggleImproveOverlay">
          Improve
        </v-btn>
        |
        <v-btn variant="text" @click="toggleContactOverlay = !toggleContactOverlay">
          Contact
        </v-btn>
        |
        <v-btn variant="text" @click="toggleGlossaryOverlay = !toggleGlossaryOverlay">
          Glossary
        </v-btn>
        |
        <v-btn variant="text" @click="toggleChangelogOverlay = !toggleChangelogOverlay">
          Changelog
        </v-btn>
      </v-col>
      <v-col cols="6">
        <small>© {{ new Date().getFullYear() }} PoeAtlas.app. All Rights Reserved.</small>
      </v-col>
      <v-col class="text-right" cols="6">
        <small>This product isn't affiliated with or endorsed by Grinding Gear Games in any way.</small>
      </v-col>
    </v-row>
  </v-footer>
  
  <AboutOverlay :toggleOverlay="toggleAboutOverlay"></AboutOverlay>
  <ImproveOverlay :toggleOverlay="toggleImproveOverlay"></ImproveOverlay>
  <ContactOverlay :toggleOverlay="toggleContactOverlay"></ContactOverlay>
  <GlossaryOverlay :toggle-overlay="toggleGlossaryOverlay"></GlossaryOverlay>
  <ChangelogOverlay :toggle-overlay="toggleChangelogOverlay"></ChangelogOverlay>
</template>
