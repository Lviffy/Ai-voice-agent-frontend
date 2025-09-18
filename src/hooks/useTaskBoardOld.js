import { useState } from 'react';

const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Design landing page',
        description: 'Create wireframes and mockups for the landing page',
        status: 'todo',
      },
      {
        id: '2',
        title: 'Set up project structure',
        description: 'Initialize the project with proper folder structure',
        status: 'todo',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Implement authentication',
        description: 'Add user login and registration functionality',
        status: 'in-progress',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: '4',
        title: 'Code review',
        description: 'Review pull requests and provide feedback',
        status: 'review',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '5',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        status: 'done',
      },
    ],
  },
];

export import { useState, useEffect } from 'react';

/**
 * Custom hook for managing task board state and drag-drop operations
 * @param {string} [userId] - Optional user ID to filter tasks
 * @returns {Object} Task board state and handlers
 */
export const useTaskBoard = (userId = null) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with your API calls
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Replace with your API call
        const mockTasks = [
          {
            id: '1',
            title: 'Setup Voice Agent Configuration',
            description: 'Configure voice agent settings for new user onboarding',
            status: 'todo',
            priority: 'high',
            assignee: 'rahul',
            due_date: '2025-09-25',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '1'
          },
          {
            id: '2',
            title: 'Review Call Transcripts',
            description: 'Analyze conversation quality and identify improvement areas',
            status: 'in-progress',
            priority: 'medium',
            assignee: 'priya',
            due_date: '2025-09-30',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '2'
          },
          {
            id: '3',
            title: 'Update FAQ Database',
            description: 'Add new frequently asked questions from recent calls',
            status: 'in-review',
            priority: 'low',
            assignee: 'amit',
            due_date: '2025-10-05',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '3'
          },
          {
            id: '4',
            title: 'Generate Monthly Report',
            description: 'Compile voice agent performance metrics for September',
            status: 'completed',
            priority: 'medium',
            assignee: 'sunita',
            due_date: '2025-09-20',
            created_at: '2025-09-15',
            updated_at: '2025-09-19',
            user_id: '4'
          },
          {
            id: '5',
            title: 'Optimize Response Times',
            description: 'Improve AI response latency for better user experience',
            status: 'todo',
            priority: 'high',
            assignee: 'arjun',
            due_date: '2025-09-28',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '5'
          },
          {
            id: '6',
            title: 'Train Voice Model',
            description: 'Retrain voice recognition for better accent handling',
            status: 'in-progress',
            priority: 'high',
            assignee: 'rahul',
            due_date: '2025-10-01',
            created_at: '2025-09-17',
            updated_at: '2025-09-18',
            user_id: '1'
          }
        ];
        
        // Filter tasks by user if userId is provided
        const filteredTasks = userId 
          ? mockTasks.filter(task => task.user_id === userId)
          : mockTasks;
        
        setTasks(filteredTasks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  // Column definitions
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: tasks.filter(task => task.status === 'todo')
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: tasks.filter(task => task.status === 'in-progress')
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: tasks.filter(task => task.status === 'in-review')
    },
    {
      id: 'completed',
      title: 'Completed',
      tasks: tasks.filter(task => task.status === 'completed')
    }
  ];

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    const newStatus = destination.droppableId;
    
    // Optimistic update
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === draggableId
          ? { ...t, status: newStatus, updated_at: new Date().toISOString() }
          : t
      )
    );

    try {
      // Replace with your API call to update task status
      await updateTaskStatus(draggableId, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert on error
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === draggableId
            ? { ...t, status: task.status }
            : t
        )
      );
    }
  };

  // Add new task
  const addTask = async (newTask) => {
    const task = {
      ...newTask,
      id: `${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: userId || '1'
    };

    setTasks(prevTasks => [...prevTasks, task]);

    try {
      // Replace with your API call
      await createTask(task);
    } catch (error) {
      console.error('Error creating task:', error);
      // Revert on error
      setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const originalTasks = tasks;
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));

    try {
      // Replace with your API call
      await removeTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Revert on error
      setTasks(originalTasks);
    }
  };

  return {
    columns,
    tasks,
    handleDragEnd,
    addTask,
    deleteTask,
    isLoading
  };
};

// Mock API functions - replace with your actual API
const updateTaskStatus = async (taskId, status) => {
  console.log(`Updating task ${taskId} to status ${status}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

const createTask = async (task) => {
  console.log('Creating task:', task);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

const removeTask = async (taskId) => {
  console.log(`Deleting task ${taskId}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};