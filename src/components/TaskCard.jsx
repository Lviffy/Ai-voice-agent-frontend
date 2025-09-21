import React from 'react';

/**
 * TaskCard component for displaying individual tasks in the Kanban board
 * @param {Object} props
 * @param {import('../types/task').Task} props.task - Task data
 * @param {number} props.index - Task index in the column
 * @param {Function} props.onDragStart - Drag start handler
 * @param {Function} props.onDragEnd - Drag end handler
 * @param {Function} props.onStatusChange - Status change handler
 * @returns {JSX.Element}
 */
export const TaskCard = ({ task, index, onDragStart, onDragEnd, onStatusChange }) => {
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'design':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
      case 'development':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30';
      case 'documentation':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30';
      case 'testing':
        return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      default:
        return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const today = new Date();
    const isOverdue = date < today;
    
    return {
      formatted: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      isOverdue
    };
  };

  const dateInfo = formatDate(task.due_date);

  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        console.log('🎯 Drag started for task:', task.title);
        console.log('Event target:', e.target);
        console.log('DataTransfer supported:', !!e.dataTransfer);
        onDragStart(e, task);
      }}
      onDragEnd={(e) => {
        console.log('🏁 Drag ended for task:', task.title);
        onDragEnd(e);
      }}
      onMouseDown={(e) => {
        console.log('🖱️ Mouse down on task:', task.title);
      }}
      className="group relative bg-card border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1 active:scale-95"
      style={{ userSelect: 'none' }}
    >
      {/* Header with Category and Priority */}
      <div className="flex items-center justify-between mb-3">
        {task.category && (
          <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
        )}
        {task.priority && (
          <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        )}
      </div>

      {/* Task Title */}
      <h4 className="font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        {/* Due Date */}
        <div className={`flex items-center space-x-1 ${dateInfo.isOverdue ? 'text-red-400' : 'text-muted-foreground'}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">{dateInfo.formatted}</span>
          {dateInfo.isOverdue && (
            <span className="text-red-400 font-semibold">• Overdue</span>
          )}
        </div>

        {/* Assignee */}
        {task.assignee && (
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
              <span className="text-xs font-semibold text-primary uppercase">
                {task.assignee.charAt(0)}
              </span>
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
  );
};