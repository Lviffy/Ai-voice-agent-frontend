/**
 * @typedef {'todo' | 'in-progress' | 'in-review' | 'completed'} TaskStatus
 */

/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task
 * @property {string} title - Task title
 * @property {string} [description] - Optional task description
 * @property {TaskStatus} status - Current status of the task
 * @property {'low' | 'medium' | 'high'} priority - Task priority level
 * @property {string} [assignee] - Optional assignee username
 * @property {string} [due_date] - Optional due date in ISO format
 * @property {string} created_at - Creation timestamp in ISO format
 * @property {string} updated_at - Last update timestamp in ISO format
 */

/**
 * @typedef {Object} Column
 * @property {TaskStatus} id - Column identifier
 * @property {string} title - Column display title
 * @property {Task[]} tasks - Array of tasks in this column
 */

export {};