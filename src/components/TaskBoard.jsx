import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TaskColumn } from './TaskColumn';
import { useTaskBoard } from '../hooks/useTaskBoard';
import { Skeleton } from './ui/skeleton';

/**
 * TaskBoard component - Main Kanban board with drag and drop functionality
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.userId] - Optional user ID to filter tasks
 * @param {Function} [props.onBack] - Callback for back navigation
 * @returns {JSX.Element}
 */
export const TaskBoard = ({ className = "", userId = null, onBack }) => {
  const { columns, handleDragEnd, isLoading } = useTaskBoard(userId);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Board Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
          {/* Analytics Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = columns.find(col => col.id === 'completed')?.tasks.length || 0;
  const inProgressTasks = columns.find(col => col.id === 'in-progress')?.tasks.length || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const overdueTasks = 0; // TODO: Calculate based on due dates

  return (
    <div className={`bg-background min-h-screen px-6 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Demo Team's Board</h1>
          <p className="text-muted-foreground">Manage all your team project tasks in one place.</p>
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <TaskColumn
                    column={column}
                    provided={provided}
                    isDraggedOver={snapshot.isDraggedOver}
                  />
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {/* Analytics Overview */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Tasks */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{totalTasks}</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Completed</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{completedTasks}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{inProgressTasks}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Overdue</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{overdueTasks}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Overview */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">📈 Progress Overview</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="text-foreground">{completionRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">To Do</span>
                  <span className="text-foreground">{columns.find(col => col.id === 'todo')?.tasks.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">In Progress</span>
                  <span className="text-foreground">{inProgressTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Completed</span>
                  <span className="text-foreground">{completedTasks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-foreground text-sm">Design new landing page</p>
                  <p className="text-muted-foreground text-xs">9/18/2025</p>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">todo</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-foreground text-sm">Implement user authentication</p>
                  <p className="text-muted-foreground text-xs">9/18/2025</p>
                </div>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">in progress</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-foreground text-sm">Write API documentation</p>
                  <p className="text-muted-foreground text-xs">9/18/2025</p>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};