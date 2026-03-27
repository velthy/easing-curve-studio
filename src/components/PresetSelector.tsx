import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getGroupedPresets, EASING_PRESETS } from "@/data/easing-presets"
import { Label } from "@/components/ui/label"

interface PresetSelectorProps {
  selectedPreset: string | null
  onSelect: (presetName: string) => void
}

export function PresetSelector({
  selectedPreset,
  onSelect,
}: PresetSelectorProps) {
  const grouped = getGroupedPresets()

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Easing Preset
      </Label>
      <Select
        value={selectedPreset ?? "custom"}
        onValueChange={(value) => {
          if (value === "custom" || value === null) return
          onSelect(value)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedPreset
              ? EASING_PRESETS.find((p) => p.name === selectedPreset)?.name ??
                selectedPreset
              : "Custom"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="custom" disabled className="text-muted-foreground italic">
              Custom
            </SelectItem>
          </SelectGroup>
          {[...grouped.entries()].map(([group, presets]) => (
            <SelectGroup key={group}>
              <SelectLabel className="text-xs font-semibold text-muted-foreground">
                {group}
              </SelectLabel>
              {presets.map((preset) => (
                <SelectItem key={preset.name} value={preset.name}>
                  {preset.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
