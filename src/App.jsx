import React, { useState } from 'react'
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import ProblemStatement from './components/ProblemStatement.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import ValueProposition from './components/ValueProposition.jsx'
import Features from './components/Features.jsx'
import Pricing from './components/Pricing.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Dashboard from './components/Dashboard.jsx'
import Playground from './components/playground/Playground.jsx'
import { PlaygroundToast } from './components/toast/PlaygroundToast.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { ConfigProvider } from './hooks/useConfig.jsx'
import { ConnectionProvider, useConnection } from './hooks/useConnection.jsx'
import { ToastProvider } from './components/toast/ToasterProvider.jsx'
import '@livekit/components-styles'

const VoiceAssistantModal = ({ isOpen, onClose }) => {
  const { wsUrl, token, connect, disconnect } = useConnection()

  const handleConnect = async (shouldConnect) => {
    if (shouldConnect) {
      await connect('env')
    } else {
      await disconnect()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-6xl h-[90vh] rounded-lg overflow-hidden shadow-2xl">
        <LiveKitRoom serverUrl={wsUrl} token={token} connect={true} className="w-full h-full">
          <Playground onConnect={handleConnect} onClose={onClose} />
          <RoomAudioRenderer />
          <StartAudio label="Click to enable audio playback" />
        </LiveKitRoom>
      </div>
      <PlaygroundToast />
    </div>
  )
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false)

  const handleLogin = (credentials) => {
    setIsAuthenticated(true)
    setCurrentPage('dashboard')
  }

  const handleSignUp = (userData) => {
    setIsAuthenticated(true)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage('home')
  }

  const LandingPage = () => (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onLoginClick={() => setCurrentPage('login')} />
      <main>
        <HeroSection onVoiceAssistantClick={() => setShowVoiceAssistant(true)} />
        <ProblemStatement />
        <Features />
        <HowItWorks />
        <ValueProposition />
        <Pricing />
      </main>
      <Footer />
      <VoiceAssistantModal isOpen={showVoiceAssistant} onClose={() => setShowVoiceAssistant(false)} />
    </div>
  )

  return (
    <ThemeProvider>
      <ToastProvider>
        <ConfigProvider>
          <ConnectionProvider>
            {currentPage === 'dashboard' && isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : currentPage === 'login' ? (
              <Login onBackToHome={() => setCurrentPage('home')} onSwitchToSignUp={() => setCurrentPage('signup')} onLogin={handleLogin} />
            ) : currentPage === 'signup' ? (
              <SignUp onBackToHome={() => setCurrentPage('home')} onSwitchToLogin={() => setCurrentPage('login')} onSignUp={handleSignUp} />
            ) : (
              <LandingPage />
            )}
          </ConnectionProvider>
        </ConfigProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
