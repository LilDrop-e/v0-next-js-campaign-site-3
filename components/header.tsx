"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const [userId, setUserId] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId")
      setUserId(storedUserId)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    localStorage.removeItem("userId")
    window.location.href = "/"
  }

  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/home" className="text-xl font-bold text-primary">
          CAMISapi
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/campaign"
            className={`text-sm transition-colors hover:text-primary ${
              isActive("/campaign") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Campanha
          </Link>
          <Link
            href="/features"
            className={`text-sm transition-colors hover:text-primary ${
              isActive("/features") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Funcionalidades
          </Link>
          <Link
            href="/docs"
            className={`text-sm transition-colors hover:text-primary ${
              isActive("/docs") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Documentação
          </Link>
        </nav>

        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-transparent hover:bg-transparent flex items-center gap-2"
          >
            Olá, {userId || "Usuário"}
            <ChevronDown className="w-4 h-4" />
          </Button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
