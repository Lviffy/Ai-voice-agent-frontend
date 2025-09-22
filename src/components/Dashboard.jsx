import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { BarChart3, MessageSquare, Clock, Heart, AlertTriangle, Paperclip, Brain, Play, Users, Settings, BookOpen, HelpCircle, LogOut, Menu, X, Phone, Sun, Moon } from 'lucide-react';
import ConversationLogs from './ConversationLogs';
import FAQManagement from './FAQManagement';
import UserManagement from './UserManagement';
import TaskBoard from './TaskBoard';
import SettingsComponent from './Settings';
import Logo from './Logo';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  // Sample data matching the image
  const dashboardData = {
    messages: {
      arjunCodess: 1850,
      unknownContact: 1452
    },
    responseTime: {
      unknownContact: '12m',
      arjunCodess: '41m'
    },
    interestLevel: {
      unknownContact: 45,
      arjunCodess: 85
    },
    redFlags: [
      'Significant imbalance in emotional investment.',
      'History of conflict and unresolved issues.',
      'Delayed response times from one party.'
    ],
    attachmentStyles: {
      unknownContact: { type: 'Avoidant', description: 'Difficulty with emotional intimacy and maintaining distance.', emoji: '🔶' },
      arjunCodess: { type: 'Anxious', description: 'Seeking constant reassurance and worry about rejection.', emoji: '😟' }
    },
    topWords: [
      { word: 'h', arjun: 386, unknown: 257, you: 189 },
      { word: 'i', arjun: 360, unknown: 237, me: 184 },
      { word: 'to', arjun: 305, unknown: 230, nahi: 180 },
      { word: 'hai', arjun: 287, unknown: 203, toh: 176 }
    ]
  };

  const sidebarItems = [
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'conversations', icon: MessageSquare, label: 'Conversation Logs' },
    { id: 'faq', icon: BookOpen, label: 'FAQ Management' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'support', icon: HelpCircle, label: 'Support' }
  ];

  const MetricCard = ({ title, children, className = "" }) => (
    <Card className={`p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wide">{title}</h3>
      {children}
    </Card>
  );

  const CircularProgress = ({ percentage, color = "primary" }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-primary"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">{percentage}%</span>
        </div>
      </div>
    );
  };

  const renderAnalyticsContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Voice Agent Analytics</h1>
          <p className="text-muted-foreground">Analysis from 5/6/2025, 10:15:18 AM</p>
          <p className="text-muted-foreground">Voice Call Session</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-border">
            Back
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
            Copy Link
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 border-b border-border">
        {['Overview', 'Call Analytics', 'Response Times', 'Activity Patterns', 'Voice Quality', 'Sentiment Analysis', 'AI Insights'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-1 border-b-2 transition-colors ${tab === 'Overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Messages Count */}
        <MetricCard title="Voice interactions">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">ArjunCodess</span>
              <span className="text-3xl font-bold text-foreground">{dashboardData.messages.arjunCodess.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">UnknownContact</span>
              <span className="text-3xl font-bold text-foreground">{dashboardData.messages.unknownContact.toLocaleString()}</span>
            </div>
          </div>
        </MetricCard>

        {/* Average Response Time */}
        <MetricCard title="Average response time">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">UnknownContact</span>
              <span className="text-3xl font-bold text-foreground">{dashboardData.responseTime.unknownContact}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">ArjunCodess</span>
              <span className="text-3xl font-bold text-foreground">{dashboardData.responseTime.arjunCodess}</span>
            </div>
          </div>
        </MetricCard>

        {/* Interest Level */}
        <MetricCard title="Interest level">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <span className="block text-sm font-medium text-muted-foreground mb-3">UnknownContact</span>
              <CircularProgress percentage={dashboardData.interestLevel.unknownContact} />
            </div>
            <div className="text-center">
              <span className="block text-sm font-medium text-muted-foreground mb-3">ArjunCodess</span>
              <CircularProgress percentage={dashboardData.interestLevel.arjunCodess} />
            </div>
          </div>
        </MetricCard>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Red Flags */}
        <MetricCard title="Red Flags" className="border-destructive/30">
          <div className="space-y-3">
            {dashboardData.redFlags.map((flag, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">{flag}</span>
              </div>
            ))}
            <button className="text-destructive text-sm hover:underline font-medium">+1 more red flags</button>
          </div>
        </MetricCard>

        {/* Attachment Styles */}
        <MetricCard title="Attachment Styles">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-3xl mb-2">{dashboardData.attachmentStyles.unknownContact.emoji}</div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{dashboardData.attachmentStyles.unknownContact.type}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{dashboardData.attachmentStyles.unknownContact.description}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-3xl mb-2">{dashboardData.attachmentStyles.arjunCodess.emoji}</div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{dashboardData.attachmentStyles.arjunCodess.type}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{dashboardData.attachmentStyles.arjunCodess.description}</p>
            </div>
          </div>
        </MetricCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Words */}
        <MetricCard title="Top words">
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border pb-2">
              <span>Word</span>
              <span>Arjun</span>
              <span>Unknown</span>
              <span>Other</span>
            </div>
            {dashboardData.topWords.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 text-sm py-2 hover:bg-muted/30 rounded-md px-2 -mx-2 transition-colors">
                <span className="font-medium text-foreground">{item.word}</span>
                <span className="text-foreground font-semibold">{item.arjun}</span>
                <span className="text-muted-foreground">{item.unknown}</span>
                <span className="text-muted-foreground">{item.you}</span>
              </div>
            ))}
          </div>
        </MetricCard>

        {/* Key Highlights */}
        <MetricCard title="Key Highlights">
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border/30 hover:border-border/60 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground text-sm">Personality Insights</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Based on communication patterns and word usage analysis</p>
            </div>
            <div className="p-4 rounded-lg border border-border/30 hover:border-border/60 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground text-sm">Voice Quality Analysis</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Audio clarity, speech patterns, and conversation flow metrics</p>
            </div>
          </div>
        </MetricCard>
      </div>
    </div>
  );

  const handleOpenKanban = (user) => {
    setSelectedUser(user);
    setActiveSection('kanban');
  };

  const handleBackFromKanban = () => {
    setSelectedUser(null);
    setActiveSection('users');
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'analytics':
        return renderAnalyticsContent();
      case 'conversations':
        return <ConversationLogs />;
      case 'faq':
        return <FAQManagement />;
      case 'users':
        return <UserManagement onOpenKanban={handleOpenKanban} />;
      case 'kanban':
        return <TaskBoard userId={selectedUser?.id?.toString()} onBack={handleBackFromKanban} />;
      case 'settings':
        return <SettingsComponent />;
      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Support</h2>
            <Card className="p-6 bg-card border-border">
              <p className="text-muted-foreground">Get help, submit tickets, and access customer support resources.</p>
            </Card>
          </div>
        );
      default:
        return renderAnalyticsContent();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Cosmic particle effect (background dots) */}
      <div className="absolute top-0 left-0 w-full h-full cosmic-grid opacity-20 z-0"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full">
        <div className="w-full h-full opacity-5 bg-primary blur-[100px]"></div>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border transition-all duration-300 relative z-10`}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Logo />
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold text-foreground">AI Voice Agent</h2>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-6 bg-card border border-border rounded-full w-6 h-6 p-0"
          >
            {sidebarOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-muted transition-colors ${
                  activeSection === item.id ? 'bg-muted border-r-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-border">
          <Button 
            variant="ghost"
            onClick={onLogout}
            className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-muted-foreground hover:text-foreground hover:bg-muted`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        {/* Top Bar */}
        <div className="bg-card border-b border-border p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-foreground capitalize">
                {activeSection === 'faq' ? 'FAQ Management' : 
                 activeSection === 'kanban' ? `Task Board - ${selectedUser?.name}` : 
                 activeSection}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center gap-2 rounded-full px-3 py-2 bg-card border border-border">
                <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                <Switch
                  checked={!isDarkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">AD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={activeSection === 'kanban' || activeSection === 'settings' ? '' : 'p-8'}>
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;