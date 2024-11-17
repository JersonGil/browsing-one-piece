import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Characters } from '@/types/character-types'

export const useCharacterStore = defineStore('character', () => {
  const character = ref<Characters | null>(null)
  function addCharacter(characters: Characters) {
    character.value = characters
  }

  return { character, addCharacter }
}, {
  persist: {
    storage: localStorage,
    pick: ['character'],
  },
})
