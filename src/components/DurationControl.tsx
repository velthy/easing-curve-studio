import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DurationControlProps {
  duration: number
  onChange: (duration: number) => void
}

export function DurationControl({ duration, onChange }: DurationControlProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Duration
      </Label>
      <div className="flex items-center gap-3">
        <Slider
          value={[duration]}
          onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
          min={100}
          max={5000}
          step={50}
          className="flex-1"
        />
        <div className="flex items-center gap-1">
          <Input
            type="number"
            value={duration}
            onChange={(e) => {
              const v = parseInt(e.target.value)
              if (!isNaN(v) && v >= 50 && v <= 10000) onChange(v)
            }}
            className="w-20 h-8 text-sm text-center"
          />
          <span className="text-xs text-muted-foreground">ms</span>
        </div>
      </div>
    </div>
  )
}
