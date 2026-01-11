import { useState } from 'react'
import MultiWheel from './components/MultiWheel'
import DrinkResult from './components/DrinkResult'
import FilterPanel from './components/FilterPanel'
import './App.css'

function App() {
  const [selectedResult, setSelectedResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [triggerSpin, setTriggerSpin] = useState(0)
  const [filters, setFilters] = useState({
    noCaffeine: [],
    noPackaging: [],
    noDairy: [],
    noWater: [],
    noCategory: [],
    noSugar: [],
  })

  const handleWheelComplete = (result) => {
    setSelectedResult(result)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setSelectedResult(null)
    setTimeout(() => {
      setTriggerSpin(prev => prev + 1)
    }, 300)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setShowResult(false)
    setSelectedResult(null)
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
            availableCount={0}
          />
        </aside>

        <main className="app-center">
          <div className="wheel-container">
            {!showResult ? (
              <MultiWheel
                onComplete={handleWheelComplete}
                triggerSpin={triggerSpin}
              />
            ) : (
              <DrinkResult 
                drink={{
                  name: selectedResult.name,
                  category: selectedResult.category,
                  icon: selectedResult.icon
                }} 
                onReset={handleReset} 
              />
            )}
          </div>
        </main>

        <aside className="app-sidebar app-sidebar-right">
          {showResult && selectedResult ? (
            <div className="result-details">
              <div className="result-detail-item">
                <span className="result-detail-label">Category:</span>
                <span className="result-detail-value">{selectedResult.category}</span>
              </div>
              <div className="result-detail-item">
                <span className="result-detail-label">Drink:</span>
                <span className="result-detail-value">{selectedResult.drink}</span>
              </div>
              <div className="result-detail-item">
                <span className="result-detail-label">Flavor:</span>
                <span className="result-detail-value">{selectedResult.flavor}</span>
              </div>
            </div>
          ) : (
            <div className="result-placeholder">
              <p>Spin the wheels to see your result here!</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
