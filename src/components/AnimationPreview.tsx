import { useState, useRef, useCallback, useEffect } from "react"
import { RalphWiggum } from "@/components/RalphWiggum"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Play } from "lucide-react"
import type { AnimationEffect, BezierControlPoints } from "@/types"

const EFFECTS: { value: AnimationEffect; label: string }[] = [
  { value: "left", label: "Horizontal Position" },
  { value: "width", label: "Width" },
  { value: "height", label: "Height" },
  { value: "opacity", label: "Opacity" },
  { value: "scale", label: "Scale" },
  { value: "rotate", label: "Rotate" },
  { value: "translate3d", label: "Translate 3D" },
]

interface AnimationPreviewProps {
  controlPoints: BezierControlPoints
  duration: number
  selectedEffect: AnimationEffect
  onEffectChange: (effect: AnimationEffect) => void
}

function getStyles(
  effect: AnimationEffect,
  active: boolean
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "relative",
    display: "block",
    width: "40px",
    height: "40px",
  }

  switch (effect) {
    case "left":
      return { ...base, left: active ? "calc(100% - 40px)" : "0px" }
    case "width":
      return { ...base, width: active ? "100%" : "40px" }
    case "height":
      return { ...base, height: active ? "80px" : "40px" }
    case "opacity":
      return { ...base, opacity: active ? 1 : 0.15 }
    case "scale":
      return {
        ...base,
        transform: active ? "scale(1.8)" : "scale(1)",
        transformOrigin: "center",
      }
    case "rotate":
      return {
        ...base,
        transform: active ? "rotate(360deg)" : "rotate(0deg)",
      }
    case "translate3d":
      return {
        ...base,
        transform: active
          ? "translate3d(120px, -20px, 0) rotateY(180deg)"
          : "translate3d(0, 0, 0) rotateY(0deg)",
      }
  }
}

function getTransitionProperty(effect: AnimationEffect): string {
  switch (effect) {
    case "left":
      return "left"
    case "width":
      return "width"
    case "height":
      return "height"
    case "opacity":
      return "opacity"
    default:
      return "transform"
  }
}

export function AnimationPreview({
  controlPoints,
  duration,
  selectedEffect,
  onEffectChange,
}: AnimationPreviewProps) {
  const [active, setActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [roundTrip, setRoundTrip] = useState(true)
  const [skipTransition, setSkipTransition] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const { p1, p2 } = controlPoints
  const bezier = `cubic-bezier(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`
  const prop = getTransitionProperty(selectedEffect)

  const play = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    if (!roundTrip && active) {
      // Already at end state — snap back first, then replay
      setSkipTransition(true)
      setActive(false)
      timeoutRef.current = setTimeout(() => {
        setSkipTransition(false)
        setActive(true)
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false)
        }, duration + 50)
      }, 16)
      return
    }

    setActive(true)

    if (roundTrip) {
      timeoutRef.current = setTimeout(() => {
        setActive(false)
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false)
        }, duration + 50)
      }, duration + 200)
    } else {
      // One-way: stay at end state, just re-enable Play
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
      }, duration + 50)
    }
  }, [duration, isAnimating, roundTrip, active])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Preview Effect
        </Label>
        <div className="flex items-center gap-2">
          <Select
            value={selectedEffect}
            onValueChange={(v) => onEffectChange(v as AnimationEffect)}
          >
            <SelectTrigger className="flex-1">
              <SelectValue>
                {EFFECTS.find((e) => e.value === selectedEffect)?.label ?? selectedEffect}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EFFECTS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={play}
            disabled={isAnimating}
            className="gap-1.5 h-8 px-3"
          >
            <Play className="h-3.5 w-3.5" />
            Play
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <input
          type="checkbox"
          id="round-trip"
          checked={roundTrip}
          onChange={(e) => setRoundTrip(e.target.checked)}
          className="h-3.5 w-3.5 cursor-pointer accent-primary"
        />
        <Label
          htmlFor="round-trip"
          className="text-xs text-muted-foreground cursor-pointer font-normal"
        >
          Round trip
        </Label>
      </div>

      <div className="relative h-24 overflow-hidden rounded-lg border border-border bg-muted/30 p-4 flex items-center">
        <RalphWiggum
          style={{
            ...getStyles(selectedEffect, active),
            transition: skipTransition ? "none" : `${prop} ${duration}ms ${bezier}`,
          }}
        />
      </div>
    </div>
  )
}
