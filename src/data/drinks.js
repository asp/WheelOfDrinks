// Comprehensive list of American gas station drinks with metadata
export const drinks = [
  // Bottled Drinks
  { name: 'Coca-Cola', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Pepsi', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Dr. Pepper', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Sprite', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Fanta Orange', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Mountain Dew', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: '7UP', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'A&W Root Beer', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Barq\'s Root Beer', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Coca-Cola Zero', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Pepsi Zero', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Diet Coke', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Diet Pepsi', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Cherry Coke', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Vanilla Coke', category: 'Bottled', icon: '🥤', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Orange Fanta', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Grape Fanta', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Strawberry Fanta', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Cream Soda', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Ginger Ale', category: 'Bottled', icon: '🥤', caffeine: false, packaging: 'bottle', dairy: false },
  
  // Energy Drinks
  { name: 'Red Bull', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  { name: 'Monster Energy', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  { name: 'Rockstar Energy', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  { name: 'Bang Energy', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  { name: '5-Hour Energy', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'NOS Energy', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  { name: 'Full Throttle', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  { name: 'AMP Energy', category: 'Energy', icon: '⚡', caffeine: true, packaging: 'can', dairy: false },
  
  // Sports Drinks
  { name: 'Gatorade', category: 'Sports', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Powerade', category: 'Sports', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'BodyArmor', category: 'Sports', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Vitamin Water', category: 'Sports', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Propel', category: 'Sports', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  
  // Iced Tea
  { name: 'Arizona Iced Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Lipton Iced Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Sweet Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Unsweetened Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Peach Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Lemon Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  { name: 'Green Tea', category: 'Tea', icon: '🍵', caffeine: true, packaging: 'bottle', dairy: false },
  
  // Juice & Fruit Drinks
  { name: 'Minute Maid', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Tropicana', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Simply Orange', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Ocean Spray', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Capri Sun', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'pouch', dairy: false },
  { name: 'Hi-C', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'box', dairy: false },
  { name: 'Kool-Aid', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Hawaiian Punch', category: 'Juice', icon: '🧃', caffeine: false, packaging: 'bottle', dairy: false },
  
  // Water
  { name: 'Dasani Water', category: 'Water', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Aquafina', category: 'Water', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Smart Water', category: 'Water', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Fiji Water', category: 'Water', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Poland Spring', category: 'Water', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  { name: 'Evian', category: 'Water', icon: '💧', caffeine: false, packaging: 'bottle', dairy: false },
  
  // Fountain Drinks
  { name: 'Fountain Coke', category: 'Fountain', icon: '🥤', caffeine: true, packaging: 'fountain', dairy: false },
  { name: 'Fountain Pepsi', category: 'Fountain', icon: '🥤', caffeine: true, packaging: 'fountain', dairy: false },
  { name: 'Fountain Dr. Pepper', category: 'Fountain', icon: '🥤', caffeine: true, packaging: 'fountain', dairy: false },
  { name: 'Fountain Sprite', category: 'Fountain', icon: '🥤', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Fountain Mountain Dew', category: 'Fountain', icon: '🥤', caffeine: true, packaging: 'fountain', dairy: false },
  { name: 'Fountain Root Beer', category: 'Fountain', icon: '🥤', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Fountain Lemonade', category: 'Fountain', icon: '🥤', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Fountain Iced Tea', category: 'Fountain', icon: '🥤', caffeine: true, packaging: 'fountain', dairy: false },
  { name: 'Fountain Fruit Punch', category: 'Fountain', icon: '🥤', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Fountain Slushie', category: 'Fountain', icon: '🧊', caffeine: false, packaging: 'fountain', dairy: false },
  
  // Coffee & Hot Drinks
  { name: 'Coffee', category: 'Coffee', icon: '☕', caffeine: true, packaging: 'cup', dairy: false },
  { name: 'Cappuccino', category: 'Coffee', icon: '☕', caffeine: true, packaging: 'cup', dairy: true },
  { name: 'Latte', category: 'Coffee', icon: '☕', caffeine: true, packaging: 'cup', dairy: true },
  { name: 'Hot Chocolate', category: 'Coffee', icon: '☕', caffeine: false, packaging: 'cup', dairy: true },
  { name: 'Iced Coffee', category: 'Coffee', icon: '☕', caffeine: true, packaging: 'cup', dairy: false },
  
  // Specialty
  { name: 'Slurpee', category: 'Specialty', icon: '🧊', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Icee', category: 'Specialty', icon: '🧊', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Frozen Lemonade', category: 'Specialty', icon: '🧊', caffeine: false, packaging: 'fountain', dairy: false },
  { name: 'Smoothie', category: 'Specialty', icon: '🥤', caffeine: false, packaging: 'cup', dairy: false },
]
