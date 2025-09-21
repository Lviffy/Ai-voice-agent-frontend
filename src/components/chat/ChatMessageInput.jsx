import { useState } from 'react'
import { Button } from '../ui/button'

export const ChatMessageInput = ({ placeholder, accentColor, onSend }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <div className="flex items-center border-t border-border p-4">
      <input
        className="flex-grow px-4 py-2 border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        type="text"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/80" onClick={handleSend}>
        Send
      </Button>
    </div>
  )
}
