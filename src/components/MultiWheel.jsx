import { useState, useRef, useEffect, useCallback } from 'react'
import { drinkData } from '../data/drinks'
import './MultiWheel.css'

const MultiWheel = ({ onComplete, triggerSpin, onStageSelection }) => {
  const [stage, setStage] = useState('category') // 'category', 'drink', 'flavor'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoSpinNext, setAutoSpinNext] = useState(false)
  const canvasRef = useRef(null)

  const getCurrentItems = () => {
    if (stage === 'category') {
      return drinkData.categories.map(cat => ({ name: cat.name, icon: cat.icon, color: cat.color }))
    } else if (stage === 'drink' && selectedCategory) {
      const drinks = drinkData.drinks[selectedCategory] || {}
      return Object.keys(drinks).map(name => ({
        name,
        icon: drinks[name].icon,
        color: drinkData.categories.find(c => c.name === selectedCategory)?.color || '#a855f7'
      }))
    } else if (stage === 'flavor' && selectedCategory && selectedDrink) {
      const flavors = drinkData.drinks[selectedCategory]?.[selectedDrink]?.flavors || []
      return flavors.map(flavor => ({
        name: flavor,
        icon: selectedDrink ? drinkData.drinks[selectedCategory]?.[selectedDrink]?.icon : '🥤',
        color: drinkData.categories.find(c => c.name === selectedCategory)?.color || '#a855f7'
      }))
    }
    return []
  }

  const items = getCurrentItems()
  const numSegments = items.length
  const anglePerSegment = numSegments > 0 ? (2 * Math.PI) / numSegments : 0

  const drawWheel = useCallback(() => {
    try {
      const canvas = canvasRef.current
      if (!canvas || numSegments === 0) return

      const fixedSize = 480
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = fixedSize * dpr
      canvas.height = fixedSize * dpr
      canvas.style.width = fixedSize + 'px'
      canvas.style.height = fixedSize + 'px'

      const ctx = canvas.getContext('2d')
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      
      const centerX = fixedSize / 2
      const centerY = fixedSize / 2
      const radius = fixedSize / 2 - 12

      ctx.clearRect(0, 0, fixedSize, fixedSize)

      // Draw segments
      items.forEach((item, index) => {
        const startAngle = (index * anglePerSegment) - Math.PI / 2
        const endAngle = index === numSegments - 1 
          ? (Math.PI * 3 / 2)
          : ((index + 1) * anglePerSegment) - Math.PI / 2

        const isEven = index % 2 === 0
        const segmentGradient = ctx.createRadialGradient(
          centerX + Math.cos(startAngle + anglePerSegment / 2) * (radius * 0.3),
          centerY + Math.sin(startAngle + anglePerSegment / 2) * (radius * 0.3),
          0,
          centerX,
          centerY,
          radius
        )
        
        if (isEven) {
          segmentGradient.addColorStop(0, '#1f2d4a')
          segmentGradient.addColorStop(0.5, '#16213e')
          segmentGradient.addColorStop(1, '#1a1a2e')
        } else {
          segmentGradient.addColorStop(0, '#16213e')
          segmentGradient.addColorStop(0.5, '#1a1a2e')
          segmentGradient.addColorStop(1, '#0f0f1e')
        }
        
        ctx.fillStyle = segmentGradient
        ctx.strokeStyle = '#334155'
        ctx.lineWidth = 2.5

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, false)
        ctx.lineTo(centerX, centerY)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Draw text
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(startAngle + anglePerSegment / 2)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        
        const fontSize = Math.max(11, fixedSize / 32)
        ctx.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`
        
        const textGradient = ctx.createLinearGradient(0, -10, 0, 10)
        textGradient.addColorStop(0, '#f8fafc')
        textGradient.addColorStop(0.5, '#cbd5e1')
        textGradient.addColorStop(1, '#f8fafc')
        ctx.fillStyle = textGradient
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = 6
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        
        const text = item.name.length > 15 
          ? item.name.substring(0, 12) + '...' 
          : item.name
        
        ctx.fillText(text, radius * 0.58, 0)
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.restore()
      })

      // Center circle
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40)
      centerGradient.addColorStop(0, '#0f0f1e')
      centerGradient.addColorStop(0.6, '#1a1a2e')
      centerGradient.addColorStop(1, '#16213e')
      ctx.fillStyle = centerGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.strokeStyle = '#a855f7'
      ctx.lineWidth = 4
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)'
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
      ctx.stroke()
      
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.shadowBlur = 0

      // Pointer
      const pointerGradient = ctx.createLinearGradient(
        centerX, centerY - radius - 25, 
        centerX, centerY - radius - 5
      )
      pointerGradient.addColorStop(0, '#10b981')
      pointerGradient.addColorStop(0.5, '#a855f7')
      pointerGradient.addColorStop(1, '#10b981')
      
      ctx.fillStyle = pointerGradient
      ctx.shadowColor = 'rgba(168, 85, 247, 0.9)'
      ctx.shadowBlur = 20
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - radius - 22)
      ctx.lineTo(centerX - 18, centerY - radius - 5)
      ctx.lineTo(centerX + 18, centerY - radius - 5)
      ctx.closePath()
      ctx.fill()
      
      ctx.strokeStyle = '#f8fafc'
      ctx.lineWidth = 2
      ctx.shadowBlur = 0
      ctx.stroke()
      
      ctx.shadowBlur = 0
    } catch (error) {
      console.error('Error drawing wheel:', error)
    }
  }, [items, numSegments, anglePerSegment])

  useEffect(() => {
    if (numSegments === 0) return
    
    const timer = setTimeout(() => {
      setRotation(0)
      drawWheel()
    }, 100)
    
    const handleResize = () => {
      drawWheel()
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [drawWheel, numSegments])

  // Handle external spin trigger
  useEffect(() => {
    if (triggerSpin > 0 && !isAnimating && numSegments > 0) {
      spin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSpin])

  // Auto-spin to next stage
  useEffect(() => {
    if (autoSpinNext && !isAnimating && numSegments > 0) {
      const timer = setTimeout(() => {
        spin()
        setAutoSpinNext(false)
      }, 800) // Brief pause between stages
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSpinNext, numSegments])

  const getSegmentIndex = (finalRotationDeg) => {
    // Pointer is fixed at top (-90deg) => 270deg in 0-360 space
    const pointerDeg = 270
    const normalizedRotation = ((finalRotationDeg % 360) + 360) % 360
    const relative = (pointerDeg - normalizedRotation + 360) % 360
    return Math.floor(relative / (360 / numSegments)) % numSegments
  }

  const spin = () => {
    if (isAnimating || numSegments === 0) return

    setIsAnimating(true)

    const spins = 5 + Math.random() * 3
    const randomSegment = Math.floor(Math.random() * numSegments)
    const targetRotation = spins * 360 + (randomSegment * (360 / numSegments))
    const finalRotation = rotation + targetRotation

    const startRotation = rotation
    const duration = 3000
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentRotation = startRotation + (targetRotation * easeOut)

      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        setRotation(finalRotation)
        
        const segmentIndex = getSegmentIndex(finalRotation)
        
        setTimeout(() => {
          const selected = items[segmentIndex]
          if (selected) {
            handleSelection(selected)
          }
        }, 500)
      }
    }

    requestAnimationFrame(animate)
  }

  const handleSelection = (selected) => {
    if (onStageSelection) {
      onStageSelection(stage, selected)
    }
    if (stage === 'category') {
      setSelectedCategory(selected.name)
      setStage('drink')
      setRotation(0)
      // Auto-spin to next stage
      setAutoSpinNext(true)
    } else if (stage === 'drink') {
      setSelectedDrink(selected.name)
      setStage('flavor')
      setRotation(0)
      // Auto-spin to next stage
      setAutoSpinNext(true)
    } else if (stage === 'flavor') {
      const finalResult = {
        category: selectedCategory,
        drink: selectedDrink,
        flavor: selected.name,
        name: `${selectedDrink} ${selected.name}`,
        icon: drinkData.drinks[selectedCategory]?.[selectedDrink]?.icon || '🥤',
        categoryIcon: drinkData.categories.find(c => c.name === selectedCategory)?.icon || '🥤'
      }
      onComplete(finalResult)
    }
  }

  const getStageTitle = () => {
    if (stage === 'category') return 'Choose Category'
    if (stage === 'drink') return `Choose ${selectedCategory} Drink`
    if (stage === 'flavor') return `Choose ${selectedDrink} Flavor`
    return 'Spin the Wheel'
  }

  if (numSegments === 0) {
    return (
      <div className="multi-wheel-container">
        <div className="no-items-message">
          <p>No items available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="multi-wheel-container">
      <div className="wheel-stage-indicator">
        <div className={`stage-dot ${stage === 'category' ? 'active' : selectedCategory ? 'completed' : ''}`}>
          <span>1</span>
        </div>
        <div className="stage-line"></div>
        <div className={`stage-dot ${stage === 'drink' ? 'active' : selectedDrink ? 'completed' : ''}`}>
          <span>2</span>
        </div>
        <div className="stage-line"></div>
        <div className={`stage-dot ${stage === 'flavor' ? 'active' : ''}`}>
          <span>3</span>
        </div>
      </div>

      <h2 className="wheel-stage-title">{getStageTitle()}</h2>

      <div className="wheel-wrapper">
        <div className="wheel-pointer-overlay" />
        <div
          className="wheel-inner"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isAnimating ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <canvas
            ref={canvasRef}
            className="wheel-canvas"
            width={480}
            height={480}
          />
        </div>
      </div>

      <button
        className="spin-button"
        onClick={spin}
        disabled={isAnimating || numSegments === 0}
      >
        <span className="spin-button-text">
          {isAnimating ? 'Spinning...' : stage === 'category' ? 'START SPIN' : 'SPIN'}
        </span>
        <span className="spin-button-glow"></span>
      </button>
    </div>
  )
}

export default MultiWheel
