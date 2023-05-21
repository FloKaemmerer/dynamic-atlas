<template>
    <v-container class="bg-surface-variant mb-6">
        <v-row no-gutters>
            <v-col cols="2">
                <v-sheet class="pa-2 ma-2">
                    <v-select density="compact"
                              :items="atlasNodeNames()"
                              v-model="selectedAtlasNodeName"
                    ></v-select>
                </v-sheet>
            </v-col>
            <v-col cols="10" v-if="selectedAtlasNode">
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
                                                        hide-details
                                                        single-line
                                                        type="number"
                                                        v-model="selectedAtlasNode.nodeLayout.openness"
                                                        min="0"
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="3"></v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Traversability
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="5">
                                                <v-text-field
                                                        hide-details
                                                        single-line
                                                        type="number"
                                                        v-model="selectedAtlasNode.nodeLayout.traversability"
                                                        min="0"
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="3"></v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Backtrack Factor
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="5">
                                                <v-text-field
                                                        hide-details
                                                        single-line
                                                        type="number"
                                                        v-model="selectedAtlasNode.nodeLayout.backtrackFactor"
                                                        min="0"
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="3"></v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Linearity
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="5">
                                                <v-text-field
                                                        hide-details
                                                        single-line
                                                        type="number"
                                                        v-model="selectedAtlasNode.nodeLayout.linearity"
                                                        min="0"
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="3"></v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Base Mob Count
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="5">
                                                <v-text-field
                                                        hide-details
                                                        single-line
                                                        type="number"
                                                        v-model="selectedAtlasNode.nodeLayout.baseMobCount"
                                                        min="0"
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="3"></v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Rushable Boss
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-radio-group v-model="selectedAtlasNode.nodeLayout.rushableBoss"
                                                               density="compact">
                                                    <v-radio :value=true>
                                                        <template v-slot:label>
                                                            <div><strong>Rushable</strong></div>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio :value=false>
                                                        <template v-slot:label>
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
                                                        hide-details
                                                        single-line
                                                        v-model="selectedAtlasNode.nodeLayout.notes"
                                                        rows="1"
                                                        auto-grow
                                                        density="compact">
                                                </v-textarea>
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
                                                        hide-details
                                                        single-line
                                                        type="number"
                                                        v-model="selectedAtlasNode.boss.numberOfBosses"
                                                        min="0"
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="3"></v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Phased Boss
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-radio-group v-model="selectedAtlasNode.boss.phased"
                                                               density="compact">
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
                                            </v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Skippable Phases
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-radio-group v-model="selectedAtlasNode.boss.skippablePhases"
                                                               density="compact">
                                                    <v-radio :value=true>
                                                        <template v-slot:label>
                                                            <div><strong>Skippable</strong></div>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio :value=false>
                                                        <template v-slot:label>
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
                                                <v-radio-group v-model="selectedAtlasNode.boss.introPhase"
                                                               density="compact">
                                                    <v-radio :value=true>
                                                        <template v-slot:label>
                                                            <div><strong>Spawn-Intro-Phase</strong></div>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio :value=false>
                                                        <template v-slot:label>
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
                                                <v-radio-group v-model="selectedAtlasNode.boss.bossArena"
                                                               density="compact">
                                                    <v-radio :value=true>
                                                        <template v-slot:label>
                                                            <div><strong>Boss in Arena</strong></div>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio :value=false>
                                                        <template v-slot:label>
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
                                                <v-radio-group v-model="selectedAtlasNode.boss.spawned"
                                                               density="compact">
                                                    <v-radio :value=true>
                                                        <template v-slot:label>
                                                            <div><strong>Spawned</strong></div>
                                                        </template>
                                                    </v-radio>
                                                    <v-radio :value=false>
                                                        <template v-slot:label>
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
                                                        hide-details
                                                        single-line
                                                        v-model="selectedAtlasNode.boss.names"
                                                        rows="1"
                                                        auto-grow
                                                        density="compact">
                                                </v-textarea>
                                            </v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Notes
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-textarea
                                                        hide-details
                                                        single-line
                                                        v-model="selectedAtlasNode.boss.notes"
                                                        rows="1"
                                                        auto-grow
                                                        density="compact">
                                                </v-textarea>
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
                                            </v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Divination Cards
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-textarea
                                                        hide-details
                                                        single-line
                                                        v-model="divinationCardNames"
                                                        rows="1"
                                                        auto-grow
                                                        density="compact">
                                                </v-textarea>
                                            </v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Additional Tags
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-text-field
                                                        hide-details
                                                        single-line
                                                        :v-model="additionalTags"
                                                        rows="1"
                                                        auto-grow
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="3">
                                                <v-sheet>
                                                    Notes
                                                </v-sheet>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-text-field
                                                        hide-details
                                                        single-line
                                                        :v-model="selectedAtlasNode.notes"
                                                        rows="1"
                                                        auto-grow
                                                        density="compact">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-sheet>


                            </v-col>

                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="3">
                                <v-btn
                                        :disabled="loading"
                                        :loading="loading"
                                        block
                                        class="text-none mb-4"
                                        color="indigo-darken-3"
                                        size="x-large"
                                        variant="flat"
                                        @click="sendSelectedAtlasNode(selectedAtlasNode)">
                                    Send
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {computed, ref, watch} from "vue";
import type {AtlasNode} from "@/model/atlasNode";
import emailjs from '@emailjs/browser';
import convertToAtlasNodeImproveDto from "@/composable/atlas-node-improve-dto-converter";

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

async function sendSelectedAtlasNode(selectedAtlasNode: AtlasNode | undefined) {
    if (selectedAtlasNode) {
        loading.value = true;
        let atlasNodeImproveDto = convertToAtlasNodeImproveDto(selectedAtlasNode);
        const templatePrams: Record<string, string> = {
            atlasNode: JSON.stringify(atlasNodeImproveDto, null, '\t'),
            atlasNodeName: atlasNodeImproveDto.name
        }

        emailjs.send(`${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
            `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
            templatePrams,
            `${import.meta.env.VITE_EMAILJS_PUBLIC_KEY}`)
            .then((result) => {
                console.log('SUCCESS!', result.text);
            }, (error) => {
                console.log('FAILED...', error.text);
            });
        //
        // const link = `${import.meta.env.VITE_DYNAMIC_ATLAS_BACKEND_URL}/atlasNodes/atlasNode`;
        // await axios.put(link, selectedAtlasNode).then((res) => {
        //     selectedAtlasNode = res.data
        //     console.log(res.data)
        //
        // }).catch((res) => {
        //     console.log(res)
        // }).finally(() =>
        //     loading.value = false
        // );
    }

}
</script>

<style scoped>
</style>