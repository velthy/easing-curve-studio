export interface Point {
  x: number
  y: number
}

export interface BezierControlPoints {
  p1: Point
  p2: Point
}

export interface EasingPreset {
  name: string
  group: string
  value: [number, number, number, number]
}

export type AnimationEffect =
  | "left"
  | "width"
  | "height"
  | "opacity"
  | "scale"
  | "rotate"
  | "translate3d"
