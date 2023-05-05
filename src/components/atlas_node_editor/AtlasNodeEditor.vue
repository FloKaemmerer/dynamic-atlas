<template>
  <v-container class="bg-surface-variant mb-6">
    <v-row no-gutters>
      <v-col cols="3">
        <v-sheet class="pa-2 ma-2">
          <v-select density="compact"
                    :items="atlasNodeNames()"
                    v-model="selectedAtlasNodeName"
          ></v-select>
        </v-sheet>
      </v-col>
      <v-col cols="9" v-if="selectedAtlasNode">
        <v-row no-gutters>
          <v-col>
            <v-card>
              <v-card-title>{{ selectedAtlasNode.name }}</v-card-title>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="2">
                    <v-sheet class="pa-2">
                      Active
                    </v-sheet>
                  </v-col>
                  <v-col cols="10">
                    <v-sheet class="pa-2">
                      <v-radio-group v-model="selectedAtlasNode.active" density="compact">
                        <v-radio :value=true>
                          <template v-slot:label>
                            <div><strong>Active</strong></div>
                          </template>
                        </v-radio>
                        <v-radio :value=false>
                          <template v-slot:label>
                            <div><strong>Inactive</strong></div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-sheet>
                  </v-col>

                  <v-col cols="2">
                    <v-sheet class="pa-2">
                      Phased Boss
                    </v-sheet>
                  </v-col>
                  <v-col cols="10">
                    <v-sheet class="pa-2">
                      <v-radio-group v-model="selectedAtlasNode.phasedBoss" density="compact">
                        <v-radio :value=true>
                          <template v-slot:label>
                            <div><strong>Phased</strong></div>
                          </template>
                        </v-radio>
                        <v-radio :value=false>
                          <template v-slot:label>
                            <div><strong>Non-Phased</strong></div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-sheet>
                  </v-col>

                  <v-col cols="2">
                    <v-sheet>
                      Additional Tags
                    </v-sheet>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                        hide-details
                        single-line
                        :v-model="additionalTags"
                        min="0"
                        density="compact">
                    </v-text-field>
                  </v-col>
                  <v-col cols="5"></v-col>

                  <v-col cols="2">
                    <v-sheet>
                      Divination Cards
                    </v-sheet>
                  </v-col>
                  <v-col cols="5">
                    <v-textarea
                        hide-details
                        single-line
                        v-model="divinationCardNames"
                        min="0"
                        density="compact">
                    </v-textarea>
                  </v-col>
                  <v-col cols="5"></v-col>

                  <v-col cols="2">
                    <v-sheet>
                      Number of Bosses
                    </v-sheet>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                        hide-details
                        single-line
                        type="number"
                        v-model="selectedAtlasNode.numberOfBosses"
                        min="0"
                        density="compact">
                    </v-text-field>
                  </v-col>
                  <v-col cols="5"></v-col>

                  <v-col cols="2">
                    <v-sheet>
                      Layout
                    </v-sheet>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                        hide-details
                        single-line
                        type="number"
                        v-model="selectedAtlasNode.layout"
                        min="0"
                        density="compact">
                    </v-text-field>
                  </v-col>
                  <v-col cols="5"></v-col>

                  <v-col cols="2">
                    <v-sheet>
                      Traversability
                    </v-sheet>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                        hide-details
                        single-line
                        type="number"
                        v-model="selectedAtlasNode.traversability"
                        min="0"
                        density="compact">
                    </v-text-field>
                  </v-col>
                  <v-col cols="5"></v-col>

                  <v-col cols="2">
                    <v-sheet>
                      Backtrack Factor
                    </v-sheet>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                        hide-details
                        single-line
                        type="number"
                        v-model="selectedAtlasNode.backtrackFactor"
                        min="0"
                        density="compact">
                    </v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-btn
                        :disabled="loading"
                        :loading="loading"
                        block
                        class="text-none mb-4"
                        color="indigo-darken-3"
                        size="x-large"
                        variant="flat"
                        @click="updateSelectedAtlasNode(selectedAtlasNode)">
                      Update
                    </v-btn>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <atlas-node-static-porperty :atlas-node="selectedAtlasNode"/>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {computed, ref, watch} from "vue";
import {AtlasNode} from "@/model/atlasNode";
import AtlasNodeStaticPorperty from "@/components/atlas_node_editor/AtlasNodeStaticPorperty.vue";
import axios from 'axios'

const atlasNodeStore = useAtlasNodeStore();
const atlasNodes = computed<AtlasNode[] | null>(() => atlasNodeStore.atlasNodes);
const selectedAtlasNodeName = ref()

let selectedAtlasNode = ref<AtlasNode>()
let divinationCardNames = ref()
let additionalTags = ref()
let loading = ref()

watch(selectedAtlasNodeName, () => {
  getAtlasNodeByName()
});

function getAtlasNodeByName(): AtlasNode | undefined {
  const filterElement = atlasNodes.value?.filter(value => value.name == selectedAtlasNodeName.value)[0] as AtlasNode;
  console.log(filterElement)
  JSON.stringify(filterElement)
  selectedAtlasNode.value = filterElement
  divinationCardNames.value = getDivinationCardNames(filterElement)
  additionalTags.value = getAdditionalTags(filterElement)
  return filterElement
}

function atlasNodeNames(): string[] {
  let atlasNodeNames: string[] = []
  atlasNodes.value?.forEach(value => atlasNodeNames.push(value.name))
  atlasNodeNames.sort((a, b) => a.localeCompare(b))
  return atlasNodeNames
}

function getDivinationCardNames(atlasNode: AtlasNode): string {
  let divinationCardNames = ""
  let first = true
  atlasNode.divinationCards.forEach(value => {
    if (first) {
      divinationCardNames = divinationCardNames.concat(value.name)
      first = false;
    } else {
      divinationCardNames = divinationCardNames.concat(", " + value.name)
    }
  })
  return divinationCardNames
}

function getAdditionalTags(atlasNode: AtlasNode): string {
  let additionalTags = ""
  let first = true
  atlasNode.additionalTags.forEach(value => {
    if (first) {
      additionalTags = additionalTags.concat(value.name)
      first = false;
    } else {
      additionalTags = additionalTags.concat(", " + value.name)
    }
  })
  return additionalTags
}

async function updateSelectedAtlasNode(selectedAtlasNode: AtlasNode) {
  loading.value = true;
  const link = `${import.meta.env.VITE_DYNAMIC_ATLAS_BACKEND_URL}/atlasNodes/atlasNode`;

  await axios.put(link, selectedAtlasNode).then((res) => {
    // selectedAtlasNode = res.data
    console.log(res.data)

  }).catch((res) =>{
    console.log(res)
  }).finally(() =>
    loading.value = false
  );


}
</script>

<style scoped>
</style>