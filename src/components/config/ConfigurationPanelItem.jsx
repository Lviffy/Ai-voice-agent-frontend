import { ReactNode } from 'react'
import { TrackToggle } from '@livekit/components-react'
import { Track } from 'livekit-client'

const ConfigurationPanelItem = ({ children, title, deviceSelectorKind }) => {
  return (
    <div className="w-full text-foreground py-4 border-b border-border relative">
      <div className="flex flex-row justify-between items-center px-4 text-xs uppercase tracking-wider">
        <h3>{title}</h3>
        {deviceSelectorKind && (
          <span className="flex flex-row gap-2">
            <TrackToggle
              className="px-2 py-1 bg-muted text-foreground border border-border rounded-sm hover:bg-accent"
              source={deviceSelectorKind === 'audioinput' ? Track.Source.Microphone : Track.Source.Camera}
            />
          </span>
        )}
      </div>
      <div className="px-4 py-2 text-xs text-muted-foreground leading-normal">{children}</div>
    </div>
  )
}

export { ConfigurationPanelItem }
