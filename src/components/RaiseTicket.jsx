import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Ticket, 
  Send, 
  Paperclip, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  User,
  Mail,
  Phone,
  Upload,
  X,
  Search,
  Filter
} from 'lucide-react';

const RaiseTicket = () => {
  const [activeTab, setActiveTab] = useState('raise');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    contactEmail: '',
    contactPhone: '',
    attachments: []
  });
  const [submittedTickets, setSubmittedTickets] = useState([
    {
      id: 'TKT-2024-001',
      subject: 'AI Assistant not understanding Tamil language queries about hostel booking',
      category: 'Language Support Issues',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
      assignee: 'Technical Support Team'
    },
    {
      id: 'TKT-2024-002',
      subject: 'Unable to get information about scholarship eligibility criteria',
      category: 'Fee Payment & Scholarship Issues',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      assignee: 'Admissions Team'
    },
    {
      id: 'TKT-2024-003',
      subject: 'Need transcript for job application - urgent request',
      category: 'Academic Records & Transcripts',
      priority: 'urgent',
      status: 'open',
      createdAt: '2024-01-08T11:00:00Z',
      updatedAt: '2024-01-08T11:00:00Z',
      assignee: 'Academic Office'
    },
    {
      id: 'TKT-2024-004',
      subject: 'Hostel room allocation issue for new semester',
      category: 'Hostel & Accommodation',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-01-05T14:20:00Z',
      updatedAt: '2024-01-07T09:15:00Z',
      assignee: 'Hostel Management'
    },
    {
      id: 'TKT-2024-005',
      subject: 'Exam hall ticket not received for upcoming semester exams',
      category: 'Exam Schedules & Results',
      priority: 'urgent',
      status: 'resolved',
      createdAt: '2024-01-03T16:45:00Z',
      updatedAt: '2024-01-04T10:30:00Z',
      assignee: 'Examination Cell'
    },
    {
      id: 'TKT-2024-006',
      subject: 'Campus shuttle timings not provided correctly by AI assistant',
      category: 'Transportation & Shuttle Services',
      priority: 'low',
      status: 'closed',
      createdAt: '2023-12-28T08:00:00Z',
      updatedAt: '2023-12-30T15:30:00Z',
      assignee: 'Transport Department'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Admission Queries & Process',
    'Course Information & Requirements',
    'Fee Payment & Scholarship Issues',
    'Academic Records & Transcripts',
    'Hostel & Accommodation',
    'Exam Schedules & Results',
    'Language Support Issues',
    'AI Assistant Not Understanding',
    'Technical Issues (Login/Access)',
    'Campus Facilities & Services',
    'Placement & Career Guidance',
    'Student ID & Document Issues',
    'Library & Learning Resources',
    'Transportation & Shuttle Services',
    'Medical & Health Services',
    'Grievance & Complaint',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { value: 'medium', label: 'Medium', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { value: 'high', label: 'High', color: 'text-red-600 bg-red-50 border-red-200' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-700 bg-red-100 border-red-300' }
  ];

  const statuses = [
    { value: 'open', label: 'Open', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { value: 'in-progress', label: 'In Progress', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { value: 'resolved', label: 'Resolved', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { value: 'closed', label: 'Closed', color: 'text-gray-600 bg-gray-50 border-gray-200' }
  ];

  const handleInputChange = (field, value) => {
    setTicketForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      file: file
    }));
    
    setTicketForm(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (attachmentId) => {
    setTicketForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        id: `TKT-2024-${String(submittedTickets.length + 4).padStart(3, '0')}`,
        subject: ticketForm.subject,
        category: ticketForm.category,
        priority: ticketForm.priority,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignee: 'Student Services Team'
      };
      
      setSubmittedTickets(prev => [newTicket, ...prev]);
      setTicketForm({
        subject: '',
        category: '',
        priority: 'medium',
        description: '',
        contactEmail: '',
        contactPhone: '',
        attachments: []
      });
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const getPriorityColor = (priority) => {
    return priorities.find(p => p.value === priority)?.color || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusColor = (status) => {
    return statuses.find(s => s.value === status)?.color || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredTickets = submittedTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderRaiseTicketForm = () => (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Ticket className="w-5 h-5 text-primary" />
            Raise a Support Ticket
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Having trouble with admissions, courses, fees, or other campus services? Submit your query and our support team will assist you promptly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <Input
                  value={ticketForm.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief description of the issue"
                  className="bg-background border-border/30 text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Priority *
              </label>
              <div className="flex gap-3">
                {priorities.map((priority) => (
                  <label
                    key={priority.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={ticketForm.priority === priority.value}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="sr-only"
                    />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      ticketForm.priority === priority.value 
                        ? priority.color + ' ring-2 ring-offset-2 ring-primary/20'
                        : 'text-muted-foreground bg-muted border-border hover:bg-muted/80'
                    }`}>
                      {priority.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={ticketForm.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="your.email@institution.edu"
                    className="pl-10 bg-background border-border/30 text-foreground"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={ticketForm.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+91-98765-43210"
                    className="pl-10 bg-background border-border/30 text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Detailed Description *
              </label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Please provide detailed information about your query. For example: What specific information do you need? What steps did you already try? Include any relevant dates, ID numbers, or course details..."
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
                rows={6}
                required
              />
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-border/30 rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  PNG, JPG, PDF, DOC up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload').click()}
                  className="bg-background border-border/30 text-foreground hover:bg-muted/50"
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>

              {/* Display uploaded files */}
              {ticketForm.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {ticketForm.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                    >
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {attachment.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(attachment.size)})
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {showSuccess && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Ticket submitted successfully!</span>
            </div>
            <p className="text-sm text-emerald-700 mt-1">
              We'll get back to you within 24 hours. You can track your ticket status in the "My Tickets" tab.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderMyTickets = () => (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Ticket className="w-5 h-5 text-primary" />
            My Support Tickets
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Track and manage your submitted support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tickets by ID, subject, or category..."
                className="pl-10 bg-background border-border/30 text-foreground"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30 min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-8">
                <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No tickets found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'You haven\'t submitted any tickets yet'
                  }
                </p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="border-border/30 bg-card hover:bg-muted/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Ticket className="w-4 h-4" />
                            {ticket.id}
                          </span>
                          <span>{ticket.category}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {ticket.assignee}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        <div>Created: {formatDate(ticket.createdAt)}</div>
                        <div>Updated: {formatDate(ticket.updatedAt)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Cosmic particle effect (background dots) */}
      <div className="absolute top-0 left-0 w-full h-full cosmic-grid opacity-20 z-0"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full">
        <div className="w-full h-full opacity-5 bg-primary blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Support Center</h1>
          <p className="text-muted-foreground">
            Get help with admissions, academics, campus life, and student services
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted/30 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('raise')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'raise'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Raise a Ticket
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tickets'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              My Tickets ({submittedTickets.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'raise' ? renderRaiseTicketForm() : renderMyTickets()}
      </div>
    </div>
  );
};

export default RaiseTicket;