<script setup lang="ts">
import CharactersCarousel from '@/components/CharactersCarousel.vue'
import DescriptionView from '@/components/DescriptionView.vue'
import { areMapsEqual, animatedDescription } from '@/utils/libs'
import { ref, onMounted, onErrorCaptured } from 'vue'
import {
  type CharactersResponse,
  type Characters,
} from '@/types/character-types'
import { injectStrict } from '@/utils/injectTyped'
import { AxiosKey } from '@/types/symbols'
import { useCharacterStore } from '@/stores/character'
import { MAP_KEY, SECOND_MAP_KEY } from '@/utils/constants'

const http = injectStrict(AxiosKey)
const characters = ref<Map<string, Characters[]>>(new Map())
const responseCharacters = ref<Map<string, Characters[]>>(new Map())
const characterStore = useCharacterStore()
const page = ref(1)
const limit = ref(10)
const lengthPage = ref(0)
const carouselItemsVisible = ref(4)

async function getCharacters() {
  try {
    const resp = await http.get<CharactersResponse>(
      `characters?page=${page.value}&limit=${limit.value}`,
    )

    if (resp.data.items.length > 0) {
      lengthPage.value = lengthPage.value + resp.data.items.length
      responseCharacters.value.set(SECOND_MAP_KEY, resp.data.items)
      if (!characterStore.character) {
        onGetCharacter(resp.data.items[0])
      }
    }

    return resp
  } catch (e) {
    console.log('error get characters:', e)
  }
}

const onGetCharacter = (character: Characters) => {
  if (characterStore.character?.id === character.id) return
  animatedDescription(1)
  characterStore.addCharacter(character)
}

const getPage = async (actuallyPage: number) => {
  const characterArray = characters.value.get(MAP_KEY)

  if (characterArray !== undefined) {
    const characterObj = characterArray[actuallyPage]
    if (characterObj) onGetCharacter(characterObj)
  }

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

  if (resp) {
    const characterId =
      characterStore.character?.id === undefined
        ? resp.data.items[0].id
        : characterStore.character?.id
    characterStore.addCharacter(resp.data.items[characterId - 1])
  }
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
      <CharactersCarousel
        :carouselItemsVisible="carouselItemsVisible"
        :characters="characters"
        :on-get-character="onGetCharacter"
        :get-page="getPage"
      />
      <article class="mt-4 lg:mt-0">
        <DescriptionView
          v-if="characterStore.character"
          :character="characterStore.character"
        />
      </article>
    </section>
  </main>
</template>

<style lang="css"></style>
