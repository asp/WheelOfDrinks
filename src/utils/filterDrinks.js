import { drinks } from '../data/drinks'

// Helper to check if drink is sugar-free
const isSugarFree = (drink) => {
  const name = drink.name.toLowerCase()
  return name.includes('zero') || 
         name.includes('diet') || 
         name.includes('sugarfree') || 
         name.includes('sugar-free') ||
         name.includes('sugar free')
}

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

    // Exclude categories
    if (filters.noCategory && filters.noCategory.length > 0) {
      if (filters.noCategory.includes(drink.category)) {
        return false
      }
    }

    // Exclude sugar-free (diet/zero drinks)
    if (filters.noSugar?.includes('sugar') && isSugarFree(drink)) {
      return false
    }

    return true
  })
}
