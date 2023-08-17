<script setup lang="ts">
interface PropsInterface {
  toggleOverlay: boolean
}

defineProps<PropsInterface>()
</script>

<template>
  <v-overlay :model-value="toggleOverlay" class="align-center justify-center">
    <v-card>
      <v-card-title>About / Credits</v-card-title>
      <v-card-text>
        All Assets used are property of Grinding Gear Games <br>
        <br>
        Many Thanks to all the awesome Sites and Communities <br>
        providing endless amounts of Detailed Information about Path of Exile! <br>
        Without those, this little Project wouldn't be possible!<br>
        <br>
        Make sure to pay them a visit!<br>
        AtlasNode Data from <a href="https://poedb.tw/us" target="_blank">poedb.tw</a><br>
        General Divination Card Data from <a href="https://poe.ninja" target="_blank">poe.ninja</a><br>
        Divination Card Weightings from <a href="https://discord.gg/qRyyrMyrkz" target="_blank">Divcord</a> and
        <a href="https://discord.gg/3VxKY6gt7j" target="_blank">The prohibited Library</a><br>
        Some Layout and Boss Values from <a
          href="https://mapsOfExile.com"
          target="_blank"
        >mapsOfExile.com</a><br>
        General Data about Maps from <a href="https://poewiki.net" target="_blank">poewiki.net</a><br>
        <br>
        <br>
        Feel Free to use Any Information you find here for your own projects!
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<style scoped>

</style>
