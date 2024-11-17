<script setup lang="ts">
import { type Characters } from '@/types/character-types'
import { Image, Divider, ScrollPanel } from 'primevue'
import type { PropType } from 'vue'

const props = defineProps({
  character: {
    type: Object as PropType<Characters> | null,
    required: true,
  },
})
</script>

<template>
  <div class="w-full p-4 flex flex-col gap-4 justify-center items-start">
    <div class="w-full flex flex-col items-center lg:flex-row justify-start lg:items-end gap-4">
      <Image
        :src="props.character?.image"
        :alt="props.character?.name"
        imageClass="w-48 h-80 object-contain"
      />
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-3xl font-bold text-slate-500">{{ props.character?.name }}</h1>
        <div class="grid grid-cols-[1fr_40px_1fr]">
          <div class="flex flex-col justify-center items-start lg:min-w-52">
            <p class="text-md text-slate-500">
              {{ props.character?.affiliation }}
            </p>
            <p class="text-md text-slate-500">{{ props.character.gender }}</p>
          </div>
          <Divider layout="vertical" />
          <div class="flex flex-col justify-center items-start lg:min-w-52">
            <p class="text-md text-slate-500">
              {{ props.character.race }}
            </p>
            <p class="text-md text-slate-500">
              {{ props.character?.ki }} / {{ props.character?.maxKi }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center items-start p-4">
      <ScrollPanel style="width: 100%; height: 150px">
        <h2 class="text-lg text-left text-slate-500">{{ props.character.description }}</h2>
      </ScrollPanel>
    </div>
  </div>
</template>
