import React from 'react'
import { TaskColumn } from './TaskColumn'

const TaskBoard = ({ className = '', customData = null }) => {
  // Use the customData directly since it's passed from SupportTicketManagement
  const boardData = customData

  if (!boardData || boardData.isLoading) {
    return (
      <div className={`flex gap-6 overflow-x-auto pb-6 px-2 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col w-80 min-w-80 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 space-y-4 shadow-lg">
            <div className="h-7 w-2/3 rounded-lg bg-muted animate-pulse" />
            <div className="space-y-3">
              <div className="h-32 w-full rounded-lg bg-muted animate-pulse" />
              <div className="h-28 w-full rounded-lg bg-muted animate-pulse" />
              <div className="h-36 w-full rounded-lg bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex gap-6 overflow-x-auto pb-6 px-2 ${className}`}>
      {boardData.columns.map((column) => (
        <TaskColumn
          key={column.id}
          column={column}
          onDrop={boardData.handleDrop}
          onDragOver={boardData.handleDragOver}
          onDragLeave={boardData.handleDragLeave}
          onTaskDragStart={boardData.handleTaskDragStart}
          onTaskDragEnd={boardData.handleTaskDragEnd}
          onStatusChange={boardData.handleStatusChange}
        />
      ))}
    </div>
  )
}

export default TaskBoard
