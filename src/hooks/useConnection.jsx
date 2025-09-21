import React, { createContext, useState, useCallback, useContext, useEffect } from 'react'
import { useConfig } from './useConfig'
import { useToast } from '../components/toast/ToasterProvider'

const ConnectionContext = createContext(undefined)

export const ConnectionProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    const defaultContext = {
      wsUrl: '',
      token: '',
      shouldConnect: false,
      mode: 'manual',
      connect: async () => {},
      disconnect: async () => {},
    }

    return <ConnectionContext.Provider value={defaultContext}>{children}</ConnectionContext.Provider>
  }

  return <ConnectionProviderClient>{children}</ConnectionProviderClient>
}

const ConnectionProviderClient = ({ children }) => {
  const { setToastMessage } = useToast()
  const { config } = useConfig()
  const [connectionDetails, setConnectionDetails] = useState({
    wsUrl: '',
    token: '',
    shouldConnect: false,
    mode: 'manual',
  })

  const connect = useCallback(
    async (mode) => {
      let token = ''
      let url = ''
      try {
        if (mode === 'env') {
          url = import.meta.env.VITE_LIVEKIT_URL
          if (!url) {
            throw new Error('VITE_LIVEKIT_URL is not set')
          }

          const { generateToken } = await import('../services/tokenService')
          token = await generateToken()
        } else {
          token = config.settings.token
          url = config.settings.ws_url
        }

        if (!url || !token) {
          throw new Error('Missing connection parameters')
        }

        setConnectionDetails({ wsUrl: url, token, shouldConnect: true, mode })
      } catch (error) {
        setToastMessage({
          type: 'error',
          message: `Failed to connect: ${error.message}`,
        })
      }
    },
    [config.settings.token, config.settings.ws_url, setToastMessage]
  )

  const disconnect = useCallback(async () => {
    setConnectionDetails((prev) => ({ ...prev, shouldConnect: false }))
  }, [])

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        shouldConnect: connectionDetails.shouldConnect,
        mode: connectionDetails.mode,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnection = () => {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }
  return context
}
