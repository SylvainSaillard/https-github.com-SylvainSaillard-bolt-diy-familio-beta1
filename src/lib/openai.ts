import { OpenAI } from 'openai'

const OPENAI_CONFIG = {
  assistantId: 'asst_KGCccx6WggkbZ0Fbj4BMHNPO',
  threadId: 'thread_lEe1R4FOTV70H5Mun3o7WdO9',
  vectorStoreId: 'vs_yRmJBvYTkAUq7rxxnp8nshYO'
}

export async function sendMessage(message: string) {
  try {
    const response = await fetch('/api/assistant/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        threadId: OPENAI_CONFIG.threadId,
        assistantId: OPENAI_CONFIG.assistantId
      }),
    })
    return response.json()
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export async function startSpeechRecognition() {
  try {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    
    return new Promise((resolve, reject) => {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }
      recognition.onerror = (event) => {
        reject(event.error)
      }
      recognition.start()
    })
  } catch (error) {
    console.error('Speech recognition error:', error)
    throw error
  }
}

export async function speakResponse(text: string) {
  const utterance = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(utterance)
}
