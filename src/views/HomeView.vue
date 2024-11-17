<script setup lang="ts">
import ScrollPanel from 'primevue/scrollpanel'
import CharacterCard from '@/components/CharacterCard.vue'
import DescriptionView from '@/components/DescriptionView.vue'
import { ref, onMounted } from 'vue'
import { type CharactersResponse, type Characters } from '@/types/character-types'
import { injectStrict } from '@/utils/injectTyped'
import { AxiosKey } from '@/types/symbols'
import { useCharacterStore } from '@/stores/character'

const http = injectStrict(AxiosKey)
const characters = ref<Characters[]>([])
const characterStore = useCharacterStore()

onMounted(async () => {
  const resp = await http.get<CharactersResponse>('characters?page=1&limit=10')
  characters.value = resp.data.items
  const characterId =
    characterStore.character?.id === undefined
      ? resp.data.items[0].id
      : characterStore.character?.id
  characterStore.addCharacter(resp.data.items[characterId - 1])
})

const onGetCharacter = (character: Characters) => {
  if (characterStore.character?.id === character.id) return
  characterStore.addCharacter(character)
}
</script>

<template>
  <main class="w-full p-4 flex flex-col gap-4 justify-center items-center">
    <section
      class="w-full grid gap-4 grid-cols-[1fr] grid-rows-[auto_1fr] lg:grid-cols-[320px_1fr] lg:grid-rows-[1fr]"
    >
      <article class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-3xl text-slate-500 text-center">Dragon Ball Characters</h1>
        <ScrollPanel class="w-full h-[500px]">
          <div class="flex flex-col justify-center items-center animate-duration-1000 gap-4 pt-4">
            <CharacterCard
              v-for="character in characters"
              :key="character.id"
              :character="character"
              :isSelected="characterStore.character?.id === character.id"
              v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
              class="transition-opacity duration-300 ease-in-out"
              @get-character="onGetCharacter"
            />
          </div>
        </ScrollPanel>
      </article>
      <article class="mt-4 lg:mt-0">
        <DescriptionView v-if="characterStore.character" :character="characterStore.character" />
      </article>
    </section>
  </main>
</template>
