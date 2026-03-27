import { useState, useCallback } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Header } from "@/components/Header"
import { BezierEditor } from "@/components/BezierEditor"
import { PresetSelector } from "@/components/PresetSelector"
import { DurationControl } from "@/components/DurationControl"
import { AnimationPreview } from "@/components/AnimationPreview"
import { CodeOutput } from "@/components/CodeOutput"
import { EASING_PRESETS, findMatchingPreset } from "@/data/easing-presets"
import type { BezierControlPoints, AnimationEffect } from "@/types"

const DEFAULT_PRESET = EASING_PRESETS.find((p) => p.name === "ease")!

function fmt(n: number): string {
  return parseFloat(n.toFixed(2)).toString()
}

function App() {
  const [controlPoints, setControlPoints] = useState<BezierControlPoints>({
    p1: { x: DEFAULT_PRESET.value[0], y: DEFAULT_PRESET.value[1] },
    p2: { x: DEFAULT_PRESET.value[2], y: DEFAULT_PRESET.value[3] },
  })
  const [selectedPreset, setSelectedPreset] = useState<string | null>("ease")
  const [duration, setDuration] = useState(500)
  const [selectedEffect, setSelectedEffect] = useState<AnimationEffect>("left")

  const handleControlPointChange = useCallback(
    (cp: BezierControlPoints) => {
      setControlPoints(cp)
      const match = findMatchingPreset(cp.p1.x, cp.p1.y, cp.p2.x, cp.p2.y)
      setSelectedPreset(match?.name ?? null)
    },
    []
  )

  const handlePresetSelect = useCallback((presetName: string) => {
    const preset = EASING_PRESETS.find((p) => p.name === presetName)
    if (!preset) return
    setSelectedPreset(presetName)
    setControlPoints({
      p1: { x: preset.value[0], y: preset.value[1] },
      p2: { x: preset.value[2], y: preset.value[3] },
    })
  }, [])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,600px)] gap-8">
              {/* Left column: Bezier Editor */}
              <div className="space-y-4 md:sticky md:top-6 md:self-start">
                <div className="rounded-xl border border-border bg-card p-2">
                  <BezierEditor
                    controlPoints={controlPoints}
                    onChange={handleControlPointChange}
                  />
                  <div className="mt-3 text-center">
                    <code className="text-xs text-muted-foreground font-mono">
                      cubic-bezier({fmt(controlPoints.p1.x)}, {fmt(controlPoints.p1.y)},{" "}
                      {fmt(controlPoints.p2.x)}, {fmt(controlPoints.p2.y)})
                    </code>
                  </div>
                </div>
              </div>

              {/* Right column: Controls */}
              <div className="space-y-6">
                <PresetSelector
                  selectedPreset={selectedPreset}
                  onSelect={handlePresetSelect}
                />
                <DurationControl
                  duration={duration}
                  onChange={setDuration}
                />
                <AnimationPreview
                  controlPoints={controlPoints}
                  duration={duration}
                  selectedEffect={selectedEffect}
                  onEffectChange={setSelectedEffect}
                />
                <CodeOutput
                  controlPoints={controlPoints}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}

export default App
