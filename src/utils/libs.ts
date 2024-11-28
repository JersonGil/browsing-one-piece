import gsap from 'gsap'

function areMapsEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  if (map1.size !== map2.size) {
    return false
  }

  for (const [key, value] of map1.entries()) {
    if (!map2.has(key)) {
      return false
    }

    if (value !== map2.get(key)) {
      return false
    }
  }

  return true
}

function animatedDescription(duration: number): void {
  gsap.from('.img-character', {
    opacity: 0,
    x: -200,
    duration: duration,
  })

  gsap.from('.title', {
    opacity: 0,
    x: 200,
    duration: duration,
  })

  gsap.from('.description', {
    opacity: 0,
    y: 60,
    duration: duration,
  })
}

const MAP_KEY = 'characters'
const SECOND_MAP_KEY = 'characters_response'

export { areMapsEqual, animatedDescription, MAP_KEY, SECOND_MAP_KEY }
