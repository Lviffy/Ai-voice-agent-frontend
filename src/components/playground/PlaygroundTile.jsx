import { ReactNode } from 'react'

const PlaygroundTile = ({ children, title, className = '' }) => {
  return (
    <div className={`flex flex-col border border-border rounded-lg bg-card shadow-sm ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-border bg-muted/30 flex-shrink-0">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
      )}
      <div className="flex-1 p-4 relative min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}

export { PlaygroundTile }
