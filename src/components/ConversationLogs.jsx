import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Search, Calendar, Phone, Download } from 'lucide-react'
import { conversationService } from '../services/conversationService'
import { useToast } from './toast/toast'
import { useInstitution } from '../contexts/InstitutionContext'

const ConversationLogs = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const { institutionId } = useInstitution()
  const { toast } = useToast()

  const fetchConversations = async () => {
    try {
      setLoading(true)
      if (!institutionId) {
        toast.error('Institution ID not found')
        return
      }

      const response = await conversationService.getLogsByInstitution(institutionId)
      setConversations(response || [])
    } catch (error) {
      console.error('Error fetching conversations:', error)
      toast.error('Failed to fetch conversation logs')
      setConversations([]) // Set empty array as fallback
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [institutionId])

  const handleExport = async () => {
    try {
      toast.info('Export feature coming soon')
    } catch (error) {
      toast.error('Failed to export data', { title: 'Error' })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400'
      case 'Escalated':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = (conv.participant_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (conv.intent || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || conv.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  // Show empty state if no conversations
  if (!loading && conversations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Conversation Logs</h2>
          <Button onClick={fetchConversations} className="bg-primary text-primary-foreground hover:bg-primary/80">
            Refresh
          </Button>
        </div>
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p>Conversation logs will appear here once users start interacting with your AI agent.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Conversation Logs</h2>
        <Button onClick={handleExport} className="bg-primary text-primary-foreground hover:bg-primary/80">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="p-6 bg-card border border-border/20 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-foreground placeholder:text-muted-foreground transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="Resolved">Resolved</option>
              <option value="Pending">Pending</option>
              <option value="Escalated">Escalated</option>
            </select>
            <Button variant="outline" className="border-border/30 hover:border-border/60">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>
      </Card>

      {/* Conversation List */}
      <Card className="bg-card border border-border/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Participant</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Intent</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Satisfaction</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border/20">
              {filteredConversations.map((conversation) => (
                <tr key={conversation.conversation_id} className="hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{conversation.participant_name || 'Unknown'}</div>
                      <div className="text-xs text-muted-foreground mt-1">{conversation.participant_type || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{conversation.intent || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground mt-1 capitalize">General</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{conversation.duration || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(conversation.status)}`}>{conversation.status || 'Unknown'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-foreground">{conversation.satisfaction_score || 0}</span>
                      <div className="text-primary">
                        {'★'.repeat(Math.floor(conversation.satisfaction_score || 0))}
                        <span className="text-muted-foreground">{'☆'.repeat(5 - Math.floor(conversation.satisfaction_score || 0))}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-muted-foreground">{conversation.created_at}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-foreground mb-1">{conversations.length}</div>
          <div className="text-sm text-muted-foreground">Total Conversations</div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-green-600 mb-1">{conversations.filter((c) => c.status === 'Resolved').length}</div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-yellow-600 mb-1">{conversations.filter((c) => c.status === 'Pending').length}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-foreground mb-1">
            {conversations.length > 0 ? (conversations.reduce((acc, c) => acc + (c.satisfaction_score || 0), 0) / conversations.length).toFixed(1) : '0.0'}
          </div>
          <div className="text-sm text-muted-foreground">Avg Satisfaction</div>
        </Card>
      </div>
    </div>
  )
}

export default ConversationLogs
