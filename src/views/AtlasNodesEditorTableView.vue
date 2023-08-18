<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import type { AtlasNode } from '@/model/atlasNode'
import { sendAtlasNodes } from '@/composable/atlas-node-email-sender'

const atlasNodeStore = useAtlasNodeStore()
const atlasNodes = ref<AtlasNode[]>(atlasNodeStore.atlasNodes)
const slicedAtlasNodes = ref<AtlasNode[]>([])
const numberOfAtlasNodesToDisplay = ref(30)
const numberOfAtlasNodesToDisplayItems = ref([10, 30, 50, 100])
const pageMultiplier = ref<number>(1)
const changedAtlasNodes = ref<AtlasNode[]>([])
const tmpAtlasNodes = ref<AtlasNode[]>([])
const currentStartIndex = ref(0)
const currentEndIndex = ref(29)

const loading = ref(false)

function pushAtlasNodes() {
  loading.value = true
  findChangedAtlasNodes()

  console.log(`Pushing AtlasNodes: '${changedAtlasNodes.value.map(value => value.name)}' to backend`)
  sendAtlasNodes(changedAtlasNodes.value)
    .then((result) => {
      if (result.valueOf()) {
        console.log('SUCCESS!')
      }
      else {
        console.log('FAILURE!')
      }
    })
    .finally(() =>
      loading.value = false,
    )
}

function updateSlicedAtlasNodes() {
  findChangedAtlasNodes()
  currentStartIndex.value = numberOfAtlasNodesToDisplay.value * (pageMultiplier.value - 1)
  currentEndIndex.value = (numberOfAtlasNodesToDisplay.value * pageMultiplier.value) < tmpAtlasNodes.value.length ? numberOfAtlasNodesToDisplay.value * pageMultiplier.value : tmpAtlasNodes.value.length
  slicedAtlasNodes.value = tmpAtlasNodes.value.slice(currentStartIndex.value, currentEndIndex.value)
  console.log(`\nStartIndex: ${currentStartIndex.value}\nendIndex: ${currentEndIndex.value}`)
}

function findChangedAtlasNodes() {
  slicedAtlasNodes.value.forEach((slicedNode) => {
    let matchingNode = atlasNodes.value.find(value => value.name == slicedNode.name)
    if (!matchingNode) {
      matchingNode = atlasNodeStore.inactiveAtlasNodes.find(value => value.name == slicedNode.name)
    }
    if (matchingNode && JSON.stringify(slicedNode) != JSON.stringify(matchingNode)) {
      console.log(`AtlasNode ${slicedNode.name} was changed.`)
      const changedNodeIndex = changedAtlasNodes.value.findIndex(value => value.name == slicedNode.name)
      if (changedNodeIndex >= 0) {
        changedAtlasNodes.value.splice(changedNodeIndex, 1)
      }
      changedAtlasNodes.value.push(slicedNode)
    }
  })
  console.log(`Got ${changedAtlasNodes.value.length} Changed AtlasNodes: '${changedAtlasNodes.value.map(value => value.name)}'`)
}

function decreasePageMultiplier() {
  if (pageMultiplier.value > 1) {
    pageMultiplier.value--
    updateSlicedAtlasNodes()
  }
}

function getMaxPageMultiplier() {
  return Number((tmpAtlasNodes.value.length / numberOfAtlasNodesToDisplay.value).toFixed(0))
}

function increasePageMultiplier() {
  const maxMultiplier = getMaxPageMultiplier()
  if (pageMultiplier.value < maxMultiplier) {
    pageMultiplier.value++
    updateSlicedAtlasNodes()
  }
}

watch([numberOfAtlasNodesToDisplay, pageMultiplier], () => {
  if (pageMultiplier.value > getMaxPageMultiplier()) {
    pageMultiplier.value = getMaxPageMultiplier()
  }
  updateSlicedAtlasNodes()
})

watch(slicedAtlasNodes, () => {
  findChangedAtlasNodes()
})

function initSlicedAtlasNodes() {
  updateSlicedAtlasNodes()
}

onMounted(() => {
  atlasNodes.value.forEach((value) => {
    const tmpAtlasNode = JSON.parse(JSON.stringify(value))
    tmpAtlasNodes.value.push(tmpAtlasNode)
  })
  atlasNodeStore.inactiveAtlasNodes.forEach((value) => {
    const tmpAtlasNode = JSON.parse(JSON.stringify(value))
    tmpAtlasNodes.value.push(tmpAtlasNode)
  })
  tmpAtlasNodes.value.sort((a, b) => a.name.localeCompare(b.name))
  initSlicedAtlasNodes()
})
</script>

<template>
  <div v-if="tmpAtlasNodes" id="app">
    <v-app class="app">
      <section class="view">
        <v-card class="card-top">
          <v-row no-gutters>
            <v-col cols="2">
              <v-select
                v-model="numberOfAtlasNodesToDisplay"
                :items="numberOfAtlasNodesToDisplayItems"
                class="fit"
                density="compact"
              >
                <template #prepend>
                  <v-label>show</v-label>
                </template>
                <template #append>
                  <v-label>entries</v-label>
                </template>
              </v-select>
            </v-col>
            <v-col cols="1">
              <v-btn variant="text" prepend-icon="mdi-chevron-left" @click="decreasePageMultiplier()">
                prev
              </v-btn>
            </v-col>
            <v-col cols="2">
              showing Entries {{ currentStartIndex + 1 }} to {{ currentEndIndex }} of
              {{ tmpAtlasNodes.length }}
            </v-col>
            <v-col cols="1">
              <v-btn variant="text" append-icon="mdi-chevron-right" @click="increasePageMultiplier()">
                next
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                :disabled="loading"
                :loading="loading"
                class="text-none mb-4"
                color="indigo-darken-3"
                @click="pushAtlasNodes()"
              >
                Send Changed Nodes
              </v-btn>
            </v-col>
            <v-spacer cols="7" />
          </v-row>
        </v-card>
        <v-card class="table-container">
          <v-table
            fixed-header
            hide-default-footer
            class="flex-table"
            density="compact"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Active</th>
                <th>Openness</th>
                <th>Traversability</th>
                <th>Backtrack Factor</th>
                <th>Linearity</th>
                <th>Terrain Slots</th>
                <th>Base Mob Count</th>
                <th>Number Of Bosses</th>
                <th>Rushable Boss</th>
                <th>Phased Boss</th>
                <th>Skippable Phases</th>
                <th>Spawn Intro</th>
                <th>Boss Arena</th>
                <th>Boss Spawned</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="atlasNode in slicedAtlasNodes"
                :key="atlasNode.name"
              >
                <td><strong>{{ atlasNode.name }}</strong></td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.active"
                    density="compact"
                  />
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.nodeLayout.openness"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="0"
                      max="10"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.nodeLayout.traversability"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="0"
                      max="10"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.nodeLayout.backtrackFactor"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="0"
                      max="10"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.nodeLayout.linearity"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="0"
                      max="10"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.nodeLayout.terrainSlots"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="0"
                      max="10"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.nodeLayout.baseMobCount"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="1"
                      max="10"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-responsive class="ma-0 pa-0" :width="`${4}.5rem`">
                    <v-text-field
                      v-model="atlasNode.boss.numberOfBosses"
                      hide-details
                      single-line
                      type="number"
                      variant="outlined"
                      style="width: 100%"
                      density="compact"
                      min="0"
                      max="4"
                    />
                  </v-responsive>
                </td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.nodeLayout.rushableBoss"
                    density="compact"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.boss.phased"
                    density="compact"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.boss.skippablePhases"
                    density="compact"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.boss.introPhase"
                    density="compact"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.boss.bossArena"
                    density="compact"
                  />
                </td>
                <td>
                  <v-checkbox
                    v-model="atlasNode.boss.spawned"
                    density="compact"
                  />
                </td>
                <td>
                  <v-btn density="compact" width="30%" :disabled="true">
                    Show
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </section>
    </v-app>
  </div>
</template>

<style scoped>
.app {
    background: lightgrey !important;
    height: 100vh;
    overflow: hidden;
}

.view {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px;
}

.card-top {
    padding: 20px;
}

.table-container {
    display: flex;
    margin-top: 10px;
    flex-grow: 1;
    overflow: hidden;
}

.flex-table {
    display: flex;
    flex-grow: 1;
}

.flex-table > div {
    width: 80%;
}

.v-select.fit {
    width: 200px;
}
</style>
