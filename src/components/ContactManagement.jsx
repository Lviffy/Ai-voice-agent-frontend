import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Search, UserPlus, Edit, Trash2, Phone, Mail, Users } from 'lucide-react'
import { institutionContactService } from '../services/institutionContactService'
import { useToast } from './toast/toast'
import { useInstitution } from '../contexts/InstitutionContext'

const ContactManagement = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingContact, setIsAddingContact] = useState(false)
  const { institutionId } = useInstitution()
  const { toast } = useToast()

  const [newContact, setNewContact] = useState({
    full_name: '',
    designation: '',
    email: '',
    phone_number: '',
    alternate_email: '',
    institution_id: '',
  })

  useEffect(() => {
    if (institutionId) {
      console.log('Institution ID found:', institutionId)
      fetchContacts()
      setNewContact((prev) => ({ ...prev, institution_id: institutionId }))
    } else {
      console.log('No institution ID found')
      setLoading(false)
    }
  }, [institutionId])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      if (!institutionId) {
        toast.error('Institution ID not found')
        return
      }

      console.log('Fetching contacts for institution:', institutionId)
      const response = await institutionContactService.getContactsByInstitution(institutionId)
      console.log('Contacts response:', response)
      setContacts(response || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to fetch contacts: ' + (error.message || 'Unknown error'))
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      (contact.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.phone_number || '').includes(searchTerm)
    return matchesSearch
  })

  const handleAddContact = async () => {
    if (!newContact.full_name || !newContact.email || !newContact.designation) {
      toast.warning('Please fill in all required fields')
      return
    }

    if (!institutionId) {
      toast.error('Institution ID not found')
      return
    }

    try {
      console.log('Creating contact with data:', { ...newContact, institution_id: institutionId })
      const contactData = {
        ...newContact,
        institution_id: institutionId,
      }

      const response = await institutionContactService.createContact(contactData)
      console.log('Contact created:', response)

      setContacts([...contacts, response])
      setNewContact({
        full_name: '',
        designation: '',
        email: '',
        phone_number: '',
        alternate_email: '',
        institution_id: institutionId,
      })
      setIsAddingContact(false)
      toast.success('Contact added successfully')
    } catch (error) {
      console.error('Error creating contact:', error)
      toast.error('Failed to add contact: ' + (error.message || 'Unknown error'))
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      await institutionContactService.deleteContact(contactId)
      setContacts(contacts.filter((contact) => contact.contact_id !== contactId))
      toast.success('Contact deleted successfully')
    } catch (error) {
      console.error('Error deleting contact:', error)
      if (error.status === 404) {
        toast.error('Contact not found')
      } else if (error.status === 400) {
        toast.error('Cannot delete contact: ' + error.message)
      } else {
        toast.error('Failed to delete contact: ' + (error.message || 'Unknown error'))
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show error if no institution ID
  if (!institutionId) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Institution not found</h3>
            <p>Please ensure you have a valid institution setup.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Contact Management</h2>
          <p className="text-muted-foreground">Manage institution contacts</p>
        </div>
        <Button onClick={() => setIsAddingContact(true)} className="bg-primary text-primary-foreground hover:bg-primary/80">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Contact
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-6 bg-card border border-border/20 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search contacts by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-foreground placeholder:text-muted-foreground transition-colors"
          />
        </div>
      </Card>

      {/* Add New Contact Form */}
      {isAddingContact && (
        <Card className="p-6 bg-card border border-border/20 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Add New Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name *</label>
              <input
                type="text"
                value={newContact.full_name}
                onChange={(e) => setNewContact({ ...newContact, full_name: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Designation *</label>
              <input
                type="text"
                value={newContact.designation}
                onChange={(e) => setNewContact({ ...newContact, designation: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="e.g., Vice Principal, IT Director"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Email *</label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                value={newContact.phone_number}
                onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter phone number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Alternate Email</label>
              <input
                type="email"
                value={newContact.alternate_email}
                onChange={(e) => setNewContact({ ...newContact, alternate_email: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter alternate email (optional)"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <Button onClick={handleAddContact} className="bg-primary text-primary-foreground hover:bg-primary/80">
              Add Contact
            </Button>
            <Button variant="outline" onClick={() => setIsAddingContact(false)} className="border-border/30">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Empty State or Contacts List */}
      {contacts.length === 0 && !isAddingContact ? (
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No contacts yet</h3>
            <p>Add your first contact to start managing institution contacts.</p>
            <Button onClick={() => setIsAddingContact(true)} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80">
              <UserPlus className="w-4 h-4 mr-2" />
              Add First Contact
            </Button>
          </div>
        </Card>
      ) : (
        contacts.length > 0 && (
          <Card className="bg-card border border-border/20 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Information</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border/20">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.contact_id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{(contact.full_name || 'C').charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">{contact.full_name || 'Unknown Contact'}</div>
                            <div className="text-xs text-muted-foreground">{contact.designation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-foreground">{contact.email}</span>
                          </div>
                          {contact.phone_number && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-foreground">{contact.phone_number}</span>
                            </div>
                          )}
                          {contact.alternate_email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{contact.alternate_email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="p-2">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteContact(contact.contact_id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{contacts.length}</div>
              <div className="text-sm text-muted-foreground">Total Contacts</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{contacts.filter((c) => c.alternate_email).length}</div>
              <div className="text-sm text-muted-foreground">With Alternate Email</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ContactManagement
