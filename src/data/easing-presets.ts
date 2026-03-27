import type { EasingPreset } from "@/types"

export const EASING_PRESETS: EasingPreset[] = [
  // Basic CSS
  { name: "linear", group: "Basic CSS", value: [0, 0, 1, 1] },
  { name: "ease", group: "Basic CSS", value: [0.25, 0.1, 0.25, 1] },
  { name: "ease-in", group: "Basic CSS", value: [0.42, 0, 1, 1] },
  { name: "ease-out", group: "Basic CSS", value: [0, 0, 0.58, 1] },
  { name: "ease-in-out", group: "Basic CSS", value: [0.42, 0, 0.58, 1] },

  // Sine
  { name: "easeInSine", group: "Sine", value: [0.12, 0, 0.39, 0] },
  { name: "easeOutSine", group: "Sine", value: [0.61, 1, 0.88, 1] },
  { name: "easeInOutSine", group: "Sine", value: [0.37, 0, 0.63, 1] },

  // Quad
  { name: "easeInQuad", group: "Quad", value: [0.11, 0, 0.5, 0] },
  { name: "easeOutQuad", group: "Quad", value: [0.5, 1, 0.89, 1] },
  { name: "easeInOutQuad", group: "Quad", value: [0.45, 0, 0.55, 1] },

  // Cubic
  { name: "easeInCubic", group: "Cubic", value: [0.32, 0, 0.67, 0] },
  { name: "easeOutCubic", group: "Cubic", value: [0.33, 1, 0.68, 1] },
  { name: "easeInOutCubic", group: "Cubic", value: [0.65, 0, 0.35, 1] },

  // Quart
  { name: "easeInQuart", group: "Quart", value: [0.5, 0, 0.75, 0] },
  { name: "easeOutQuart", group: "Quart", value: [0.25, 1, 0.5, 1] },
  { name: "easeInOutQuart", group: "Quart", value: [0.76, 0, 0.24, 1] },

  // Quint
  { name: "easeInQuint", group: "Quint", value: [0.64, 0, 0.78, 0] },
  { name: "easeOutQuint", group: "Quint", value: [0.22, 1, 0.36, 1] },
  { name: "easeInOutQuint", group: "Quint", value: [0.83, 0, 0.17, 1] },

  // Expo
  { name: "easeInExpo", group: "Expo", value: [0.7, 0, 0.84, 0] },
  { name: "easeOutExpo", group: "Expo", value: [0.16, 1, 0.3, 1] },
  { name: "easeInOutExpo", group: "Expo", value: [0.87, 0, 0.13, 1] },

  // Circ
  { name: "easeInCirc", group: "Circ", value: [0.55, 0, 1, 0.45] },
  { name: "easeOutCirc", group: "Circ", value: [0, 0.55, 0.45, 1] },
  { name: "easeInOutCirc", group: "Circ", value: [0.85, 0, 0.15, 1] },

  // Back (overshoot)
  { name: "easeInBack", group: "Back", value: [0.36, 0, 0.66, -0.56] },
  { name: "easeOutBack", group: "Back", value: [0.34, 1.56, 0.64, 1] },
  { name: "easeInOutBack", group: "Back", value: [0.68, -0.6, 0.32, 1.6] },
]

export function findMatchingPreset(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tolerance = 0.01
): EasingPreset | null {
  return (
    EASING_PRESETS.find((p) => {
      const [px1, py1, px2, py2] = p.value
      return (
        Math.abs(px1 - x1) < tolerance &&
        Math.abs(py1 - y1) < tolerance &&
        Math.abs(px2 - x2) < tolerance &&
        Math.abs(py2 - y2) < tolerance
      )
    }) ?? null
  )
}

export function getGroupedPresets(): Map<string, EasingPreset[]> {
  const groups = new Map<string, EasingPreset[]>()
  for (const preset of EASING_PRESETS) {
    const group = groups.get(preset.group) ?? []
    group.push(preset)
    groups.set(preset.group, group)
  }
  return groups
}

const CSS_KEYWORDS: Record<string, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
}

export function getNamedKeyword(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string | null {
  for (const [keyword, [kx1, ky1, kx2, ky2]] of Object.entries(CSS_KEYWORDS)) {
    if (x1 === kx1 && y1 === ky1 && x2 === kx2 && y2 === ky2) {
      return keyword
    }
  }
  return null
}
