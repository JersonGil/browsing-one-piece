<script setup lang="ts">
import Carousel from 'primevue/carousel'
import CharacterCard from '@/components/CharacterCard.vue'
import DescriptionView from '@/components/DescriptionView.vue'
import { areMapsEqual } from '@/utils/libs'
import { ref, onMounted, onErrorCaptured } from 'vue'
import {
  type CharactersResponse,
  type Characters,
} from '@/types/character-types'
import { injectStrict } from '@/utils/injectTyped'
import { AxiosKey } from '@/types/symbols'
import { useCharacterStore } from '@/stores/character'

const http = injectStrict(AxiosKey)
const characters = ref<Map<string, Characters[]>>(new Map())
const responseCharacters = ref<Map<string, Characters[]>>(new Map())
const characterStore = useCharacterStore()
const page = ref(1)
const limit = ref(10)
const lengthPage = ref(0)
const carouselItemsVisible = ref(4)
const MAP_KEY = 'characters'
const SECOND_MAP_KEY = 'characters_response'

async function getCharacters() {
  const resp = await http.get<CharactersResponse>(
    `characters?page=${page.value}&limit=${limit.value}`,
  )

  if (resp.data.items.length > 0) {
    lengthPage.value = lengthPage.value + resp.data.items.length
    responseCharacters.value.set(SECOND_MAP_KEY, resp.data.items)
  }

  return resp
}

const onGetCharacter = (character: Characters) => {
  if (characterStore.character?.id === character.id) return
  characterStore.addCharacter(character)
}

const getPage = async (actuallyPage: number) => {
  if (actuallyPage === lengthPage.value - carouselItemsVisible.value) {
    page.value = page.value + 1
    try {
      await getCharacters()

      if (!areMapsEqual(responseCharacters.value, characters.value)) {
        const newArrayMap = responseCharacters.value.get(SECOND_MAP_KEY)
        const prevArrayMap = characters.value.get(MAP_KEY)

        if (newArrayMap !== undefined) {
          for (const character of newArrayMap) {
            prevArrayMap?.push(character)
          }
        }

        if (prevArrayMap !== undefined) {
          characters.value.set(MAP_KEY, prevArrayMap)
        }
      }
    } catch (e) {
      console.log('page error', e)
    }
  }
}

onMounted(async () => {
  const resp = await getCharacters()

  if (characters.value.size === 0) {
    const response = responseCharacters.value.get(SECOND_MAP_KEY)
    if (response !== undefined) characters.value.set(MAP_KEY, response)
    return
  }

  const characterId =
    characterStore.character?.id === undefined
      ? resp.data.items[0].id
      : characterStore.character?.id
  characterStore.addCharacter(resp.data.items[characterId - 1])
})

onErrorCaptured((error) => {
  console.error('Error capturado:', error)
  return false // Evita que el error se propague
})
</script>

<template>
  <main class="w-full p-4 flex flex-col gap-4 justify-center items-center">
    <section
      class="w-full grid gap-4 grid-cols-[1fr] grid-rows-[auto_1fr] lg:grid-cols-[320px_1fr] lg:grid-rows-[1fr]"
    >
      <article class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-3xl text-slate-500 text-center">
          Dragon Ball Characters
        </h1>
        <Carousel
          circular
          :showIndicators="false"
          :value="characters.get(MAP_KEY)"
          orientation="vertical"
          :numVisible="carouselItemsVisible"
          :numScroll="1"
          verticalViewPortHeight="400px"
          @update:page="getPage"
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
      <article class="mt-4 lg:mt-0">
        <DescriptionView
          v-if="characterStore.character"
          :character="characterStore.character"
        />
      </article>
    </section>
  </main>
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
