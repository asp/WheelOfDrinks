import { useState, useMemo } from 'react'
import DrinkWheel from './components/DrinkWheel'
import DrinkResult from './components/DrinkResult'
import FilterPanel from './components/FilterPanel'
import { filterDrinks } from './utils/filterDrinks'
import './App.css'

function App() {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [filters, setFilters] = useState({
    noCaffeine: [],
    noPackaging: [],
    noDairy: [],
  })

  const filteredDrinks = useMemo(() => {
    return filterDrinks(filters)
  }, [filters])

  const handleSpinComplete = (drink) => {
    setSelectedDrink(drink)
    setIsSpinning(false)
    setShowResult(true)
  }

  const handleSpinStart = () => {
    setIsSpinning(true)
    setShowResult(false)
    setSelectedDrink(null)
  }

  const handleReset = () => {
    setShowResult(false)
    setSelectedDrink(null)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    // Reset selection when filters change
    setShowResult(false)
    setSelectedDrink(null)
  }

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">The Wheel of Drinks</h1>
          <p className="app-subtitle">Spin to pick your gas station drink!</p>
          <p className="app-author">by 0rt</p>
        </header>

        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          availableCount={filteredDrinks.length}
        />

        <div className="wheel-container">
          <DrinkWheel
            drinks={filteredDrinks}
            onSpinComplete={handleSpinComplete}
            onSpinStart={handleSpinStart}
            isSpinning={isSpinning}
          />
        </div>

        {showResult && selectedDrink && (
          <DrinkResult drink={selectedDrink} onReset={handleReset} />
        )}

        <footer className="app-footer">
          <p>The Wheel of Drinks by 0rt</p>
        </footer>
      </div>
    </div>
  )
}

export default App
