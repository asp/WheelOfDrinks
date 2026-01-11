import { useState } from 'react'
import DrinkWheel from './components/DrinkWheel'
import DrinkResult from './components/DrinkResult'
import './App.css'

function App() {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)

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

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">The Wheel of Drinks</h1>
          <p className="app-subtitle">Spin to pick your gas station drink!</p>
          <p className="app-author">by 0rt</p>
        </header>

        <div className="wheel-container">
          <DrinkWheel
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
