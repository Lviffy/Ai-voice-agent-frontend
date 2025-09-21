import React, { createContext, useState } from 'react'

const ToastContext = createContext(undefined)

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null)

  return (
    <ToastContext.Provider
      value={{
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
