import { useState, useEffect } from 'react';

/**
 * Custom hook for managing task board state and drag-drop operations
 * @param {string} [userId] - Optional user ID to filter tasks
 * @returns {Object} Task board state and handlers
 */
export const useTaskBoard = (userId = null) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState(null);

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
            title: 'Design new landing page',
            description: 'Create a modern and responsive landing page for the product',
            status: 'todo',
            category: 'Design',
            priority: 'high',
            assignee: 'rahul',
            due_date: '2025-09-25',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '1'
          },
          {
            id: '2',
            title: 'Implement user authentication',
            description: 'Set up login and registration system',
            status: 'in-progress',
            category: 'Development',
            priority: 'medium',
            assignee: 'priya',
            due_date: '2025-09-30',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '2'
          },
          {
            id: '3',
            title: 'Write API documentation',
            description: 'Document all API endpoints with examples',
            status: 'completed',
            category: 'Documentation',
            priority: 'low',
            assignee: 'amit',
            due_date: '2025-10-05',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '3'
          },
          {
            id: '4',
            title: 'Setup development environment',
            description: 'Configure local development setup for new team members',
            status: 'todo',
            category: 'Development',
            priority: 'medium',
            assignee: 'sunita',
            due_date: '2025-09-20',
            created_at: '2025-09-15',
            updated_at: '2025-09-19',
            user_id: '4'
          },
          {
            id: '5',
            title: 'Review wireframes',
            description: 'Review and approve new wireframes for user dashboard',
            status: 'in-review',
            category: 'Design',
            priority: 'high',
            assignee: 'arjun',
            due_date: '2025-09-28',
            created_at: '2025-09-18',
            updated_at: '2025-09-18',
            user_id: '5'
          },
          {
            id: '6',
            title: 'Database optimization',
            description: 'Optimize database queries for better performance',
            status: 'in-progress',
            category: 'Development',
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

  // HTML5 Drag and Drop Handlers
  const handleTaskDragStart = (e, task) => {
    console.log('Drag started for task:', task.title);
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    
    // Add some visual feedback
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleTaskDragEnd = (e) => {
    console.log('Drag ended');
    e.target.style.opacity = '1';
    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e) => {
    // Only reset if we're leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDraggedOverColumn(null);
    }
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    console.log('Drop event for column:', columnId, 'with task:', draggedTask?.title);
    
    if (!draggedTask) {
      console.log('No dragged task found');
      return;
    }

    if (draggedTask.status === columnId) {
      console.log('Task already in this column');
      return;
    }

    console.log(`Moving task ${draggedTask.title} from ${draggedTask.status} to ${columnId}`);

    // Update task status
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTask.id
          ? { ...task, status: columnId, updated_at: new Date().toISOString() }
          : task
      )
    );

    // Here you would typically make an API call to update the task
    updateTaskStatus(draggedTask.id, columnId);
    
    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus, updated_at: new Date().toISOString() }
          : task
      )
    );

    // API call would go here
    updateTaskStatus(taskId, newStatus);
  };

  // Mock API functions - replace with real API calls
  const updateTaskStatus = async (taskId, newStatus) => {
    // Simulate API call
    console.log(`Updating task ${taskId} to status ${newStatus}`);
    return new Promise(resolve => setTimeout(resolve, 100));
  };

  const createTask = async (task) => {
    // Simulate API call
    console.log('Creating task:', task);
    return new Promise(resolve => setTimeout(resolve, 100));
  };

  const removeTask = async (taskId) => {
    // Simulate API call
    console.log(`Removing task ${taskId}`);
    return new Promise(resolve => setTimeout(resolve, 100));
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
    isLoading,
    draggedTask,
    draggedOverColumn,
    handleTaskDragStart,
    handleTaskDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleStatusChange,
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