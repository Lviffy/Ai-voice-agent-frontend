import React from 'react'
import { useToast as usePlaygroundToast } from './ToasterProvider'

export const useToast = () => {
  const { setToastMessage } = usePlaygroundToast()

  const toast = {
    success: (message, options = {}) => {
      const fullMessage = options.title ? `${options.title}: ${message}` : message
      setToastMessage({ message: fullMessage, type: 'success' })
    },
    error: (message, options = {}) => {
      const fullMessage = options.title ? `${options.title}: ${message}` : message
      setToastMessage({ message: fullMessage, type: 'error' })
    },
    warning: (message, options = {}) => {
      const fullMessage = options.title ? `${options.title}: ${message}` : message
      setToastMessage({ message: fullMessage, type: 'warning' })
    },
    info: (message, options = {}) => {
      const fullMessage = options.title ? `${options.title}: ${message}` : message
      setToastMessage({ message: fullMessage, type: 'info' })
    },
  }

  return { toast }
}
