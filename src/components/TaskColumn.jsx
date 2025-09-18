import React from 'react';
import { TaskCard } from './TaskCard';

/**
 * TaskColumn component for displaying a column of tasks in the Kanban board
 * @param {Object} props
 * @param {import('../types/task').Column} props.column - Column data with tasks
 * @param {Object} props.provided - React Beautiful DND provided props
 * @param {boolean} props.isDraggedOver - Whether column is being dragged over
 * @returns {JSX.Element}
 */
export const TaskColumn = ({ column, provided, isDraggedOver }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">{column.title}</h3>
        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {column.tasks.length}
        </span>
      </div>

      {/* Droppable Area */}
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`space-y-3 min-h-[400px] transition-all duration-200 ${
          isDraggedOver ? 'bg-muted/30 rounded-lg p-2' : ''
        }`}
      >
        {column.tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
        {provided.placeholder}
        
        {column.tasks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};