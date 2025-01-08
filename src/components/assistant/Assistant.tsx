import { useState, useRef } from 'react'
import { sendMessage, startSpeechRecognition, speakResponse } from '@/lib/openai'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export function Assistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    setIsLoading(true)
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')
    scrollToBottom()

    try {
      const response = await sendMessage(text)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      await speakResponse(response.message)
      scrollToBottom()
    } catch (error) {
      console.error('Error processing message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = async () => {
    try {
      setIsListening(true)
      const transcript = await startSpeechRecognition()
      setInputMessage(transcript as string)
      await handleSendMessage(transcript as string)
    } catch (error) {
      console.error('Voice input error:', error)
    } finally {
      setIsListening(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-blue-600">Family Assistant</h2>
      <div className="bg-white rounded-xl shadow-sm p-4 h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage(inputMessage)
        }}
        className="flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleVoiceInput}
          disabled={isLoading || isListening}
          className={`p-2 rounded-lg ${
            isListening ? 'bg-red-500' : 'bg-gray-100'
          }`}
        >
          <svg
            className={`w-6 h-6 ${isListening ? 'text-white' : 'text-gray-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
