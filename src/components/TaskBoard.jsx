import React from 'react';
import { TaskColumn } from './TaskColumn';
import { Skeleton } from '@/components/ui/skeleton';
import { useTaskBoard } from '@/hooks/useTaskBoard';

/**
 * TaskBoard component - Main Kanban board with HTML5 drag and drop functionality
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element}
 */
const TaskBoard = ({ className = "" }) => {
  const {
    columns,
    isLoading,
    handleTaskDragStart,
    handleTaskDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleStatusChange,
  } = useTaskBoard();

  if (isLoading) {
    return (
        <div className={`flex gap-6 overflow-x-auto pb-6 px-2 ${className}`}>
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col w-80 min-w-80 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 space-y-4 shadow-lg">
                    <Skeleton className="h-7 w-2/3 rounded-lg" />
                    <div className="space-y-3">
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-36 w-full rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className={`flex gap-6 overflow-x-auto pb-6 px-2 ${className}`}>
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragEnd={handleTaskDragEnd}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskBoard;