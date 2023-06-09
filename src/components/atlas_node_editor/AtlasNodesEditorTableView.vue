<script setup lang="ts">

import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {onMounted, ref, watch} from "vue";
import type {AtlasNode} from "@/model/atlasNode";
import {sendAtlasNodes} from "@/composable/atlas-node-email-sender";

const atlasNodeStore = useAtlasNodeStore();
const atlasNodes = ref<AtlasNode[]>(atlasNodeStore.atlasNodes);
const slicedAtlasNodes = ref<AtlasNode[]>([])
const numberOfAtlasNodesToDisplay = ref(30)
const pageMultiplier = ref<number>(1)
const changedAtlasNodes = ref<AtlasNode[]>([])
const tmpAtlasNodes = ref<AtlasNode[]>([])

let loading = ref(false)


function pushAtlasNodes() {
    loading.value = true;
    findChangedAtlasNodes()

    console.log("Pushing AtlasNodes: '" + changedAtlasNodes.value.map(value => value.name + "' to backend"))
    sendAtlasNodes(changedAtlasNodes.value).then((result) => {
        console.log('SUCCESS!', result.text);
    }).catch((res) => {
        console.log(res)
    }).finally(() =>
        loading.value = false
    );
}

function updateSlicedAtlasNodes() {
    findChangedAtlasNodes()
    let startIndex = numberOfAtlasNodesToDisplay.value * (pageMultiplier.value - 1)
    let endIndex = (numberOfAtlasNodesToDisplay.value * pageMultiplier.value) < tmpAtlasNodes.value.length ? numberOfAtlasNodesToDisplay.value * pageMultiplier.value : tmpAtlasNodes.value.length
    slicedAtlasNodes.value = tmpAtlasNodes.value.slice(startIndex, endIndex)
    console.log("\nStartIndex: " + startIndex + "\nendIndex: " + endIndex)
}

function findChangedAtlasNodes() {
    slicedAtlasNodes.value.forEach(slicedNode => {
        const matchingNode = atlasNodes.value.find(value => value.name == slicedNode.name);
        if (matchingNode && JSON.stringify(slicedNode) != JSON.stringify(matchingNode)) {
            console.log("AtlasNode " + slicedNode.name + " was changed.")
            const changedNodeIndex = changedAtlasNodes.value.findIndex(value => value.name == slicedNode.name);
            if (changedNodeIndex >= 0) {
                changedAtlasNodes.value.splice(changedNodeIndex, 1)
            }
            changedAtlasNodes.value.push(slicedNode)
        }
    })
    console.log("Got " + changedAtlasNodes.value.length + " Changed AtlasNodes: '" + changedAtlasNodes.value.map(value => value.name) + "'")
}

function decreasePageMultiplier() {
    if (pageMultiplier.value > 1) {
        pageMultiplier.value--
        updateSlicedAtlasNodes();
    }
}

function getMaxPageMultiplier() {
    return Number((tmpAtlasNodes.value.length / numberOfAtlasNodesToDisplay.value).toFixed(0))
}

function increasePageMultiplier() {
    let maxMultiplier = getMaxPageMultiplier();
    if (pageMultiplier.value < maxMultiplier) {
        pageMultiplier.value++
        updateSlicedAtlasNodes();
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
    atlasNodes.value.forEach(value => {
        let tmpAtlasNode = JSON.parse(JSON.stringify(value))
        tmpAtlasNodes.value.push(tmpAtlasNode)
    })
    tmpAtlasNodes.value.sort((a, b) => a.name.localeCompare(b.name))
    initSlicedAtlasNodes()
})
</script>

<template>
    <div id="app" v-if="tmpAtlasNodes">
        <v-app class="app">
            <section class="view">
                <v-card class="card-top">
                    <v-row>
                        <v-col cols="2">
                            <v-text-field type="number" v-model="numberOfAtlasNodesToDisplay" min="1"
                                          :max="tmpAtlasNodes.length"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn variant="text" @click="decreasePageMultiplier()">prev</v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field type="number" v-model="pageMultiplier" min="1"
                                          :max="getMaxPageMultiplier()"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-btn variant="text" @click="increasePageMultiplier()">next</v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn
                                    :disabled="loading"
                                    :loading="loading"
                                    class="text-none mb-4"
                                    color="indigo-darken-3"
                                    @click="pushAtlasNodes()">
                                PUT
                            </v-btn>
                        </v-col>
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
                        <tr v-for="atlasNode in slicedAtlasNodes"
                            :key="atlasNode.name">
                            <td><strong>{{ atlasNode.name }}</strong></td>
                            <td>
                                <v-checkbox v-model="atlasNode.active"
                                            density="compact"></v-checkbox>
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
                                    ></v-text-field>
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
                                            max="10"></v-text-field>
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
                                            max="10"></v-text-field>
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
                                            max="10"></v-text-field>
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
                                            max="10"></v-text-field>
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
                                            max="10"></v-text-field>
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
                                            max="4"></v-text-field>
                                </v-responsive>
                            </td>
                            <td>
                                <v-checkbox v-model="atlasNode.nodeLayout.rushableBoss"
                                            density="compact"></v-checkbox>
                            </td>
                            <td>
                                <v-checkbox v-model="atlasNode.boss.phased"
                                            density="compact"></v-checkbox>
                            </td>
                            <td>
                                <v-checkbox v-model="atlasNode.boss.skippablePhases"
                                            density="compact"></v-checkbox>
                            </td>
                            <td>
                                <v-checkbox v-model="atlasNode.boss.introPhase"
                                            density="compact"></v-checkbox>
                            </td>
                            <td>
                                <v-checkbox v-model="atlasNode.boss.bossArena"
                                            density="compact"></v-checkbox>
                            </td>
                            <td>
                                <v-checkbox v-model="atlasNode.boss.spawned"
                                            density="compact"></v-checkbox>
                            </td>
                            <td>
                                <v-btn density="compact" width="30%" disabled>Show</v-btn>
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
    padding: 60px;
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
</style>