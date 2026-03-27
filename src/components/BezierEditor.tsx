import { useRef, useCallback, useState } from "react"
import type { Point, BezierControlPoints } from "@/types"

const SVG_SIZE = 280
const PADDING = 40
const USABLE = SVG_SIZE - PADDING * 2
const Y_MIN = -0.4
const Y_MAX = 1.4
const Y_RANGE = Y_MAX - Y_MIN

function toSvgX(n: number) {
  return PADDING + n * USABLE
}
function toSvgY(n: number) {
  return PADDING + (Y_MAX - n) / Y_RANGE * USABLE
}
function fromSvgX(sx: number) {
  return Math.max(0, Math.min(1, (sx - PADDING) / USABLE))
}
function fromSvgY(sy: number) {
  return Y_MAX - (sy - PADDING) / USABLE * Y_RANGE
}

interface BezierEditorProps {
  controlPoints: BezierControlPoints
  onChange: (cp: BezierControlPoints) => void
}

export function BezierEditor({ controlPoints, onChange }: BezierEditorProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState<"p1" | "p2" | null>(null)

  const getPoint = useCallback(
    (e: React.PointerEvent): Point | null => {
      const svg = svgRef.current
      if (!svg) return null
      const rect = svg.getBoundingClientRect()
      const svgX = ((e.clientX - rect.left) / rect.width) * SVG_SIZE
      const svgY = ((e.clientY - rect.top) / rect.height) * SVG_SIZE
      return { x: fromSvgX(svgX), y: fromSvgY(svgY) }
    },
    []
  )

  const handlePointerDown = useCallback(
    (which: "p1" | "p2") => (e: React.PointerEvent) => {
      ;(e.target as Element).setPointerCapture(e.pointerId)
      setDragging(which)
    },
    []
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return
      const pt = getPoint(e)
      if (!pt) return
      const rounded = {
        x: Math.round(pt.x * 100) / 100,
        y: Math.round(pt.y * 100) / 100,
      }
      onChange({
        ...controlPoints,
        [dragging]: rounded,
      })
    },
    [dragging, controlPoints, onChange, getPoint]
  )

  const handlePointerUp = useCallback(() => {
    setDragging(null)
  }, [])

  const { p1, p2 } = controlPoints

  // SVG coordinates
  const sx0 = toSvgX(0)
  const sy0 = toSvgY(0)
  const sx1 = toSvgX(1)
  const sy1 = toSvgY(1)
  const sp1x = toSvgX(p1.x)
  const sp1y = toSvgY(p1.y)
  const sp2x = toSvgX(p2.x)
  const sp2y = toSvgY(p2.y)

  // Grid lines for 0, 0.25, 0.5, 0.75, 1
  const gridLines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        overflow="visible"
        className="w-full aspect-square select-none touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Glow filters for control points */}
        <defs>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#3b82f6" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#f97316" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect
          x={PADDING}
          y={toSvgY(1)}
          width={USABLE}
          height={toSvgY(0) - toSvgY(1)}
          className="fill-muted/50"
          rx="2"
        />

        {/* Grid lines */}
        {gridLines.map((v) => (
          <g key={v}>
            <line
              x1={toSvgX(v)}
              y1={toSvgY(0)}
              x2={toSvgX(v)}
              y2={toSvgY(1)}
              className="stroke-border"
              strokeWidth="0.5"
            />
            <line
              x1={toSvgX(0)}
              y1={toSvgY(v)}
              x2={toSvgX(1)}
              y2={toSvgY(v)}
              className="stroke-border"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={PADDING - 4}
          y={toSvgY(0) + 4}
          textAnchor="end"
          className="fill-muted-foreground text-[8px]"
        >
          0
        </text>
        <text
          x={PADDING - 4}
          y={toSvgY(1) + 4}
          textAnchor="end"
          className="fill-muted-foreground text-[8px]"
        >
          1
        </text>
        <text
          x={toSvgX(0)}
          y={toSvgY(0) + 14}
          textAnchor="middle"
          className="fill-muted-foreground text-[8px]"
        >
          0
        </text>
        <text
          x={toSvgX(1)}
          y={toSvgY(0) + 14}
          textAnchor="middle"
          className="fill-muted-foreground text-[8px]"
        >
          1
        </text>

        {/* Diagonal reference (linear) */}
        <line
          x1={sx0}
          y1={sy0}
          x2={sx1}
          y2={sy1}
          className="stroke-muted-foreground/30"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Guide lines from endpoints to control points */}
        <line
          x1={sx0}
          y1={sy0}
          x2={sp1x}
          y2={sp1y}
          className="stroke-blue-500/60"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1={sx1}
          y1={sy1}
          x2={sp2x}
          y2={sp2y}
          className="stroke-orange-500/60"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Bezier curve */}
        <path
          d={`M ${sx0} ${sy0} C ${sp1x} ${sp1y}, ${sp2x} ${sp2y}, ${sx1} ${sy1}`}
          fill="none"
          className="stroke-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Start and end points */}
        <circle cx={sx0} cy={sy0} r="3" className="fill-primary" />
        <circle cx={sx1} cy={sy1} r="3" className="fill-primary" />

        {/* Control point P1 (blue) */}
        <circle
          cx={sp1x}
          cy={sp1y}
          r="12"
          className="fill-transparent cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown("p1")}
        />
        <circle
          cx={sp1x}
          cy={sp1y}
          r="6"
          className="fill-blue-500 stroke-background stroke-2 pointer-events-none"
          filter={dragging === "p1" ? "url(#glow-blue)" : undefined}
        />

        {/* Control point P2 (orange) */}
        <circle
          cx={sp2x}
          cy={sp2y}
          r="12"
          className="fill-transparent cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown("p2")}
        />
        <circle
          cx={sp2x}
          cy={sp2y}
          r="6"
          className="fill-orange-500 stroke-background stroke-2 pointer-events-none"
          filter={dragging === "p2" ? "url(#glow-orange)" : undefined}
        />
      </svg>
    </div>
  )
}
