import { useEffect, useState } from 'react'
import './DrinkResult.css'

const DrinkResult = ({ drink, onReset }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setShowConfetti(true)
    
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`drink-result ${isVisible ? 'visible' : ''}`}>
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: [
                  '#6366f1',
                  '#8b5cf6',
                  '#ec4899',
                  '#f59e0b',
                  '#10b981',
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      <div className="result-content">
        <div className="result-icon">{drink.icon}</div>
        <h2 className="result-title">You Got:</h2>
        <h1 className="result-drink-name">{drink.name}</h1>
        <p className="result-category">{drink.category}</p>
        
        <button className="reset-button" onClick={onReset}>
          Spin Again
        </button>
      </div>
    </div>
  )
}

export default DrinkResult
