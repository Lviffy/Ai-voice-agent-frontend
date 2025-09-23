import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Search, UserPlus, Edit, Trash2, Phone, Mail, Calendar, Shield, MoreVertical, Users } from 'lucide-react'
import { userRoleService } from '../services/userRoleService'
import { useToast } from './toast/toast'
import { useInstitution } from '../contexts/InstitutionContext'

const UserManagement = ({ onOpenKanban }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { institutionId } = useInstitution()
  const { toast } = useToast()

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'student', label: 'Students' },
    { value: 'parent', label: 'Parents' },
    { value: 'admin', label: 'Admins' },
  ]

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    phone_number: '',
    role_name: 'student',
    institution_id: '1',
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await userRoleService.getUsersByInstitution(institutionId)
      setUsers(response)
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.phone.includes(searchTerm)
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  // Update field references in JSX to match API response

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400'
      case 'parent':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-400'
      case 'admin':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const handleAddUser = async () => {
    try {
      const response = await userRoleService.createUser({
        ...newUser,
        institution_id: institutionId,
      })
      setUsers([...users, response])
      setNewUser({ username: '', email: '', phone_number: '', role_name: 'student' })
      setIsAddingUser(false)
      toast.success('User added successfully')
    } catch (error) {
      toast.error('Failed to add user')
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage students, parents, and administrators</p>
        </div>
        <Button onClick={() => setIsAddingUser(true)} className="bg-primary text-primary-foreground hover:bg-primary/80">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="p-6 bg-card border border-border/20 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-foreground placeholder:text-muted-foreground transition-colors"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground min-w-[140px]"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Add New User Form */}
      {isAddingUser && (
        <Card className="p-6 bg-card border border-border/20 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Phone</label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Preferred Language</label>
              <select
                value={newUser.preferredLanguage}
                onChange={(e) => setNewUser({ ...newUser, preferredLanguage: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <Button onClick={handleAddUser} className="bg-primary text-primary-foreground hover:bg-primary/80">
              Add User
            </Button>
            <Button variant="outline" onClick={() => setIsAddingUser(false)} className="border-border/30">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Users List */}
      <Card className="bg-card border border-border/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role & Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Call Stats</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border/20">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>{user.role}</span>
                      <br />
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-semibold text-foreground">{user.totalCalls} calls</div>
                      <div className="text-muted-foreground">{user.avgSatisfaction > 0 ? `${user.avgSatisfaction}★ avg` : 'No ratings'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{user.preferredLanguage}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-foreground">{user.lastCall}</div>
                      <div className="text-xs text-muted-foreground">Joined: {user.joinedDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-destructive hover:text-destructive" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{users.filter((u) => u.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === 'student').length}</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border border-border/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Phone className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">{users.reduce((sum, u) => sum + u.totalCalls, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Calls</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UserManagement
