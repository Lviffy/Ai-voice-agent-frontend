import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Search, Calendar, Phone, Download } from 'lucide-react';

const ConversationLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample conversation data
  const conversations = [
    {
      id: 1,
      participant: 'Student - Rahul Sharma',
      type: 'admission',
      language: 'English',
      timestamp: '2025-01-15 10:30:25',
      duration: '3m 45s',
      status: 'resolved',
      intent: 'Admission Requirements',
      satisfaction: 4.5
    },
    {
      id: 2,
      participant: 'Parent - Priya Patel',
      type: 'scholarship',
      language: 'Hindi',
      timestamp: '2025-01-15 09:15:12',
      duration: '2m 20s',
      status: 'escalated',
      intent: 'Scholarship Eligibility',
      satisfaction: 3.2
    },
    {
      id: 3,
      participant: 'Student - Amit Kumar',
      type: 'timetable',
      language: 'English',
      timestamp: '2025-01-15 08:45:30',
      duration: '1m 15s',
      status: 'resolved',
      intent: 'Class Schedule',
      satisfaction: 4.8
    },
    {
      id: 4,
      participant: 'Parent - Sunita Devi',
      type: 'fees',
      language: 'Tamil',
      timestamp: '2025-01-14 16:20:45',
      duration: '4m 10s',
      status: 'pending',
      intent: 'Fee Payment',
      satisfaction: 4.0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400';
      case 'escalated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.intent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || conv.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Conversation Logs</h2>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
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
              <option value="resolved">Resolved</option>
              <option value="pending">Pending</option>
              <option value="escalated">Escalated</option>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Intent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border/20">
              {filteredConversations.map((conversation) => (
                <tr key={conversation.id} className="hover:bg-muted/30 cursor-pointer transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {conversation.participant}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {conversation.language}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{conversation.intent}</div>
                    <div className="text-xs text-muted-foreground mt-1 capitalize">{conversation.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{conversation.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(conversation.status)}`}>
                      {conversation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-foreground">{conversation.satisfaction}</span>
                      <div className="text-primary">
                        {'★'.repeat(Math.floor(conversation.satisfaction))}
                        <span className="text-muted-foreground">{'☆'.repeat(5 - Math.floor(conversation.satisfaction))}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
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
          <div className="text-3xl font-bold text-green-600 mb-1">
            {conversations.filter(c => c.status === 'resolved').length}
          </div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-yellow-600 mb-1">
            {conversations.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-foreground mb-1">
            {(conversations.reduce((acc, c) => acc + c.satisfaction, 0) / conversations.length).toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">Avg Satisfaction</div>
        </Card>
      </div>
    </div>
  );
};

export default ConversationLogs;