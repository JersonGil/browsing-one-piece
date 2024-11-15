<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import { ref, onMounted } from 'vue'
import { type CharacterArray } from '@/types/character-types'
import axios from 'axios'

const characters = ref<CharacterArray>([])

const getOnePieceCharacters = async () => {
  try {
    const { data } = await axios.get<CharacterArray>(
      'https://api.api-onepiece.com/v2/characters/en',
    )
    characters.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(getOnePieceCharacters)
</script>

<template>
  <main>
    <h1>One Piece Characters</h1>
    <section class="container">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </section>
  </main>
</template>
