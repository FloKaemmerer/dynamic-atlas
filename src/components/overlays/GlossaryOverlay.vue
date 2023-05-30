<script setup lang="ts">
interface PropsInterface {
    toggleOverlay: boolean;
}

defineProps<PropsInterface>();
</script>

<template>
    <v-overlay :model-value="toggleOverlay" class="align-center justify-center" min-width="30%">
        <v-sheet>
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="3">Drop Weight:</v-col>
                        <v-col>Every Item in Path of Exile has a certain weighting associated with it.<br>
                            This Value determines the Chance of the item to drop. <br>
                            The Actual drop weights are only known to GGG, for Divination Cards there are only
                            estimates. <br>
                            eg:<br>
                            The Nurse - Drop weight = 57
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Base Drop Chance:</v-col>
                        <v-col>The Base Drop Chance of a Divination Card is the Chance, that IF a card is dropped
                            naturally, it will drop as this card. <br>
                            The Value does NOT represent the overall chance to find this Divination Cards, <br>
                            rather the chance for it to be chose from the Divination Card pool (IF the Games has rolled
                            to drop a Divination Card)<br>
                            The Base Drop Chance is determined by:<br>
                            (Card Drop Weight / SUM(All dropable Divination Card Weights)) * 100<br>
                            eg: <br>
                            The Nurse in Tower Map: ~0.033%
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Effective Value:</v-col>
                        <v-col>The Effective Value of a Card is determined by:<br>
                            Card Sell Price * Base Drop Chance<br>
                            eg: <br>
                            The Nurse in Tower Map: 370 Chaos * 0.033 = ~12.27 Chaos
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Openness:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Traversability:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Backtrack Factor:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Linearity:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Rushable Boss:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Phased Boss:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Skippable Phases:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">Spawn Intro Phase:</v-col>
                        <v-col>tbd
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-sheet>
    </v-overlay>
</template>

<style scoped>

</style>