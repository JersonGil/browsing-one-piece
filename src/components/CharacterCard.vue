<script setup lang="ts">
import Image from 'primevue/image'
import { type Characters } from '@/types/character-types'
import { type PropType } from 'vue'

const props = defineProps({
  character: {
    type: Object as PropType<Characters>,
    required: true,
  },
  isSelected: {
    default: false,
    type: Boolean,
  },
  onGetCharacter: {
    type: Function as PropType<(character: Characters) => void>,
    required: true,
  },
})
</script>

<template>
  <div
    @click="props.onGetCharacter(character)"
    :class="{ 'scale-110': isSelected }"
    class="cursor-pointer drop-shadow-lg border-2 rounded-md border-slate-500 flex flex-row justify-center gap-6 min-h-16 max-h-24 w-56 hover:scale-110"
  >
    <h2 class="text-xl text-slate-500 content-center">{{ props.character.name }}</h2>
    <Image
      :src="props.character.image"
      :alt="props.character.name"
      imageClass="w-14 h-14 object-contain"
    />
  </div>
</template>
