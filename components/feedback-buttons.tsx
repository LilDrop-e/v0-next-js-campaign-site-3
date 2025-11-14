"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { sendFeedback } from "@/lib/api"

interface FeedbackButtonsProps {
  suggestionId: string
  onFeedbackSubmit?: () => void
}

export function FeedbackButtons({ suggestionId, onFeedbackSubmit }: FeedbackButtonsProps) {
  const [feedbackType, setFeedbackType] = useState<"like" | "dislike" | null>(null)

  const handleFeedback = async (feedback: string) => {
    const userId = localStorage.getItem("userId")
    if (!userId || !suggestionId) return

    try {
      await sendFeedback({ user_id: userId, suggestion_id: suggestionId, feedback })
      setFeedbackType(feedback.includes("Boas") ? "like" : "dislike")
      onFeedbackSubmit?.()
    } catch (error) {
      console.error("[v0] Erro ao enviar feedback:", error)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={feedbackType === "like" ? "default" : "outline"}
            size="sm"
            disabled={feedbackType === "dislike"}
          >
            <ThumbsUp className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFeedback("Boas sugestões")}>Boas sugestões</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFeedback("Boa explicação")}>Boa explicação</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={feedbackType === "dislike" ? "default" : "outline"}
            size="sm"
            disabled={feedbackType === "like"}
          >
            <ThumbsDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleFeedback("Sugestões genéricas")}>Sugestões genéricas</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFeedback("Não condiz com o tema")}>
            Não condiz com o tema
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFeedback("Texto fraco")}>Texto fraco</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFeedback("Formato inadequado")}>Formato inadequado</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFeedback("Horário ruim")}>Horário ruim</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFeedback("Hashtags irrelevantes")}>
            Hashtags irrelevantes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
