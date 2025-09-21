import React, { useState } from 'react';
import { TaskCard } from './TaskCard';

/**
 * TaskColumn component for displaying a column of tasks in the Kanban board
 * @param {Object} props
 * @param {import('../types/task').Column} props.column - Column data with tasks
 * @param {Function} props.onDrop - Drop handler
 * @param {Function} props.onDragOver - Drag over handler
 * @param {Function} props.onDragLeave - Drag leave handler
 * @param {Function} props.onTaskDragStart - Task drag start handler
 * @param {Function} props.onTaskDragEnd - Task drag end handler
 * @param {Function} props.onStatusChange - Status change handler
 * @returns {JSX.Element}
 */
export const TaskColumn = ({ 
  column, 
  onDrop, 
  onDragOver, 
  onDragLeave, 
  onTaskDragStart, 
  onTaskDragEnd, 
  onStatusChange 
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    console.log('🎯 Drag enter column:', column.title);
    setIsDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Only reset if we're leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log('👋 Drag leave column:', column.title);
      setIsDraggedOver(false);
      onDragLeave(e);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log('🎉 Drop in column:', column.title);
    setIsDraggedOver(false);
    onDrop(e, column.id);
  };
  const getColumnHeaderColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'in-review':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      default:
        return 'text-foreground bg-muted border-border';
    }
  };

  return (
    <div className="w-80 min-w-80 flex flex-col">
      {/* Column Header */}
      <div className={`rounded-xl border p-4 mb-4 backdrop-blur-sm transition-all duration-200 ${getColumnHeaderColor(column.id)}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{column.title}</h3>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-current/20 text-current">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex-1 min-h-[500px] rounded-xl bg-card/50 backdrop-blur-sm border transition-all duration-300 p-4 ${
          isDraggedOver 
            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
            : 'border-border/50 hover:bg-card/70 hover:border-border'
        }`}
      >
        <div className="space-y-3">
          {column.tasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              index={index}
              onDragStart={onTaskDragStart}
              onDragEnd={onTaskDragEnd}
              onStatusChange={onStatusChange}
            />
          ))}
          
          {column.tasks.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 opacity-20">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-medium">No tasks</p>
              <p className="text-xs mt-1 opacity-70">Drag tasks here or create new ones</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};