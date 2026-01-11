import { drinks } from '../data/drinks'

export const filterDrinks = (filters) => {
  return drinks.filter(drink => {
    // Exclude caffeine
    if (filters.noCaffeine?.includes('caffeine') && drink.caffeine) {
      return false
    }

    // Exclude packaging types
    if (filters.noPackaging?.includes(drink.packaging)) {
      return false
    }

    // Exclude dairy
    if (filters.noDairy?.includes('dairy') && drink.dairy) {
      return false
    }

    // Exclude water
    if (filters.noWater?.includes('water') && drink.category === 'Water') {
      return false
    }

    return true
  })
}
