import { useConnection } from '../hooks/useConnection'
import { useEffect } from 'react'

export const DebugConnection = () => {
  const { wsUrl, token, shouldConnect, mode } = useConnection()

  useEffect(() => {
    console.log('Connection Debug:', {
      wsUrl,
      tokenLength: token ? token.length : 0,
      shouldConnect,
      mode,
      hasToken: !!token,
      hasUrl: !!wsUrl,
    })
  }, [wsUrl, token, shouldConnect, mode])

  return null
}
