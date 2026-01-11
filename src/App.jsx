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
    noWater: [],
    noCategory: [],
    noSugar: [],
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
      <header className="app-header">
        <h1 className="app-title">The Wheel of Drinks</h1>
        <p className="app-subtitle">Spin to pick your gas station drink!</p>
        <p className="app-author">by 0rt</p>
      </header>

      <div className="app-main-layout">
        <aside className="app-sidebar app-sidebar-left">
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableCount={filteredDrinks.length}
          />
        </aside>

        <main className="app-center">
          <div className="wheel-container">
            <DrinkWheel
              drinks={filteredDrinks}
              onSpinComplete={handleSpinComplete}
              onSpinStart={handleSpinStart}
              isSpinning={isSpinning}
            />
          </div>
        </main>

        <aside className="app-sidebar app-sidebar-right">
          {showResult && selectedDrink ? (
            <DrinkResult drink={selectedDrink} onReset={handleReset} />
          ) : (
            <div className="result-placeholder">
              <p>Spin the wheel to see your result here!</p>
            </div>
          )}
        </aside>
      </div>

    </div>
  )
}

export default App
