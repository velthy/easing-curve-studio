import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useClipboard } from "@/hooks/useClipboard"
import { getNamedKeyword } from "@/data/easing-presets"
import type { BezierControlPoints } from "@/types"

function fmt(n: number): string {
  return parseFloat(n.toFixed(2)).toString()
}

interface CodeOutputProps {
  controlPoints: BezierControlPoints
  duration: number
}

export function CodeOutput({ controlPoints, duration }: CodeOutputProps) {
  const { copied, copy } = useClipboard()
  const { p1, p2 } = controlPoints

  const keyword = getNamedKeyword(p1.x, p1.y, p2.x, p2.y)
  const timing =
    keyword ??
    `cubic-bezier(${fmt(p1.x)}, ${fmt(p1.y)}, ${fmt(p2.x)}, ${fmt(p2.y)})`

  const shorthand = `transition: all ${duration}ms ${timing};`
  const longhand = `transition-property: all;
transition-duration: ${duration}ms;
transition-timing-function: ${timing};`

  const fullCode = `/* Shorthand */\n${shorthand}\n\n/* Longhand */\n${longhand}`

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          CSS Output
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs"
          onClick={() => copy(fullCode)}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>
      <Card className="p-4 bg-muted/30">
        <pre className="text-xs leading-relaxed font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
          <span className="text-muted-foreground">{"/* Shorthand */\n"}</span>
          {shorthand}
          {"\n\n"}
          <span className="text-muted-foreground">{"/* Longhand */\n"}</span>
          {longhand}
        </pre>
      </Card>
    </div>
  )
}
