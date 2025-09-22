import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, MessageSquare, Mic, MicOff, Send, Settings, User, Phone, Zap, Activity, Clock, CheckCircle, Volume2 } from 'lucide-react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio, useConnectionState, useDataChannel } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useConnection } from '../hooks/useConnection';
import { useToast } from './toast/ToasterProvider';
import Playground from './playground/Playground';

const VoiceAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  // Use the existing connection hook
  const { wsUrl, token, connect, disconnect, shouldConnect } = useConnection();
  const { setToastMessage } = useToast();

  const assistantInfo = {
    name: 'University Assistant',
    avatar: 'AI'
  };

  // Determine connection status based on LiveKit connection
  const getAssistantStatus = () => {
    if (!wsUrl || !token) return 'offline';
    if (shouldConnect && wsUrl && token) return 'online';
    return 'offline';
  };

  const assistantStatus = getAssistantStatus();

  // Sample assistant metrics for dashboard consistency
  const assistantMetrics = {
    totalInteractions: 1240,
    avgResponseTime: '1.8s',
    accuracyRate: 94.2,
    uptime: 99.7,
    activeNow: assistantStatus === 'online'
  };

  // Metric Card component matching the dashboard style
  const MetricCard = ({ title, value, icon: Icon, color = "primary", subtitle }) => (
    <Card className="border-border/30 bg-card hover:bg-muted/20 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${color === 'online' ? 'green' : color}/10`}>
            <Icon className={`w-5 h-5 text-${color === 'online' ? 'green-600' : 'primary'}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate assistant response (you can integrate with actual AI service here)
      setTimeout(() => {
        const assistantResponse = {
          id: Date.now() + 1,
          text: 'I\'m currently offline. Please try again later.',
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition API
    console.log(isListening ? 'Stopped listening' : 'Started listening');
  };

  const connectAssistant = async () => {
    try {
      await connect('env');
      setShowPlayground(true);
      setToastMessage({
        type: 'success',
        message: 'Connected to voice assistant!'
      });
    } catch (error) {
      setToastMessage({
        type: 'error',
        message: `Failed to connect: ${error.message}`
      });
    }
  };

  const disconnectAssistant = async () => {
    try {
      await disconnect();
      setShowPlayground(false);
      setToastMessage({
        type: 'success',
        message: 'Disconnected from voice assistant'
      });
    } catch (error) {
      setToastMessage({
        type: 'error',
        message: `Failed to disconnect: ${error.message}`
      });
    }
  };

  const handleConnect = async (shouldConnect) => {
    if (shouldConnect) {
      await connect('env');
    } else {
      await disconnect();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      {/* Header Section - Consistent with other dashboard sections */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Voice Assistant</h2>
          <p className="text-muted-foreground">Interactive AI assistant for voice conversations and support</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button 
            variant={assistantStatus === 'online' ? "destructive" : "default"}
            onClick={assistantStatus === 'offline' ? connectAssistant : disconnectAssistant}
            className={`${
              assistantStatus === 'online' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-primary text-primary-foreground hover:bg-primary/80'
            }`}
          >
            {assistantStatus === 'online' ? (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Disconnect
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Connect Assistant
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status and Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Assistant Status"
          value={assistantStatus === 'online' ? 'Online' : 'Offline'}
          icon={assistantStatus === 'online' ? CheckCircle : X}
          color={assistantStatus === 'online' ? 'online' : 'gray'}
          subtitle={assistantStatus === 'online' ? 'Ready to help' : 'Click connect to start'}
        />
        <MetricCard
          title="Total Interactions"
          value={assistantMetrics.totalInteractions.toLocaleString()}
          icon={MessageSquare}
          subtitle="All time conversations"
        />
        <MetricCard
          title="Response Time"
          value={assistantMetrics.avgResponseTime}
          icon={Clock}
          subtitle="Average response time"
        />
        <MetricCard
          title="Accuracy Rate"
          value={`${assistantMetrics.accuracyRate}%`}
          icon={Activity}
          subtitle="Voice recognition accuracy"
        />
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="border-border/20 bg-card shadow-sm h-[600px] flex flex-col">
            <CardHeader className="border-b border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {assistantInfo.avatar}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{assistantInfo.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        assistantStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <CardDescription>
                        {assistantStatus === 'online' ? 'Assistant is online and ready' : 'Assistant is offline'}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {showPlayground && wsUrl && token ? (
              // LiveKit Room with Playground
              <CardContent className="flex-1 p-0">
                <LiveKitRoom 
                  serverUrl={wsUrl} 
                  token={token} 
                  connect={shouldConnect} 
                  className="w-full h-full"
                >
                  <Playground onConnect={handleConnect} onClose={() => setShowPlayground(false)} />
                  <RoomAudioRenderer />
                  <StartAudio label="Click to enable audio playback" />
                </LiveKitRoom>
              </CardContent>
            ) : (
              // Offline/Chat UI
              <>
                <CardContent className="flex-1 p-6 overflow-y-auto">
                  {assistantStatus === 'offline' && messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Assistant Offline</h3>
                      <p className="text-muted-foreground mb-4 max-w-sm">
                        Connect to the voice assistant to start having conversations and get instant support.
                      </p>
                      <Button onClick={connectAssistant} className="bg-primary text-primary-foreground hover:bg-primary/80">
                        <Zap className="w-4 h-4 mr-2" />
                        Connect Now
                      </Button>
                    </div>
                  )}

                  {messages.length > 0 && (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                {/* Input Area */}
                <div className="border-t border-border/20 p-4 bg-muted/20">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      onClick={toggleListening}
                      className="flex-shrink-0"
                      disabled={assistantStatus === 'offline'}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message or use voice..."
                        className="w-full px-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-foreground placeholder:text-muted-foreground transition-colors"
                        disabled={assistantStatus === 'offline'}
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || assistantStatus === 'offline'}
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Sidebar - Assistant Info and Quick Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-border/20 bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Assistant Performance</CardTitle>
              <CardDescription>Real-time assistant metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-medium text-foreground">{assistantMetrics.uptime}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Voice Quality</span>
                <span className="text-sm font-medium text-foreground">Excellent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Languages</span>
                <span className="text-sm font-medium text-foreground">4 Supported</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/20 bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" disabled={assistantStatus === 'offline'}>
                <Volume2 className="w-4 h-4 mr-2" />
                Test Voice Quality
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled={assistantStatus === 'offline'}>
                <Settings className="w-4 h-4 mr-2" />
                Assistant Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;