<script setup lang="ts">
import { computed } from 'vue'
import type { Boss } from '@/model/boss'
import type { Layout } from '@/model/layout'

export type GenericMapSpecifications = Boss | Layout | { [key: string]: string | number | boolean | string[] | null }

interface PropsInterface {
  specifications: GenericMapSpecifications
  specificationsOrder: string[]
}
const props = defineProps<PropsInterface>()

type SpecificationsKeys = keyof GenericMapSpecifications

const reorderedSpecifications = computed(() => props.specificationsOrder.reduce((acc, curr) => {
  const specification = `${curr}`.replace(/([A-Z])/g, ' $1').trim()
  const field = props.specifications[curr as SpecificationsKeys]
  if (typeof field === 'boolean') {
    acc[specification] = field ? 'Yes' : 'No'
  }
  else {
    acc[specification] = props.specifications[curr as SpecificationsKeys]
  }
  return acc
}, {} as Record<string, string | number | boolean | string[] | null>))
</script>

<template>
  <v-sheet color="transparent" class="py-2 text-center text-overline text-gray-light">
    <p v-for="(value, specification) in reorderedSpecifications" :key="specification">
      <template v-if="value !== null">
        {{ specification }}: <span class="text-white">{{ value }}</span>
      </template>
      <template v-else>
        {{ specification }}
      </template>
    </p>
  </v-sheet>
</template>
