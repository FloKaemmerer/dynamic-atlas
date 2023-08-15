<script setup lang="ts">
interface PropsInterface {
  toggleOverlay: boolean
}

defineProps<PropsInterface>()
</script>

<template>
  <v-overlay :model-value="toggleOverlay" class="align-center justify-center" min-width="30%">
    <v-sheet>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <v-row>
                <v-col cols="3">
                  Openness:
                </v-col>
                <v-col>
                  The Openness of a Map describes how narrow the Layout is. The higher the Value
                  the more
                  open it is. <br>
                  eg:<br>
                  Dunes: a completely open Layout<br>
                  Toxic Sewers or Waste Pool: Very Narrow paths with few openings
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Traversability:
                </v-col>
                <v-col>
                  The Traversability describes how "easy" it is to travers the map <br>
                  using a Movement SKill like "Shield Charge" <br>
                  A Map with a Narrow Layout or a lot of Obstacles tend to be harder to travers than
                  open
                  Layouts.
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Backtrack Factor:
                </v-col>
                <v-col>
                  The Backtrack Factor describes the "how much" Backtracking you have to do to full clear a map.<br>
                  A low Backtrack factor (eg. Strand) means, that a map can be cleared without the need to backtrack
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Linearity:
                </v-col>
                <v-col>
                  The Linearity describes if a Map can be clear in a Linear, predictable way with low deviation.
                  High linearity is a map with a single more or less narrow path to be followed ex. Alleyways or Malformation
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Terrain Slots:
                </v-col>
                <v-col>
                  A Terrain Slot is a possible Spawn Location for a League mechanic<br>
                  Depending on the Tileset and generated Layout, a map can only hold a certain amount of mechanics that occupy a Terrain Slot.<br>
                  Some Maps tend to have a larger amount of possible Terrain Slots than others.
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Rushable Boss:
                </v-col>
                <v-col>
                  A Boss is Rushable if it can be quickly, easily and predictably be reached, eg. Mesa, Dunes
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Phased Boss:
                </v-col>
                <v-col>
                  Some Map Bosses have Phases during which they can't be damaged, those Bosses are considered as "Phased Bosses"
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Skippable Phases:
                </v-col>
                <v-col>
                  If a Boss has Phase during which it can't be damage, but this phase can be skipped/prevented (eg if you kill them fast enough), the phases are considered skippable
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Spawn Intro Phase:
                </v-col>
                <v-col>
                  Some Bosses have an animation at the start of the fight during which they can't be damaged (eg. The Bosses from Tower, Waste Pool)
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col cols="3">
                  Drop Weight:
                </v-col>
                <v-col>
                  Every Item in Path of Exile has a certain weighting associated with it.<br>
                  This Value determines the Chance of the item to drop. <br>
                  The Actual drop weights are only known to GGG, for Divination Cards there are only
                  estimates. <br>
                  eg:<br>
                  The Nurse - Drop weight = 57
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Base Drop Chance:
                </v-col>
                <v-col>
                  The Base Drop Chance of a Divination Card is the Chance, that IF a card is
                  dropped
                  naturally, it will drop as this card. <br>
                  The Value does NOT represent the overall chance to find this Divination Cards, <br>
                  rather the chance for it to be chose from the Divination Card pool (IF the Games has
                  rolled
                  to drop a Divination Card)<br>
                  The Base Drop Chance is determined by:<br>
                  (Card Drop Weight / SUM(All dropable Divination Card Weights)) * 100<br>
                  eg: <br>
                  The Nurse in Tower Map: ~0.033%
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  Effective Value:
                </v-col>
                <v-col>
                  The Effective Value of a Card is determined by:<br>
                  Card Sell Price * Base Drop Chance<br>
                  eg: <br>
                  The Nurse in Tower Map: 370 Chaos * 0.033 = ~12.27 Chaos
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-overlay>
</template>

<style scoped>

</style>
