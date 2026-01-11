import { useState } from 'react'
import MultiWheel from './components/MultiWheel'
import DrinkResult from './components/DrinkResult'
import FilterPanel from './components/FilterPanel'
import './App.css'

function App() {
  const [selectedResult, setSelectedResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [triggerSpin, setTriggerSpin] = useState(0)
  const [progress, setProgress] = useState({ category: null, drink: null, flavor: null })
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
    setProgress({
      category: result.category,
      drink: result.drink,
      flavor: result.flavor,
    })
    setShowResult(true)
  }

  const handleStageSelection = (stage, selection) => {
    setProgress((prev) => {
      const next = { ...prev }
      if (stage === 'category') {
        next.category = selection.name
        next.drink = null
        next.flavor = null
      } else if (stage === 'drink') {
        next.drink = selection.name
        next.flavor = null
      } else if (stage === 'flavor') {
        next.flavor = selection.name
      }
      return next
    })
  }

  const handleReset = () => {
    setShowResult(false)
    setSelectedResult(null)
    setProgress({ category: null, drink: null, flavor: null })
    setTimeout(() => {
      setTriggerSpin((prev) => prev + 1)
    }, 300)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setShowResult(false)
    setSelectedResult(null)
    setProgress({ category: null, drink: null, flavor: null })
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
                onStageSelection={handleStageSelection}
                triggerSpin={triggerSpin}
              />
            ) : (
              <DrinkResult
                drink={{
                  name: selectedResult.name,
                  category: selectedResult.category,
                  icon: selectedResult.icon,
                }}
                onReset={handleReset}
              />
            )}
          </div>
        </main>

        <aside className="app-sidebar app-sidebar-right">
          <div className="result-progress-card">
            <div className="progress-header">
              <span className="progress-title">Live Selection</span>
              <span className="progress-pill">{showResult ? 'Done' : 'In Progress'}</span>
            </div>
            <div className="progress-steps">
              <div className={`progress-step ${progress.category ? 'filled' : ''}`}>
                <span className="progress-label">Category</span>
                <span className="progress-value">
                  {progress.category || '—'}
                </span>
              </div>
              <div className={`progress-step ${progress.drink ? 'filled' : ''}`}>
                <span className="progress-label">Drink</span>
                <span className="progress-value">
                  {progress.drink || '—'}
                </span>
              </div>
              <div className={`progress-step ${progress.flavor ? 'filled' : ''}`}>
                <span className="progress-label">Flavor</span>
                <span className="progress-value">
                  {progress.flavor || '—'}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
