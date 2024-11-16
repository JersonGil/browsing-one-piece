<script setup lang="ts">
import Image from 'primevue/image'
import { type Characters } from '@/types/character-types'
import type { PropType } from 'vue'

const props = defineProps({
  character: {
    type: Object as PropType<Characters>,
    required: true,
  },
  onGetCharacter: {
    type: Function as PropType<(character: Characters) => void>,
    required: true,
  },
})
</script>

<template>
  <div
    @click="onGetCharacter(props.character)"
    class="cursor-pointer border-2 rounded-md border-slate-500 flex flex-row justify-center gap-6 min-h-16 max-h-24 min-w-52"
  >
    <h2 class="text-xl text-slate-500 content-center">{{ props.character.name }}</h2>
    <Image
      :src="props.character.image"
      :alt="props.character.name"
      imageClass="w-14 h-14 object-contain"
    />
  </div>
</template>
