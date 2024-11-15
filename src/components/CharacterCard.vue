<script setup lang="ts">
import Card from 'primevue/card'
import { type Character } from '@/types/character-types'
import type { PropType } from 'vue'

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
})
</script>

<template>
  <Card>
    <template #title>{{ props.character.name }}</template>
    <template #subtitle>{{ props.character.status }}</template>
    <template #content>
      <div class="flex flex-col gap-4">
        <p class="m-0">Recompensa: {{ props.character.bounty }}</p>
        <p class="m-0">Rol: {{ props.character.job }}</p>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>
