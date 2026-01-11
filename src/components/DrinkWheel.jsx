import { useState, useRef, useEffect } from 'react'
import './DrinkWheel.css'

const DrinkWheel = ({ drinks = [], onSpinComplete, onSpinStart, isSpinning, triggerSpin }) => {
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const wheelRef = useRef(null)
  const canvasRef = useRef(null)
  const spinButtonRef = useRef(null)

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
      const radius = fixedSize / 2 - 12

      // Clear entire canvas
      ctx.clearRect(0, 0, fixedSize, fixedSize)

      // Draw outer glow ring
      const outerGradient = ctx.createRadialGradient(centerX, centerY, radius - 5, centerX, centerY, radius + 10)
      outerGradient.addColorStop(0, 'rgba(88, 166, 255, 0.2)')
      outerGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = outerGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI)
      ctx.fill()

      // Draw segments with enhanced visuals
      drinks.forEach((drink, index) => {
        const startAngle = (index * anglePerSegment) - Math.PI / 2
        const endAngle = index === numSegments - 1 
          ? (Math.PI * 3 / 2)
          : ((index + 1) * anglePerSegment) - Math.PI / 2

        // Enhanced color scheme with subtle gradients
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
          segmentGradient.addColorStop(0, '#1c2128')
          segmentGradient.addColorStop(0.5, '#161b22')
          segmentGradient.addColorStop(1, '#0d1117')
        } else {
          segmentGradient.addColorStop(0, '#21262d')
          segmentGradient.addColorStop(0.5, '#1c2128')
          segmentGradient.addColorStop(1, '#161b22')
        }
        
        ctx.fillStyle = segmentGradient
        ctx.strokeStyle = '#30363d'
        ctx.lineWidth = 2.5

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, false)
        ctx.lineTo(centerX, centerY)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add subtle inner highlight
        ctx.save()
        ctx.globalAlpha = 0.3
        const highlightGradient = ctx.createLinearGradient(
          centerX + Math.cos(startAngle + anglePerSegment / 2) * (radius * 0.2),
          centerY + Math.sin(startAngle + anglePerSegment / 2) * (radius * 0.2),
          centerX,
          centerY
        )
        highlightGradient.addColorStop(0, 'rgba(88, 166, 255, 0.4)')
        highlightGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = highlightGradient
        ctx.fill()
        ctx.restore()

        // Draw text with enhanced styling
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(startAngle + anglePerSegment / 2)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        
        const fontSize = Math.max(12, fixedSize / 32)
        ctx.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`
        
        // Text with gradient
        const textGradient = ctx.createLinearGradient(0, -10, 0, 10)
        textGradient.addColorStop(0, '#f0f6fc')
        textGradient.addColorStop(0.5, '#c9d1d9')
        textGradient.addColorStop(1, '#f0f6fc')
        ctx.fillStyle = textGradient
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = 6
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        
        const text = drink.name.length > 15 
          ? drink.name.substring(0, 12) + '...' 
          : drink.name
        
        ctx.fillText(text, radius * 0.58, 0)
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.restore()
      })

      // Enhanced center circle with multiple layers
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40)
      centerGradient.addColorStop(0, '#0d1117')
      centerGradient.addColorStop(0.6, '#161b22')
      centerGradient.addColorStop(1, '#1c2128')
      ctx.fillStyle = centerGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
      ctx.fill()
      
      // Center ring with glow
      ctx.strokeStyle = '#58a6ff'
      ctx.lineWidth = 4
      ctx.shadowColor = 'rgba(88, 166, 255, 0.8)'
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
      ctx.stroke()
      
      // Inner center highlight
      ctx.fillStyle = 'rgba(88, 166, 255, 0.2)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.shadowBlur = 0

      // Enhanced pointer with multiple layers
      const pointerGradient = ctx.createLinearGradient(
        centerX, centerY - radius - 25, 
        centerX, centerY - radius - 5
      )
      pointerGradient.addColorStop(0, '#7c3aed')
      pointerGradient.addColorStop(0.5, '#58a6ff')
      pointerGradient.addColorStop(1, '#7c3aed')
      
      ctx.fillStyle = pointerGradient
      ctx.shadowColor = 'rgba(88, 166, 255, 0.9)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - radius - 22)
      ctx.lineTo(centerX - 18, centerY - radius - 5)
      ctx.lineTo(centerX + 18, centerY - radius - 5)
      ctx.closePath()
      ctx.fill()
      
      // Pointer outline
      ctx.strokeStyle = '#f0f6fc'
      ctx.lineWidth = 2
      ctx.shadowBlur = 0
      ctx.stroke()
      
      ctx.shadowBlur = 0
    } catch (error) {
      console.error('Error drawing wheel:', error)
    }
  }

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
  }, [drinks, numSegments, anglePerSegment])

  // Handle external spin trigger
  useEffect(() => {
    if (triggerSpin > 0 && !isAnimating && !isSpinning && numSegments > 0) {
      if (isAnimating || isSpinning) return

      onSpinStart()
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
          
          const normalizedRotation = ((finalRotation % 360) + 360) % 360
          const adjustedRotation = (normalizedRotation + 90) % 360
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSpin])

  const spin = () => {
    if (isAnimating || isSpinning) return

    onSpinStart()
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
        
        const normalizedRotation = ((finalRotation % 360) + 360) % 360
        const adjustedRotation = (normalizedRotation + 90) % 360
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
    <div className="drink-wheel-container" ref={wheelRef}>
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
          width={480}
          height={480}
        />
      </div>

      <button
        ref={spinButtonRef}
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
