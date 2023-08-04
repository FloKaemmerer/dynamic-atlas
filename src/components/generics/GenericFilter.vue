<script setup lang="ts">
import { toRef, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export interface Props {
  checkbox?: boolean
  name: string
  tooltip?: string
  checkboxLabel: string
  rangeSlider?: boolean
  rangeSliderValues?: number[]
  rangeSliderMin?: number
  rangeSliderMax?: number
  rangeSliderLabelPrepend?: number | string
  rangeSliderLabelAppend?: number | string
}

const { rangeSliderValues } = defineProps<Props>()
const emit = defineEmits(['update:checkbox', 'clickedCheckbox', 'update:rangeSliderValues'])

const internalRangeSlider = toRef(rangeSliderValues)

const debouncedFn = useDebounceFn(() => {
  emit('update:rangeSliderValues', internalRangeSlider.value)
}, 100)

watch(internalRangeSlider, () => {
  debouncedFn()
})
</script>

<template>
  <v-checkbox
    :id="name"
    :model-value="checkbox"
    class="mx-1"
    :name="name"
    @update:model-value="emit('update:checkbox', $event)"
  >
    <template #label>
      <span>
        {{ checkboxLabel }}
      </span>

      <v-tooltip
        v-if="tooltip"
        :text="tooltip"
      >
        <template #activator="{ props }">
          <span class="ml-1 text-grey cursor-help" v-bind="props">
            (?)
          </span>
        </template>
      </v-tooltip>
    </template>
  </v-checkbox>
  <v-range-slider
    v-if="rangeSlider"
    v-model="internalRangeSlider"
    class="ml-7 mr-0 my-1"
    :max="rangeSliderMax"
    :min="rangeSliderMin"
    :disabled="!checkbox"
  >
    <template #prepend>
      <span class="border-custom-left custom-extras">
        {{ rangeSliderLabelPrepend }}
      </span>
    </template>
    <template #append>
      <span class="custom-extras">
        {{ rangeSliderLabelAppend }}
      </span>
    </template>
  </v-range-slider>
</template>
