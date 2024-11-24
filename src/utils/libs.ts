function areMapsEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  // Verificar si ambos mapas tienen el mismo tamaño
  if (map1.size !== map2.size) {
    console.log('aqui 1')
    return false
  }

  // Comparar claves y valores
  for (const [key, value] of map1.entries()) {
    // Verificar si la clave existe en el segundo mapa
    if (!map2.has(key)) {
      return false
    }
    console.log('value', value)
    console.log('map2:', map2.get(key))
    // Comparar los valores
    if (value !== map2.get(key)) {
      return false
    }
  }

  return true // Los mapas son iguales
}

export { areMapsEqual }
