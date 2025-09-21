import { useChat, useLocalParticipant, useTrackTranscription } from '@livekit/components-react'
import { LocalParticipant, Participant, Track } from 'livekit-client'
import { useEffect, useState } from 'react'
import { ChatTile } from '../chat/ChatTile'

export function TranscriptionTile({ agentAudioTrack, accentColor }) {
  const agentMessages = useTrackTranscription(agentAudioTrack)
  const localParticipant = useLocalParticipant()
  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  })

  const [transcripts, setTranscripts] = useState(new Map())
  const [messages, setMessages] = useState([])
  const { chatMessages, send: sendChat } = useChat()

  useEffect(() => {
    agentMessages.segments.forEach((s) => transcripts.set(s.id, segmentToChatMessage(s, transcripts.get(s.id), agentAudioTrack.participant)))
    localMessages.segments.forEach((s) => transcripts.set(s.id, segmentToChatMessage(s, transcripts.get(s.id), localParticipant.localParticipant)))

    const allMessages = Array.from(transcripts.values())
    for (const msg of chatMessages) {
      const isAgent = msg.from?.identity === agentAudioTrack.participant?.identity
      const isSelf = msg.from?.identity === localParticipant.localParticipant.identity
      let name = msg.from?.name
      if (!name) {
        if (isAgent) {
          name = 'AI Assistant'
        } else if (isSelf) {
          name = 'You'
        } else {
          name = 'Unknown'
        }
      }
      allMessages.push({
        name,
        message: msg.message,
        timestamp: msg.timestamp,
        isSelf: isSelf,
      })
    }
    allMessages.sort((a, b) => a.timestamp - b.timestamp)
    setMessages(allMessages)
  }, [transcripts, chatMessages, localParticipant.localParticipant, agentAudioTrack.participant, agentMessages.segments, localMessages.segments])

  return <ChatTile messages={messages} accentColor={accentColor} onSend={sendChat} />
}

function segmentToChatMessage(s, existingMessage, participant) {
  const msg = {
    message: s.final ? s.text : `${s.text} ...`,
    name: participant instanceof LocalParticipant ? 'You' : 'AI Assistant',
    isSelf: participant instanceof LocalParticipant,
    timestamp: existingMessage?.timestamp ?? Date.now(),
  }
  return msg
}
