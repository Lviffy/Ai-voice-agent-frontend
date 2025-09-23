import React from 'react'

export const TaskCard = ({ task, index, onDragStart, onDragEnd, onStatusChange }) => {
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'general':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30'
      case 'technical':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30'
      case 'billing':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30'
      case 'urgent':
        return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-muted/50 text-muted-foreground border-border'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/30'
      default:
        return 'bg-muted/50 text-muted-foreground border-border'
    }
  }

  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        console.log('Drag started for ticket:', task.title, 'ID:', task.id)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', task.id)
        onDragStart(e, task)
      }}
      onDragEnd={(e) => {
        console.log('Drag ended for ticket:', task.title)
        e.target.style.opacity = '1'
        onDragEnd(e)
      }}
      className="group relative bg-card border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 active:scale-95"
      style={{ userSelect: 'none' }}
    >
      {/* Header with Category and Priority */}
      <div className="flex items-center justify-between mb-3">
        {task.category && <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getCategoryColor(task.category)}`}>{task.category}</span>}
        {task.priority && <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getPriorityColor(task.priority)}`}>{task.priority}</span>}
      </div>

      {/* Task Title */}
      <h4 className="font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">{task.title}</h4>

      {/* Task Description */}
      {task.description && <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{task.description}</p>}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        {/* Ticket ID */}
        <div className="text-muted-foreground">
          <span className="font-medium">#{task.id.slice(-8)}</span>
        </div>

        {/* Assignee (Contact Email) */}
        {task.assignee && (
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
              <span className="text-xs font-semibold text-primary uppercase">{task.assignee.charAt(0)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Drag Handle Indicator */}
      <div className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 transition-opacity">
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </div>
    </div>
  )
}
