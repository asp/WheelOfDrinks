import { useState, useRef, useEffect } from 'react'
import { drinks } from '../data/drinks'
import './DrinkWheel.css'

const DrinkWheel = ({ onSpinComplete, onSpinStart, isSpinning }) => {
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const wheelRef = useRef(null)
  const canvasRef = useRef(null)

  const numSegments = drinks.length
  const anglePerSegment = (2 * Math.PI) / numSegments

  useEffect(() => {
    drawWheel()
    
    const handleResize = () => {
      drawWheel()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    const size = Math.min(rect.width || 500, rect.height || 500)
    
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = size + 'px'
    canvas.style.height = size + 'px'

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw segments
    drinks.forEach((drink, index) => {
      const startAngle = index * anglePerSegment - Math.PI / 2
      const endAngle = (index + 1) * anglePerSegment - Math.PI / 2

      // Alternate colors for visual distinction
      const isEven = index % 2 === 0
      ctx.fillStyle = isEven ? '#1e1e2e' : '#27272a'
      ctx.strokeStyle = '#3f3f46'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + anglePerSegment / 2)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#e4e4e7'
      
      // Scale font size based on canvas size
      const fontSize = Math.max(10, size / 35)
      ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`
      
      const text = drink.name.length > 15 
        ? drink.name.substring(0, 12) + '...' 
        : drink.name
      
      ctx.fillText(text, radius * 0.6, 0)
      ctx.restore()
    })

    // Draw center circle
    ctx.fillStyle = '#0a0a0f'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw pointer
    ctx.fillStyle = '#6366f1'
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius - 20)
    ctx.lineTo(centerX - 15, centerY - radius - 5)
    ctx.lineTo(centerX + 15, centerY - radius - 5)
    ctx.closePath()
    ctx.fill()
  }

  const spin = () => {
    if (isAnimating || isSpinning) return

    onSpinStart()
    setIsAnimating(true)

    // Random rotation (multiple full spins + random segment)
    const spins = 5 + Math.random() * 3 // 5-8 full spins
    const randomSegment = Math.floor(Math.random() * numSegments)
    const targetRotation = spins * 360 + (randomSegment * (360 / numSegments))
    const finalRotation = rotation + targetRotation

    // Animate
    const startRotation = rotation
    const duration = 3000 // 3 seconds
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out-cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentRotation = startRotation + (targetRotation * easeOut)

      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        setRotation(finalRotation)
        
        // Determine selected drink
        const normalizedRotation = finalRotation % 360
        const segmentIndex = Math.floor(
          (360 - normalizedRotation) / (360 / numSegments)
        ) % numSegments
        
        setTimeout(() => {
          onSpinComplete(drinks[segmentIndex])
        }, 500)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div className="drink-wheel-container">
      <div
        className="wheel-wrapper"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isAnimating ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        <canvas
          ref={canvasRef}
          className="wheel-canvas"
        />
      </div>
      
      <button
        className="spin-button"
        onClick={spin}
        disabled={isAnimating || isSpinning}
      >
        <span className="spin-button-text">
          {isAnimating ? 'Spinning...' : 'SPIN'}
        </span>
        <span className="spin-button-glow"></span>
      </button>
    </div>
  )
}

export default DrinkWheel
