import { useState, useCallback } from "react"

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for non-secure contexts
          const textarea = document.createElement("textarea")
          textarea.value = text
          textarea.style.position = "fixed"
          textarea.style.opacity = "0"
          document.body.appendChild(textarea)
          textarea.focus()
          textarea.select()
          const ok = document.execCommand("copy")
          document.body.removeChild(textarea)
          if (!ok) throw new Error("execCommand copy failed")
        }
        setCopied(true)
        setTimeout(() => setCopied(false), resetDelay)
      } catch {
        // silently fail
      }
    },
    [resetDelay]
  )

  return { copied, copy }
}
