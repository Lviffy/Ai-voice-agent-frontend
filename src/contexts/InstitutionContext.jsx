import React, { createContext, useContext, useState } from 'react'

const InstitutionContext = createContext()

export const InstitutionProvider = ({ children }) => {
  // Initialize with null if localStorage value is invalid
  const getStoredInstitutionId = () => {
    const stored = localStorage.getItem('institutionId')
    if (stored && stored !== 'null' && stored !== 'undefined' && stored.trim() !== '') {
      return stored
    }
    return null
  }

  const getStoredAdminId = () => {
    const stored = localStorage.getItem('adminId')
    if (stored && stored !== 'null' && stored !== 'undefined' && stored.trim() !== '') {
      return stored
    }
    return null
  }

  const [institutionId, setInstitutionId] = useState(getStoredInstitutionId())
  const [adminId, setAdminId] = useState(getStoredAdminId())
  const [needsInstitutionSetup, setNeedsInstitutionSetup] = useState(false)

  const updateInstitution = (newInstitutionId) => {
    // Only set if it's a valid value
    if (newInstitutionId && newInstitutionId !== 'null' && newInstitutionId !== 'undefined' && newInstitutionId.trim() !== '') {
      setInstitutionId(newInstitutionId)
      setNeedsInstitutionSetup(false)
      localStorage.setItem('institutionId', newInstitutionId)
    } else {
      setInstitutionId(null)
      setNeedsInstitutionSetup(true)
      localStorage.removeItem('institutionId')
    }
  }

  const updateAdmin = (newAdminId) => {
    if (newAdminId && newAdminId !== 'null' && newAdminId !== 'undefined' && newAdminId.trim() !== '') {
      setAdminId(newAdminId)
      localStorage.setItem('adminId', newAdminId)
    } else {
      setAdminId(null)
      localStorage.removeItem('adminId')
    }
  }

  const clearAll = () => {
    setInstitutionId(null)
    setAdminId(null)
    setNeedsInstitutionSetup(false)
    localStorage.removeItem('institutionId')
    localStorage.removeItem('adminId')
  }

  return (
    <InstitutionContext.Provider
      value={{
        institutionId,
        adminId,
        needsInstitutionSetup,
        setInstitutionId: updateInstitution,
        setAdminId: updateAdmin,
        setNeedsInstitutionSetup,
        clearAll,
      }}
    >
      {children}
    </InstitutionContext.Provider>
  )
}

export const useInstitution = () => {
  const context = useContext(InstitutionContext)
  if (!context) {
    throw new Error('useInstitution must be used within InstitutionProvider')
  }
  return context
}
