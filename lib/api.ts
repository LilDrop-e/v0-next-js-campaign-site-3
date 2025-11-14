const BASE_URL = "https://projeto-crm-ead.onrender.com"

export async function sendResponse({
  user_id,
  suggestion_id,
  choice,
}: {
  user_id: string
  suggestion_id: string
  choice: "A" | "B"
}) {
  console.log("[v0] 🚀 sendResponse chamado:", { user_id, suggestion_id, choice })

  try {
    const res = await fetch(`${BASE_URL}/chat_response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, suggestion_id, choice }),
    })

    console.log("[v0] ✅ sendResponse status:", res.status)
    console.log("[v0] ✅ sendResponse ok:", res.ok)

    return res.ok
  } catch (error) {
    console.error("[v0] ❌ sendResponse erro:", error)
    return false
  }
}

export async function sendFeedback(data: {
  user_id: string
  suggestion_id: string
  feedback: string
}) {
  console.log("[v0] 🚀 sendFeedback chamado:", data)

  try {
    const res = await fetch(`${BASE_URL}/chat_feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    console.log("[v0] ✅ sendFeedback status:", res.status)
    console.log("[v0] ✅ sendFeedback ok:", res.ok)

    const responseData = await res.json()
    console.log("[v0] ✅ sendFeedback resposta:", responseData)
  } catch (error) {
    console.error("[v0] ❌ sendFeedback erro:", error)
  }
}

export async function exportChat(suggestion_id: string) {
  console.log("[v0] 🚀 exportChat chamado:", { suggestion_id })

  try {
    const res = await fetch(`${BASE_URL}/chat_export/${suggestion_id}`)

    console.log("[v0] ✅ exportChat status:", res.status)
    console.log("[v0] ✅ exportChat ok:", res.ok)

    const blob = await res.blob()
    console.log("[v0] ✅ exportChat blob size:", blob.size, "bytes")

    return blob
  } catch (error) {
    console.error("[v0] ❌ exportChat erro:", error)
    throw error
  }
}

export async function getHistory(user_id: string) {
  console.log("[v0] 🚀 getHistory chamado:", { user_id })

  try {
    const res = await fetch(`${BASE_URL}/history/${user_id}`)

    console.log("[v0] ✅ getHistory status:", res.status)
    console.log("[v0] ✅ getHistory ok:", res.ok)

    if (res.ok) {
      const data = await res.json()
      console.log("[v0] ✅ getHistory dados recebidos:", data)
      return data
    }

    console.log("[v0] ⚠️ getHistory retornou array vazio")
    return []
  } catch (error) {
    console.error("[v0] ❌ getHistory erro:", error)
    return []
  }
}
