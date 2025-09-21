import React, { useCallback, useEffect, useState } from 'react'
import { BarVisualizer, useConnectionState, useDataChannel, useLocalParticipant, useTracks, useVoiceAssistant, TrackToggle } from '@livekit/components-react'
import { ConnectionState, LocalParticipant, Track } from 'livekit-client'
import { LoadingSVG } from '../ui/loading-svg'
import { TranscriptionTile } from '../transcriptions/TranscriptionTile'
import { useConfig } from '../../hooks/useConfig'
import { PlaygroundTile } from './PlaygroundTile'
import { ConfigurationPanelItem } from '../config/ConfigurationPanelItem'
import { AudioInputTile } from '../config/AudioInputTile'

export default function Playground({ onConnect, onClose }) {
  const { config } = useConfig()
  const [transcripts, setTranscripts] = useState([])
  const { localParticipant } = useLocalParticipant()
  const voiceAssistant = useVoiceAssistant()
  const roomState = useConnectionState()
  const tracks = useTracks()

  useEffect(() => {
    onConnect(true)
  }, [onConnect])

  useEffect(() => {
    if (roomState === ConnectionState.Connected) {
      localParticipant.setMicrophoneEnabled(config.settings.inputs.mic)
    }
  }, [config, localParticipant, roomState])

  const localTracks = tracks.filter(({ participant }) => participant instanceof LocalParticipant)
  const localMicTrack = localTracks.find(({ source }) => source === Track.Source.Microphone)

  const onDataReceived = useCallback(
    (msg) => {
      if (msg.topic === 'transcription') {
        const decoded = JSON.parse(new TextDecoder('utf-8').decode(msg.payload))
        let timestamp = new Date().getTime()
        if ('timestamp' in decoded && decoded.timestamp > 0) {
          timestamp = decoded.timestamp
        }
        setTranscripts([
          ...transcripts,
          {
            name: 'You',
            message: decoded.text,
            timestamp: timestamp,
            isSelf: true,
          },
        ])
      }
    },
    [transcripts]
  )

  useDataChannel(onDataReceived)

  const renderVoiceAssistant = () => {
    if (roomState === ConnectionState.Disconnected) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground h-full">
          <div className="w-12 h-12 bg-muted rounded-full"></div>
          <p>Assistant offline</p>
        </div>
      )
    }

    if (!voiceAssistant.audioTrack) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-primary h-full">
          <LoadingSVG diameter={40} />
          <p>Connecting...</p>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="w-full h-32 flex items-center justify-center">
          <BarVisualizer state={voiceAssistant.state} trackRef={voiceAssistant.audioTrack} barCount={5} options={{ minHeight: 20 }} />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">Listening</p>
          <p className="text-sm text-muted-foreground">Speak naturally</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex justify-between items-center bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">AI</span>
          </div>
          <h2 className="text-lg font-medium">University Assistant</h2>
        </div>
        <button onClick={onClose} className="text-primary-foreground hover:text-primary-foreground/80 p-1">
          ✕
        </button>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <div className="flex-1 p-6 flex flex-col">
          <PlaygroundTile className="flex-1 min-h-0">
            {renderVoiceAssistant()}
            {localMicTrack && (
              <div className="absolute bottom-4 right-4">
                <TrackToggle source={Track.Source.Microphone} className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/80">
                  🎤
                </TrackToggle>
              </div>
            )}
          </PlaygroundTile>

          {localMicTrack && (
            <div className="mt-4">
              <ConfigurationPanelItem title="Microphone" deviceSelectorKind="audioinput">
                <AudioInputTile trackRef={localMicTrack} />
              </ConfigurationPanelItem>
            </div>
          )}
        </div>

        <div className="w-80 border-l border-border p-6 flex flex-col min-h-0">
          <PlaygroundTile title="Conversation" className="flex-1 min-h-0">
            {voiceAssistant.audioTrack ? (
              <TranscriptionTile agentAudioTrack={voiceAssistant.audioTrack} accentColor={config.settings.theme_color} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Chat will appear here</p>
              </div>
            )}
          </PlaygroundTile>
        </div>
      </div>
    </div>
  )
}
