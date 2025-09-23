import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Filter, RefreshCw } from 'lucide-react'
import TaskBoard from './TaskBoard'
import { supportTicketService } from '../services/supportTicketService'
import { useToast } from './toast/toast'

const SupportTicketManagement = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const { toast } = useToast()
  const { institutionId } = useInstitution()

  // Map support ticket status to kanban status
  const mapTicketStatusToKanban = (status) => {
    switch (status) {
      case 'Open':
        return 'todo'
      case 'In Progress':
        return 'in-progress'
      case 'Under Review':
        return 'in-review'
      case 'Resolved':
      case 'Closed':
        return 'completed'
      default:
        return 'todo'
    }
  }

  // Map kanban status back to ticket status
  const mapKanbanStatusToTicket = (kanbanStatus) => {
    switch (kanbanStatus) {
      case 'todo':
        return 'Open'
      case 'in-progress':
        return 'In Progress'
      case 'in-review':
        return 'Under Review'
      case 'completed':
        return 'Resolved'
      default:
        return 'Open'
    }
  }

  // Convert support tickets to kanban task format
  const convertTicketsToTasks = (tickets) => {
    return tickets.map((ticket) => ({
      id: ticket.ticket_id,
      title: ticket.subject || 'No Subject',
      description: `Category: ${ticket.category || 'General'}\nContact: ${ticket.contact_email}`,
      status: mapTicketStatusToKanban(ticket.status),
      priority: ticket.priority?.toLowerCase() || 'medium',
      category: ticket.category,
      assignee: ticket.contact_email,
      due_date: null, // Support tickets might not have due dates
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: ticket.ticket_id,
      // Store original ticket data
      originalTicket: ticket,
    }))
  }

  const fetchTickets = async () => {
    try {
      setLoading(true)
      let response
      if (priorityFilter === 'all') {
        response = await supportTicketService.getTicketsByInstitution(institutionId)
      } else {
        response = await supportTicketService.getTicketsByPriority(priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1), institutionId)
      }
      setTickets(response)
    } catch (error) {
      toast.error('Failed to fetch support tickets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [priorityFilter])

  const handleStatusUpdate = async (taskId, newKanbanStatus) => {
    try {
      const newTicketStatus = mapKanbanStatusToTicket(newKanbanStatus)
      await supportTicketService.updateTicket(taskId, { status: newTicketStatus })

      // Update local state
      setTickets((prevTickets) => prevTickets.map((ticket) => (ticket.ticket_id === taskId ? { ...ticket, status: newTicketStatus } : ticket)))

      toast.success(`Ticket status updated to ${newTicketStatus}`)
    } catch (error) {
      toast.error('Failed to update ticket status', { title: 'Error' })
    }
  }

  // Custom hook for TaskBoard that uses support ticket data
  const useTicketBoard = () => {
    const tasks = convertTicketsToTasks(tickets)

    const columns = [
      {
        id: 'todo',
        title: 'Open',
        tasks: tasks.filter((task) => task.status === 'todo'),
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        tasks: tasks.filter((task) => task.status === 'in-progress'),
      },
      {
        id: 'in-review',
        title: 'Under Review',
        tasks: tasks.filter((task) => task.status === 'in-review'),
      },
      {
        id: 'completed',
        title: 'Resolved',
        tasks: tasks.filter((task) => task.status === 'completed'),
      },
    ]

    const handleTaskDragStart = (e, task) => {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', task.id)
    }

    const handleTaskDragEnd = (e) => {
      e.target.style.opacity = '1'
    }

    const handleDragOver = (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    }

    const handleDragLeave = (e) => {
      // Handle drag leave
    }

    const handleDrop = (e, columnId) => {
      e.preventDefault()
      const taskId = e.dataTransfer.getData('text/plain')
      handleStatusUpdate(taskId, columnId)
    }

    const handleStatusChange = (taskId, newStatus) => {
      handleStatusUpdate(taskId, newStatus)
    }

    return {
      columns,
      tasks,
      isLoading: loading,
      handleTaskDragStart,
      handleTaskDragEnd,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleStatusChange,
    }
  }

  const ticketBoardData = useTicketBoard()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Support Tickets</h2>
          <p className="text-muted-foreground">Manage and track support tickets</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchTickets} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Priority Filter */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter by Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1 bg-background border border-border/30 rounded-md text-sm focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </Card>

      {/* Kanban Board */}
      <div className="bg-card rounded-lg border border-border p-6">
        <TaskBoard customData={ticketBoardData} className="min-h-[600px]" />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-2xl font-bold text-foreground">{tickets.length}</div>
          <div className="text-sm text-muted-foreground">Total Tickets</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-blue-600">{tickets.filter((t) => t.status === 'Open').length}</div>
          <div className="text-sm text-muted-foreground">Open</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-yellow-600">{tickets.filter((t) => t.status === 'In Progress').length}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-green-600">{tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length}</div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
      </div>
    </div>
  )
}

export default SupportTicketManagement
