import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

/**
 * TaskCard component for displaying individual tasks in the Kanban board
 * @param {Object} props
 * @param {import('../types/task').Task} props.task - Task data
 * @param {number} props.index - Task index in the column
 * @returns {JSX.Element}
 */
export const TaskCard = ({ task, index }) => {
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'design':
        return 'bg-purple-500/20 text-purple-400';
      case 'development':
        return 'bg-primary/20 text-primary';
      case 'documentation':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-secondary rounded-lg border border-border p-4 cursor-move transition-all duration-200
            hover:border-border/50 hover:shadow-lg
            ${snapshot.isDragging ? 'shadow-xl scale-105 rotate-1' : ''}
          `}
        >
          {/* Category Tag */}
          {task.category && (
            <div className="mb-3">
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                {task.category}
              </span>
            </div>
          )}

          {/* Task Title */}
          <h4 className="font-medium text-foreground mb-2 leading-relaxed">
            {task.title}
          </h4>

          {/* Task Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {task.description}
            </p>
          )}

          {/* Footer with date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(task.due_date)}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};