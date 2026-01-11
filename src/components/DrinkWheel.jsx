import { useState, useRef, useEffect } from 'react'
import './DrinkWheel.css'

const DrinkWheel = ({ drinks = [], onSpinComplete, onSpinStart, isSpinning }) => {
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const wheelRef = useRef(null)
  const canvasRef = useRef(null)

  const numSegments = drinks.length
  const anglePerSegment = numSegments > 0 ? (2 * Math.PI) / numSegments : 0

  const drawWheel = () => {
    try {
      const canvas = canvasRef.current
      if (!canvas || numSegments === 0) return

      // Use fixed size for consistent rendering
      const fixedSize = 480
      
      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1
      
      // Set canvas dimensions
      canvas.width = fixedSize * dpr
      canvas.height = fixedSize * dpr
      canvas.style.width = fixedSize + 'px'
      canvas.style.height = fixedSize + 'px'

    const ctx = canvas.getContext('2d')
    
    // Reset transform and scale for high DPI
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    
    // Calculate center based on fixed size (not scaled)
    const centerX = fixedSize / 2
    const centerY = fixedSize / 2
    const radius = fixedSize / 2 - 10

    // Clear entire canvas
    ctx.clearRect(0, 0, fixedSize, fixedSize)

    // Draw segments - ensure equal distribution and perfect circle closure
    drinks.forEach((drink, index) => {
      // Calculate angles precisely to ensure even distribution
      // Start from top (-π/2) and distribute evenly
      const startAngle = (index * anglePerSegment) - Math.PI / 2
      // For the last segment, ensure it closes perfectly to complete the circle
      const endAngle = index === numSegments - 1 
        ? (Math.PI * 3 / 2) // Exactly 270 degrees (top) to close the circle
        : ((index + 1) * anglePerSegment) - Math.PI / 2

      // Alternate colors for visual distinction with new color scheme
      const isEven = index % 2 === 0
      ctx.fillStyle = isEven ? '#161b22' : '#1c2128'
      ctx.strokeStyle = '#30363d'
      ctx.lineWidth = 2.5

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      // Use counterclockwise: false to draw in the correct direction
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false)
      ctx.lineTo(centerX, centerY) // Explicitly close the path
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + anglePerSegment / 2)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#f0f6fc'
      
      // Scale font size based on fixed canvas size
      const fontSize = Math.max(11, fixedSize / 34)
      ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`
      
      // Add text shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      
      const text = drink.name.length > 15 
        ? drink.name.substring(0, 12) + '...' 
        : drink.name
      
      ctx.fillText(text, radius * 0.6, 0)
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.restore()
    })

    // Draw center circle with gradient effect
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35)
    centerGradient.addColorStop(0, '#0d1117')
    centerGradient.addColorStop(1, '#161b22')
    ctx.fillStyle = centerGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, 35, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = '#58a6ff'
    ctx.lineWidth = 3.5
    ctx.shadowColor = 'rgba(88, 166, 255, 0.5)'
    ctx.shadowBlur = 8
    ctx.stroke()
    ctx.shadowBlur = 0

    // Draw pointer with gradient
    const pointerGradient = ctx.createLinearGradient(centerX, centerY - radius - 25, centerX, centerY - radius - 5)
    pointerGradient.addColorStop(0, '#7c3aed')
    pointerGradient.addColorStop(1, '#58a6ff')
    ctx.fillStyle = pointerGradient
    ctx.shadowColor = 'rgba(88, 166, 255, 0.6)'
    ctx.shadowBlur = 12
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius - 20)
    ctx.lineTo(centerX - 15, centerY - radius - 5)
    ctx.lineTo(centerX + 18, centerY - radius - 5)
    ctx.closePath()
    ctx.fill()
    ctx.shadowBlur = 0
    } catch (error) {
      console.error('Error drawing wheel:', error)
    }
  }

  useEffect(() => {
    if (numSegments === 0) return
    
    // Use a small delay to ensure the canvas is rendered
    const timer = setTimeout(() => {
      setRotation(0) // Reset rotation when drinks change
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
  }, [drinks, numSegments, anglePerSegment])

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
        
        // Determine selected drink - account for the -90 degree offset (starting at top)
        // Normalize rotation to 0-360 range
        const normalizedRotation = ((finalRotation % 360) + 360) % 360
        // Add 90 degrees because we start at top (-π/2 = -90°)
        const adjustedRotation = (normalizedRotation + 90) % 360
        // Calculate which segment the pointer is on
        const segmentIndex = Math.floor(adjustedRotation / (360 / numSegments)) % numSegments
        
        setTimeout(() => {
          if (drinks[segmentIndex]) {
            onSpinComplete(drinks[segmentIndex])
          }
        }, 500)
      }
    }

    requestAnimationFrame(animate)
  }

  if (numSegments === 0) {
    return (
      <div className="drink-wheel-container">
        <div className="no-drinks-message">
          <p>No drinks available with current filters.</p>
          <p className="no-drinks-hint">Adjust your filters to see drinks.</p>
        </div>
      </div>
    )
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
          width={500}
          height={500}
        />
      </div>
      
      <button
        className="spin-button"
        onClick={spin}
        disabled={isAnimating || isSpinning || numSegments === 0}
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
