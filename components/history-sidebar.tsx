"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface HistoryItem {
  id: string
  created_at: string
  input: {
    text: string
    platform: string
    content_type: string
    user_id: string
  }
  output: {
    A: any
    B: any
  }
}

export function HistorySidebar({ history: propHistory }: { history?: HistoryItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (propHistory) {
      console.log("[v0] 📊 Atualizando histórico da sidebar:", propHistory)
      setHistory(propHistory)
    }
  }, [propHistory])

  useEffect(() => {
    if (isOpen && !propHistory) {
      loadHistory()
    }
  }, [isOpen, propHistory])

  const loadHistory = async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) return

    setLoading(true)
    try {
      const response = await fetch(`https://projeto-crm-ead.onrender.com/history/${userId}`)
      if (response.ok) {
        const data = await response.json()
        console.log("[v0] 📊 Histórico carregado diretamente:", data)
        setHistory(data)
      }
    } catch (error) {
      console.error("[v0] Erro ao carregar histórico:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <div
        className={`fixed right-0 top-16 bottom-0 bg-card border-l border-border/50 transition-all duration-300 z-40 ${
          isOpen ? "w-80" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Histórico
            </h3>
          </div>

          <ScrollArea className="flex-1">
            {loading ? (
              <div className="text-center text-muted-foreground py-8">Carregando...</div>
            ) : history.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Nenhum histórico encontrado</div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">{item.input.platform}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{item.input.content_type}</span>
                    </div>
                    <p className="text-sm line-clamp-2 mb-2">{item.input.text}</p>
                    <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="fixed right-4 top-20 z-50 bg-card border-primary/30"
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>
    </>
  )
}
