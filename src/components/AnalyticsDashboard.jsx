import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  CheckCircle, 
  Phone, 
  MessageSquare, 
  Volume2, 
  Heart, 
  Brain, 
  Download, 
  RefreshCw,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
  Mic,
  Globe,
  Target,
  Activity,
  Zap,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Smile,
  Frown,
  Meh,
  Star,
  PlayCircle,
  PauseCircle,
  Settings,
  Eye
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample data for analytics
  const analyticsData = {
    overview: {
      totalConversations: { value: 2450, change: 12.5, trend: 'up' },
      activeUsers: { value: 1850, change: -2.1, trend: 'down' },
      avgResponseTime: { value: '2.3s', change: -15.2, trend: 'up' },
      resolutionRate: { value: 87.5, change: 3.2, trend: 'up' },
      languageDistribution: {
        English: 45,
        Hindi: 30,
        Tamil: 15,
        Telugu: 10
      },
      queryTypes: [
        { type: 'Admissions', count: 856, percentage: 35 },
        { type: 'Fees & Scholarships', count: 612, percentage: 25 },
        { type: 'Course Information', count: 490, percentage: 20 },
        { type: 'Exam & Results', count: 367, percentage: 15 },
        { type: 'Other', count: 125, percentage: 5 }
      ]
    },
    callAnalytics: {
      totalCalls: { value: 1240, change: 8.7, trend: 'up' },
      avgCallDuration: { value: '4m 32s', change: 12.3, trend: 'up' },
      callSuccessRate: { value: 94.2, change: 2.1, trend: 'up' },
      voiceAccuracy: { value: 91.8, change: 4.5, trend: 'up' }
    },
    responseTimes: {
      avgResponseTime: { value: '2.3s', change: -15.2, trend: 'up' },
      slaCompliance: { value: 92.4, change: 5.1, trend: 'up' },
      peakResponseTime: { value: '3.8s', change: -8.7, trend: 'up' },
      fastestCategory: 'General Info'
    },
    activityPatterns: {
      peakHour: '10:00 AM',
      peakDay: 'Monday',
      avgSessionLength: '3m 45s',
      returnUserRate: 68.3
    },
    voiceQuality: {
      audioQuality: { value: 89.2, change: 2.3, trend: 'up' },
      speechAccuracy: { value: 91.8, change: 4.5, trend: 'up' },
      backgroundNoise: { value: 12.4, change: -3.2, trend: 'up' },
      callClarity: { value: 94.1, change: 1.8, trend: 'up' }
    },
    sentiment: {
      positive: 68.3,
      neutral: 24.1,
      negative: 7.6,
      avgSatisfaction: 4.2,
      nps: 42
    },
    aiInsights: {
      intentAccuracy: { value: 94.7, change: 3.1, trend: 'up' },
      entityExtraction: { value: 89.3, change: 2.8, trend: 'up' },
      contextUnderstanding: { value: 87.1, change: 5.2, trend: 'up' },
      learningRate: { value: 12.4, change: 8.9, trend: 'up' }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'call-analytics', label: 'Call Analytics', icon: Phone },
    { id: 'response-times', label: 'Response Times', icon: Clock },
    { id: 'activity-patterns', label: 'Activity Patterns', icon: Activity },
    { id: 'voice-quality', label: 'Voice Quality', icon: Mic },
    { id: 'sentiment-analysis', label: 'Sentiment Analysis', icon: Heart },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain }
  ];

  const MetricCard = ({ title, value, change, trend, icon: Icon, subtitle, color = "primary" }) => (
    <Card className="border-border/30 bg-card hover:bg-muted/20 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${color}/10`}>
              <Icon className={`w-5 h-5 text-${color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {change && (
            <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, children, description }) => (
    <Card className="border-border/30 bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  const ProgressBar = ({ percentage, color = "primary", label }) => (
    <div className="space-y-2">
      {label && <div className="flex justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>}
      <div className="w-full bg-muted dark:bg-white rounded-full h-2">
        <div 
          className="bg-white dark:bg-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Conversations"
          value="2,450"
          change={analyticsData.overview.totalConversations.change}
          trend={analyticsData.overview.totalConversations.trend}
          icon={MessageSquare}
          subtitle="This week"
        />
        <MetricCard
          title="Active Users"
          value="1,850"
          change={analyticsData.overview.activeUsers.change}
          trend={analyticsData.overview.activeUsers.trend}
          icon={Users}
          subtitle="Currently online: 124"
        />
        <MetricCard
          title="Avg Response Time"
          value="2.3s"
          change={analyticsData.overview.avgResponseTime.change}
          trend={analyticsData.overview.avgResponseTime.trend}
          icon={Clock}
          subtitle="Target: <3s"
        />
        <MetricCard
          title="Resolution Rate"
          value="87.5%"
          change={analyticsData.overview.resolutionRate.change}
          trend={analyticsData.overview.resolutionRate.trend}
          icon={CheckCircle}
          subtitle="Without human help"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Language Distribution" description="Conversations by language preference">
          <div className="space-y-4">
            {Object.entries(analyticsData.overview.languageDistribution).map(([lang, percentage]) => (
              <ProgressBar key={lang} label={lang} percentage={percentage} />
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Query Categories" description="Most common inquiry types">
          <div className="space-y-4">
            {analyticsData.overview.queryTypes.map((query, index) => (
              <div key={query.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary" style={{ 
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                  }} />
                  <span className="text-sm font-medium text-foreground">{query.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">{query.count}</span>
                  <span className="text-xs text-muted-foreground ml-2">({query.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Additional Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Peak Usage</h3>
            <p className="text-2xl font-bold text-foreground">10:00 AM</p>
            <p className="text-sm text-muted-foreground">Monday mornings</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6 text-center">
            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Coverage</h3>
            <p className="text-2xl font-bold text-foreground">4</p>
            <p className="text-sm text-muted-foreground">Languages supported</p>
          </CardContent>
        </Card>
        
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Accuracy</h3>
            <p className="text-2xl font-bold text-foreground">94.7%</p>
            <p className="text-sm text-muted-foreground">Intent recognition</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCallAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Voice Calls"
          value="1,240"
          change={analyticsData.callAnalytics.totalCalls.change}
          trend={analyticsData.callAnalytics.totalCalls.trend}
          icon={Phone}
          subtitle="This week"
        />
        <MetricCard
          title="Avg Call Duration"
          value="4m 32s"
          change={analyticsData.callAnalytics.avgCallDuration.change}
          trend={analyticsData.callAnalytics.avgCallDuration.trend}
          icon={Clock}
          subtitle="Per conversation"
        />
        <MetricCard
          title="Call Success Rate"
          value="94.2%"
          change={analyticsData.callAnalytics.callSuccessRate.change}
          trend={analyticsData.callAnalytics.callSuccessRate.trend}
          icon={CheckCircle}
          subtitle="Completed calls"
        />
        <MetricCard
          title="Voice Accuracy"
          value="91.8%"
          change={analyticsData.callAnalytics.voiceAccuracy.change}
          trend={analyticsData.callAnalytics.voiceAccuracy.trend}
          icon={Mic}
          subtitle="Speech recognition"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Call Volume by Hour" description="Peak calling hours analysis">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">9:00 AM - 12:00 PM</span>
              <span className="font-medium text-foreground">Peak Hours</span>
            </div>
            <ProgressBar percentage={85} label="Morning (9-12)" />
            <ProgressBar percentage={65} label="Afternoon (12-5)" />
            <ProgressBar percentage={35} label="Evening (5-8)" />
            <ProgressBar percentage={15} label="Night (8-9)" />
          </div>
        </ChartCard>

        <ChartCard title="Call Categories" description="Distribution by inquiry type">
          <div className="space-y-4">
            {[
              { category: 'Admission Queries', percentage: 38, calls: 471 },
              { category: 'Fee Information', percentage: 28, calls: 347 },
              { category: 'Course Details', percentage: 22, calls: 273 },
              { category: 'Other', percentage: 12, calls: 149 }
            ].map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.category}</span>
                  <span className="text-muted-foreground">{item.calls} calls</span>
                </div>
                <ProgressBar percentage={item.percentage} />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-foreground">Audio Quality</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Excellent</span>
                <span className="text-sm font-medium text-foreground">72%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Good</span>
                <span className="text-sm font-medium text-foreground">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fair</span>
                <span className="text-sm font-medium text-foreground">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <PlayCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-foreground">Call Flow</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-sm font-medium text-foreground">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transferred</span>
                <span className="text-sm font-medium text-foreground">3.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dropped</span>
                <span className="text-sm font-medium text-foreground">2.0%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-foreground">Language Usage</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">English</span>
                <span className="text-sm font-medium text-foreground">48%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hindi</span>
                <span className="text-sm font-medium text-foreground">32%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tamil</span>
                <span className="text-sm font-medium text-foreground">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResponseTimes = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average Response"
          value="2.3s"
          change={-15.2}
          trend="up"
          icon={Zap}
          subtitle="All queries"
        />
        <MetricCard
          title="SLA Compliance"
          value="92.4%"
          change={5.1}
          trend="up"
          icon={Target}
          subtitle="Within 3 seconds"
        />
        <MetricCard
          title="Peak Response"
          value="3.8s"
          change={-8.7}
          trend="up"
          icon={TrendingUp}
          subtitle="During high traffic"
        />
        <MetricCard
          title="Fastest Category"
          value="General Info"
          icon={CheckCircle}
          subtitle="1.2s average"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Response Time by Category" description="Performance across different query types">
          <div className="space-y-4">
            {[
              { category: 'General Information', time: '1.2s', status: 'excellent' },
              { category: 'Fee Inquiries', time: '2.1s', status: 'good' },
              { category: 'Admission Process', time: '2.8s', status: 'good' },
              { category: 'Course Details', time: '3.2s', status: 'fair' },
              { category: 'Complex Queries', time: '4.5s', status: 'needs-improvement' }
            ].map((item) => (
              <div key={item.category} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'excellent' ? 'bg-emerald-500' :
                    item.status === 'good' ? 'bg-blue-500' :
                    item.status === 'fair' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm font-medium text-foreground">{item.category}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Performance Trends" description="Response time improvements over time">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="text-sm font-medium text-emerald-600">15.2% faster</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="text-sm font-medium text-emerald-600">22.8% faster</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Quarter</span>
              <span className="text-sm font-medium text-emerald-600">31.5% faster</span>
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">SLA Target Met</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">92.4% of queries answered within 3 seconds</p>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Fastest Hour</h3>
            <p className="text-2xl font-bold text-foreground">11:00 AM</p>
            <p className="text-sm text-muted-foreground">Average: 1.8s</p>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Peak Load</h3>
            <p className="text-2xl font-bold text-foreground">2:00 PM</p>
            <p className="text-sm text-muted-foreground">Average: 4.2s</p>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-foreground">Best Performance</h3>
            <p className="text-2xl font-bold text-foreground">Weekend</p>
            <p className="text-sm text-muted-foreground">Average: 1.9s</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderActivityPatterns = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Peak Usage Hour"
          value="10:00 AM"
          icon={Clock}
          subtitle="Monday mornings"
        />
        <MetricCard
          title="Avg Session Length"
          value="3m 45s"
          icon={Activity}
          subtitle="Per user session"
        />
        <MetricCard
          title="Return User Rate"
          value="68.3%"
          change={4.2}
          trend="up"
          icon={Users}
          subtitle="Come back within 7 days"
        />
        <MetricCard
          title="Multi-Channel Users"
          value="34.7%"
          icon={MessageSquare}
          subtitle="Use multiple channels"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Usage Patterns by Day" description="Weekly activity distribution">
          <div className="space-y-3">
            {[
              { day: 'Monday', percentage: 89, sessions: 445 },
              { day: 'Tuesday', percentage: 76, sessions: 380 },
              { day: 'Wednesday', percentage: 82, sessions: 410 },
              { day: 'Thursday', percentage: 79, sessions: 395 },
              { day: 'Friday', percentage: 71, sessions: 355 },
              { day: 'Saturday', percentage: 45, sessions: 225 },
              { day: 'Sunday', percentage: 38, sessions: 190 }
            ].map((item) => (
              <div key={item.day} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.day}</span>
                  <span className="text-muted-foreground">{item.sessions} sessions</span>
                </div>
                <ProgressBar percentage={item.percentage} />
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Query Resolution Time" description="Time taken to resolve different query types">
          <div className="space-y-4">
            {[
              { category: 'General Information', time: '1.2s', growth: -8.3 },
              { category: 'Admission Process', time: '2.8s', growth: 12.1 },
              { category: 'Fee Inquiries', time: '3.5s', growth: -5.2 }
            ].map((item) => (
              <div key={item.category} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{item.category}</span>
                  <div className="flex items-center space-x-1">
                    {item.growth < 0 ? 
                      <ArrowDown className="w-4 h-4 text-emerald-600" /> : 
                      <ArrowUp className="w-4 h-4 text-red-600" />
                    }
                    <span className={`text-sm font-medium ${
                      item.growth < 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {Math.abs(item.growth)}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{item.time}</div>
                <div className="text-xs text-muted-foreground">Average response time</div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="User Journey Analysis" description="Common interaction paths">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <p className="font-medium text-foreground">Initial Query</p>
                <p className="text-sm text-muted-foreground">95% start with admission info</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <p className="font-medium text-foreground">Follow-up Questions</p>
                <p className="text-sm text-muted-foreground">68% ask about fees next</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <p className="font-medium text-foreground">Session End</p>
                <p className="text-sm text-muted-foreground">87% complete successfully</p>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Geographic Distribution" description="Usage by location">
          <div className="space-y-4">
            {[
              { location: 'Tamil Nadu', percentage: 45, users: 833 },
              { location: 'Karnataka', percentage: 28, users: 518 },
              { location: 'Andhra Pradesh', percentage: 15, users: 278 },
              { location: 'Kerala', percentage: 12, users: 222 }
            ].map((item) => (
              <div key={item.location} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.location}</span>
                  <span className="text-muted-foreground">{item.users} users</span>
                </div>
                <ProgressBar percentage={item.percentage} />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );

  const renderVoiceQuality = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Audio Quality"
          value="89.2%"
          change={2.3}
          trend="up"
          icon={Volume2}
          subtitle="Overall score"
        />
        <MetricCard
          title="Speech Accuracy"
          value="91.8%"
          change={4.5}
          trend="up"
          icon={Mic}
          subtitle="Recognition rate"
        />
        <MetricCard
          title="Background Noise"
          value="12.4%"
          change={-3.2}
          trend="up"
          icon={AlertTriangle}
          subtitle="Noise interference"
        />
        <MetricCard
          title="Call Clarity"
          value="94.1%"
          change={1.8}
          trend="up"
          icon={CheckCircle}
          subtitle="Clear conversations"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Audio Quality Distribution" description="Call quality breakdown">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                <span className="font-medium text-foreground">Excellent</span>
              </div>
              <span className="text-foreground font-semibold">72%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                <span className="font-medium text-foreground">Good</span>
              </div>
              <span className="text-foreground font-semibold">23%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                <span className="font-medium text-foreground">Fair</span>
              </div>
              <span className="text-foreground font-semibold">5%</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Speech Recognition by Language" description="Accuracy across supported languages">
          <div className="space-y-4">
            {[
              { language: 'English', accuracy: 94.2, improvement: 2.1 },
              { language: 'Hindi', accuracy: 91.8, improvement: 4.5 },
              { language: 'Tamil', accuracy: 88.7, improvement: 6.2 },
              { language: 'Telugu', accuracy: 87.3, improvement: 5.8 }
            ].map((item) => (
              <div key={item.language} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.language}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-foreground">{item.accuracy}%</span>
                    <span className="text-emerald-600 text-xs">+{item.improvement}%</span>
                  </div>
                </div>
                <ProgressBar percentage={item.accuracy} />
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-foreground">Processing Speed</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">0.8s</div>
              <div className="text-sm text-muted-foreground">Speech-to-text</div>
              <div className="mt-2 text-xs text-emerald-600">12% faster this week</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-foreground">Technical Quality</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bitrate</span>
                <span className="text-foreground">128 kbps avg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Latency</span>
                <span className="text-foreground">45ms avg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Packet Loss</span>
                <span className="text-foreground">0.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-foreground">Quality Trends</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-sm text-emerald-600">+2.3%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-sm text-emerald-600">+5.7%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Quarter</span>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="w-3 h-3 text-emerald-600" />
                  <span className="text-sm text-emerald-600">+8.9%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSentimentAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall Satisfaction"
          value="4.2/5"
          change={3.2}
          trend="up"
          icon={Star}
          subtitle="Average rating"
        />
        <MetricCard
          title="Positive Sentiment"
          value="68.3%"
          change={5.1}
          trend="up"
          icon={ThumbsUp}
          subtitle="Happy interactions"
        />
        <MetricCard
          title="NPS Score"
          value="42"
          change={8.7}
          trend="up"
          icon={Heart}
          subtitle="Net Promoter Score"
        />
        <MetricCard
          title="Issue Resolution"
          value="87.5%"
          change={4.3}
          trend="up"
          icon={CheckCircle}
          subtitle="First contact resolution"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Sentiment Distribution" description="Overall emotional response analysis">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smile className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Positive</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">68.3%</span>
                <div className="text-xs text-muted-foreground">1,670 conversations</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Meh className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Neutral</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">24.1%</span>
                <div className="text-xs text-muted-foreground">590 conversations</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Frown className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Negative</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">7.6%</span>
                <div className="text-xs text-muted-foreground">190 conversations</div>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Sentiment by Category" description="Emotional response across query types">
          <div className="space-y-4">
            {[
              { category: 'General Information', positive: 78, neutral: 18, negative: 4 },
              { category: 'Fee Inquiries', positive: 65, neutral: 28, negative: 7 },
              { category: 'Admission Process', positive: 72, neutral: 22, negative: 6 },
              { category: 'Technical Issues', positive: 45, neutral: 35, negative: 20 }
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="text-sm font-medium text-foreground">{item.category}</div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500" style={{ width: `${item.positive}%` }} />
                  <div className="bg-blue-500" style={{ width: `${item.neutral}%` }} />
                  <div className="bg-red-500" style={{ width: `${item.negative}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Positive: {item.positive}%</span>
                  <span>Negative: {item.negative}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-5 h-5 text-pink-500" />
              <h3 className="font-semibold text-foreground">Top Positive Triggers</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-foreground">Quick Response</div>
                <div className="text-muted-foreground">Fast, accurate answers</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Multilingual Support</div>
                <div className="text-muted-foreground">Native language comfort</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Complete Information</div>
                <div className="text-muted-foreground">Comprehensive responses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-foreground">Pain Points</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-foreground">Complex Procedures</div>
                <div className="text-muted-foreground">Multi-step processes</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Technical Difficulties</div>
                <div className="text-muted-foreground">System access issues</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Wait Times</div>
                <div className="text-muted-foreground">During peak hours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h3 className="font-semibold text-foreground">Improvement Trends</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="text-sm text-emerald-600 font-medium">+5.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-sm text-emerald-600 font-medium">+12.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Quarter</span>
                <span className="text-sm text-emerald-600 font-medium">+18.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Intent Accuracy"
          value="94.7%"
          change={3.1}
          trend="up"
          icon={Brain}
          subtitle="Understanding queries"
        />
        <MetricCard
          title="Entity Extraction"
          value="89.3%"
          change={2.8}
          trend="up"
          icon={Target}
          subtitle="Key information capture"
        />
        <MetricCard
          title="Context Understanding"
          value="87.1%"
          change={5.2}
          trend="up"
          icon={MessageSquare}
          subtitle="Multi-turn conversations"
        />
        <MetricCard
          title="Learning Rate"
          value="12.4%"
          change={8.9}
          trend="up"
          icon={TrendingUp}
          subtitle="Weekly improvement"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="AI Model Performance" description="Accuracy metrics across different capabilities">
          <div className="space-y-4">
            {[
              { capability: 'Intent Recognition', accuracy: 94.7, target: 95 },
              { capability: 'Entity Extraction', accuracy: 89.3, target: 90 },
              { capability: 'Context Maintenance', accuracy: 87.1, target: 85 },
              { capability: 'Response Generation', accuracy: 91.2, target: 90 },
              { capability: 'Language Detection', accuracy: 96.8, target: 95 }
            ].map((item) => (
              <div key={item.capability} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.capability}</span>
                  <span className={`${item.accuracy >= item.target ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {item.accuracy}% / {item.target}%
                  </span>
                </div>
                <div className="relative">
                  <ProgressBar percentage={(item.accuracy / item.target) * 100} />
                  <div 
                    className="absolute top-0 w-0.5 h-2 bg-gray-800 dark:bg-gray-400"
                    style={{ left: `${item.target}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Learning Analytics" description="Continuous improvement metrics">
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">New Knowledge Acquired</span>
              </div>
              <div className="text-2xl font-bold text-foreground">347</div>
              <div className="text-sm text-muted-foreground">New FAQ entries this week</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Human Corrections</span>
              </div>
              <div className="text-2xl font-bold text-foreground">23</div>
              <div className="text-sm text-muted-foreground">Applied to improve responses</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">Model Updates</span>
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Performance improvements</div>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-foreground">Multilingual Performance</h3>
            </div>
            <div className="space-y-3">
              {[
                { language: 'English', accuracy: 96.2 },
                { language: 'Hindi', accuracy: 94.7 },
                { language: 'Tamil', accuracy: 91.3 },
                { language: 'Telugu', accuracy: 89.8 }
              ].map((item) => (
                <div key={item.language} className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{item.language}</span>
                  <span className="text-sm font-medium text-foreground">{item.accuracy}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-foreground">Prediction Accuracy</h3>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">87.3%</div>
                <div className="text-sm text-muted-foreground">Next query prediction</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak time prediction</span>
                  <span className="text-foreground">92.1%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Issue escalation</span>
                  <span className="text-foreground">78.9%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-foreground">Custom Models</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-foreground">Institution-Specific</div>
                <div className="text-muted-foreground">Local context: 93.4%</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Domain Knowledge</div>
                <div className="text-muted-foreground">Education domain: 91.8%</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Personalization</div>
                <div className="text-muted-foreground">User adaptation: 85.7%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'call-analytics':
        return renderCallAnalytics();
      case 'response-times':
        return renderResponseTimes();
      case 'activity-patterns':
        return renderActivityPatterns();
      case 'voice-quality':
        return renderVoiceQuality();
      case 'sentiment-analysis':
        return renderSentimentAnalysis();
      case 'ai-insights':
        return renderAIInsights();
      default:
        return renderOverview();
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your AI Voice Agent performance
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 bg-background border border-border/30 rounded-md text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-background border-border/30 text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-muted/30 rounded-lg p-1 mb-8 overflow-x-auto">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  index > 0 ? 'ml-1' : ''
                } ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;