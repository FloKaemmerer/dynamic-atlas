<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import type { AtlasNode } from '@/model/atlasNode'
import convertToAtlasNodeImproveDto from '@/composable/atlas-node-improve-dto-converter'
import type { DivinationCardImproveDto } from '@/model/dtos/divinationCardImproveDto'
import { sendAtlasNode } from '@/composable/atlas-node-email-sender'

const atlasNodeStore = useAtlasNodeStore()
const atlasNodes = ref<AtlasNode[]>(atlasNodeStore.atlasNodes)
const selectedAtlasNodeName = ref()

const selectedAtlasNode = ref<AtlasNode>()
const tmpAtlasNodes = ref<AtlasNode[]>([])
const divinationCardNames = ref<string>()
const additionalTags = ref<string>()
const loading = ref(false)
const snackbar = ref(false)
const snackbarText = ref<string>()

onMounted(() => {
  selectedAtlasNodeName.value = 'Acton\'s Nightmare'

  atlasNodes.value.forEach((value) => {
    const tmpAtlasNode = JSON.parse(JSON.stringify(value))
    tmpAtlasNodes.value.push(tmpAtlasNode)
  })
  atlasNodeStore.inactiveAtlasNodes.forEach((value) => {
    const tmpAtlasNode = JSON.parse(JSON.stringify(value))
    tmpAtlasNodes.value.push(tmpAtlasNode)
  })
  tmpAtlasNodes.value.sort((a, b) => a.name.localeCompare(b.name))
})

watch(selectedAtlasNodeName, () => {
  getAtlasNodeByName()
  snackbar.value = false
})

function getAtlasNodeByName(): AtlasNode | undefined {
  const filterElement = tmpAtlasNodes.value?.filter(value => value.name === selectedAtlasNodeName.value)[0] as AtlasNode
  selectedAtlasNode.value = filterElement
  divinationCardNames.value = getDivinationCardNames(filterElement)
  additionalTags.value = getAdditionalTags(filterElement)
  return filterElement
}

function atlasNodeNames(): string[] {
  const atlasNodeNames: string[] = []
  tmpAtlasNodes.value?.forEach(value => atlasNodeNames.push(value.name))
  atlasNodeNames.sort((a, b) => a.localeCompare(b))
  return atlasNodeNames
}

function getDivinationCardNames(atlasNode: AtlasNode): string {
  let divinationCardNames = ''
  let first = true
  atlasNode.divinationCards.forEach((value) => {
    if (first) {
      divinationCardNames = divinationCardNames.concat(value.name)
      first = false
    }
    else {
      divinationCardNames = divinationCardNames.concat(`, ${value.name}`)
    }
  })
  return divinationCardNames
}

function getAdditionalTags(atlasNode: AtlasNode): string {
  let additionalTags = ''
  let first = true
  atlasNode.additionalTags.forEach((value) => {
    if (first) {
      additionalTags = additionalTags.concat(value)
      first = false
    }
    else {
      additionalTags = additionalTags.concat(`, ${value}`)
    }
  })
  return additionalTags
}

async function sendSelectedAtlasNode(selectedAtlasNode: AtlasNode | undefined) {
  if (selectedAtlasNode) {
    loading.value = true
    const effectiveAdditionalTags: string = additionalTags.value ? additionalTags.value : ''
    const effectiveDivinationCardNames = divinationCardNames.value ? divinationCardNames.value : ''
    await sendAtlasNode(selectedAtlasNode, effectiveAdditionalTags, effectiveDivinationCardNames)
      .then((result) => {
        console.log('SUCCESS!', result.text)
        snackbarText.value = `Successfully send Values for AtlasNode: ${selectedAtlasNode.name}`
        snackbar.value = true
      }).catch((res) => {
        snackbarText.value = `Failed to send Values for AtlasNode: ${selectedAtlasNode.name} \nPlease try again later`
        snackbar.value = true
        console.log(res)
      }).finally(() =>
        loading.value = false,
      )
  }
}

async function putSelectedAtlasNode(selectedAtlasNode: AtlasNode | undefined) {
  if (selectedAtlasNode) {
    loading.value = true
    const tags: string[] = []
    if (additionalTags.value) {
      const tagsSplits = additionalTags.value.split(',')
      tagsSplits.forEach((tag) => {
        const trimmed = tag.trim()
        if (trimmed.length > 0) {
          tags.push(trimmed)
        }
      })
    }
    const divinationCardImproveDtos: DivinationCardImproveDto[] = []
    if (divinationCardNames.value) {
      const divCardNames = divinationCardNames.value.split(',')
      divCardNames.forEach((cardName) => {
        const trimmedName = cardName.trim()
        if (trimmedName.length > 0) {
          divinationCardImproveDtos.push({
            name: trimmedName,
          })
        }
      })
    }

    const atlasNodeImproveDto = convertToAtlasNodeImproveDto(selectedAtlasNode, divinationCardImproveDtos, tags)
    console.log(atlasNodeImproveDto)

    loading.value = true
    const link = 'http://localhost:8080/atlasNodes/atlasNode'

    console.log(link)
    const res = await axios.put(link, atlasNodeImproveDto)
    console.log(res.data)
    loading.value = false
  }
}
</script>

<template>
  <v-container class="bg-surface-variant mb-6">
    <v-row no-gutters>
      <v-col cols="2">
        <v-sheet class="pa-2 ma-2">
          <v-select
            v-model="selectedAtlasNodeName"
            density="compact"
            :items="atlasNodeNames()"
          />
        </v-sheet>
      </v-col>
      <v-col v-if="selectedAtlasNode" cols="10">
        <v-card>
          <v-card-title>{{ selectedAtlasNode.name }}</v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="4">
                <v-sheet elevation="10" rounded="xl">
                  <v-sheet class="pa-3 bg-black" rounded="t-xl">
                    Layout
                  </v-sheet>
                  <div class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="3">
                        <v-sheet>
                          Openness
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.nodeLayout.openness"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Traversability
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.nodeLayout.traversability"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Backtrack Factor
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.nodeLayout.backtrackFactor"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Linearity
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.nodeLayout.linearity"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Terrain Slots
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.nodeLayout.terrainSlots"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Base Mob Count
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.nodeLayout.baseMobCount"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Rushable Boss
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group
                          v-model="selectedAtlasNode.nodeLayout.rushableBoss"
                          density="compact"
                        >
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Rushable</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>Not Rushable</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Notes
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-textarea
                          v-model="selectedAtlasNode.nodeLayout.notes"
                          hide-details
                          single-line
                          rows="1"
                          auto-grow
                          density="compact"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="4">
                <v-sheet elevation="10" rounded="xl">
                  <v-sheet class="pa-3 bg-black" rounded="t-xl">
                    Boss
                  </v-sheet>
                  <div class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="3">
                        <v-sheet>
                          Number of Bosses
                        </v-sheet>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model="selectedAtlasNode.boss.numberOfBosses"
                          hide-details
                          single-line
                          type="number"
                          min="0"
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="3" />

                      <v-col cols="3">
                        <v-sheet>
                          Phased Boss
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group
                          v-model="selectedAtlasNode.boss.phased"
                          density="compact"
                        >
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Phased</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>Non-Phased</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Skippable Phases
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group
                          v-model="selectedAtlasNode.boss.skippablePhases"
                          density="compact"
                        >
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Skippable</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>Unskippable</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Spawn-Intro Phase
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group
                          v-model="selectedAtlasNode.boss.introPhase"
                          density="compact"
                        >
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Spawn-Intro-Phase</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>No Spawn-Intro-Phase</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Boss Arena
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group
                          v-model="selectedAtlasNode.boss.bossArena"
                          density="compact"
                        >
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Boss in Arena</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>Boss in Open Map</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Boss Spawned
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group
                          v-model="selectedAtlasNode.boss.spawned"
                          density="compact"
                        >
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Spawned</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>Not Spawned</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Boss Names
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-textarea
                          v-model="selectedAtlasNode.boss.names"
                          hide-details
                          single-line
                          rows="1"
                          auto-grow
                          density="compact"
                        />
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Notes
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-textarea
                          v-model="selectedAtlasNode.boss.notes"
                          hide-details
                          single-line
                          rows="1"
                          auto-grow
                          density="compact"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="4">
                <v-sheet elevation="10" rounded="xl">
                  <v-sheet class="pa-3 bg-black" rounded="t-xl">
                    Misc
                  </v-sheet>
                  <div class="pa-4">
                    <v-row no-gutters>
                      <v-col cols="3">
                        <v-sheet>
                          Active
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-radio-group v-model="selectedAtlasNode.active" density="compact">
                          <v-radio :value="true">
                            <template #label>
                              <div><strong>Active</strong></div>
                            </template>
                          </v-radio>
                          <v-radio :value="false">
                            <template #label>
                              <div><strong>Inactive</strong></div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Divination Cards
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-textarea
                          v-model="divinationCardNames"
                          hide-details
                          single-line
                          rows="1"
                          auto-grow
                          density="compact"
                        />
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Additional Tags
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-textarea
                          v-model="additionalTags"
                          hide-details
                          single-line
                          rows="1"
                          auto-grow
                          density="compact"
                        />
                      </v-col>

                      <v-col cols="3">
                        <v-sheet>
                          Notes
                        </v-sheet>
                      </v-col>
                      <v-col cols="9">
                        <v-textarea
                          v-model="selectedAtlasNode.notes"
                          hide-details
                          single-line
                          rows="1"
                          auto-grow
                          density="compact"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                <v-btn
                  :disabled="loading"
                  :loading="loading"
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
                  @click="sendSelectedAtlasNode(selectedAtlasNode)"
                >
                  Send
                </v-btn>
              </v-col>
              <v-col cols="1" />
              <v-col cols="2">
                <!--                                <v-btn -->
                <!--                                        :disabled="loading" -->
                <!--                                        :loading="loading" -->
                <!--                                        class="text-none mb-4" -->
                <!--                                        color="indigo-darken-3" -->
                <!--                                        size="x-large" -->
                <!--                                        variant="flat" -->
                <!--                                        @click="putSelectedAtlasNode(selectedAtlasNode)"> -->
                <!--                                    PUT -->
                <!--                                </v-btn> -->
              </v-col>
              <v-col cols="7" />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      timeout="-1"
      multi-line
    >
      {{ snackbarText }}

      <template #actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
</style>
