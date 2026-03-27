import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M2 20 C 8 20, 6 4, 22 4" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold tracking-tight">Easing Curve Studio</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}
