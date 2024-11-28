<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import { Carousel } from 'primevue'
import type { PropType } from 'vue'
import type { Characters } from '@/types/character-types'
import { MAP_KEY } from '@/utils/libs'
import { useCharacterStore } from '@/stores/character'

const characterStore = useCharacterStore()

const props = defineProps({
  characters: {
    type: Map as PropType<Map<string, Characters[]>>,
    required: true,
  },
  getPage: {
    type: Function as PropType<(page: number) => void>,
    required: true,
  },
  carouselItemsVisible: {
    type: Number,
    required: false,
  },
  onGetCharacter: {
    type: Function as PropType<(character: Characters) => void>,
    required: true,
  },
})
</script>

<template>
  <article class="flex flex-col justify-center items-center gap-4">
    <h1 class="text-3xl text-slate-500 text-center">Dragon Ball Characters</h1>
    <Carousel
      :showIndicators="false"
      :value="props.characters.get(MAP_KEY)"
      orientation="vertical"
      :numVisible="props.carouselItemsVisible ?? 1"
      :numScroll="1"
      verticalViewPortHeight="400px"
      @update:page="props.getPage"
    >
      <template #item="slotProps">
        <CharacterCard
          :key="slotProps.data.id"
          :character="slotProps.data"
          :isSelected="characterStore.character?.id === slotProps.data.id"
          :on-get-character="onGetCharacter"
        />
      </template>
    </Carousel>
  </article>
</template>

<style lang="css">
.p-carousel {
  width: 100%;
}

.p-carousel-viewport {
  padding-top: 1em;
}

.p-carousel-content-container {
  align-items: center;
}

.p-carousel-item-list {
  align-items: center;
}

.p-carousel-content {
  width: 100%;
}
</style>
