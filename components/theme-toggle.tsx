"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Sadece client tarafında render edildiğinden emin oluyoruz
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sayfa yüklenene kadar boş bir buton gösteriyoruz
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <span className="sr-only">Loading theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  )
} 