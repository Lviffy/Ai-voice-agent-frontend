import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Plus, Search, Edit, Trash2, Languages, BarChart3, Save, X } from 'lucide-react'
import { useToast } from './toast/toast'
import { faqService } from '../services/faqService'
import { useInstitution } from '../contexts/InstitutionContext'

const FAQManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [editingFAQ, setEditingFAQ] = useState(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { institutionId } = useInstitution()

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'admission', label: 'Admission' },
    { value: 'scholarship', label: 'Scholarship' },
    { value: 'fees', label: 'Fees' },
    { value: 'timetable', label: 'Timetable' },
    { value: 'facilities', label: 'Facilities' },
  ]

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali']

  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    category: 'admission',
    language: 'English',
    institution_id: '',
  })

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      if (!institutionId) {
        toast.error('Institution ID not found')
        return
      }

      const response = await faqService.getFAQsByInstitution(institutionId)
      setFaqs(response || [])
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      toast.error('Failed to fetch FAQs')
      setFaqs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (institutionId) {
      fetchFAQs()
      setNewFAQ((prev) => ({ ...prev, institution_id: institutionId }))
    } else {
      setLoading(false)
    }
  }, [institutionId])

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = (faq.question || '').toLowerCase().includes(searchTerm.toLowerCase()) || (faq.answer || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category) => {
    const colors = {
      admission: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400',
      scholarship: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400',
      fees: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-400',
      timetable: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-400',
      facilities: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-400',
    }
    return colors[category] || 'bg-muted text-muted-foreground'
  }

  const handleSaveNew = async () => {
    if (!newFAQ.question || !newFAQ.answer) {
      toast.warning('Please fill in both question and answer')
      return
    }

    if (!institutionId) {
      toast.error('Institution ID not found')
      return
    }

    try {
      console.log('Creating FAQ with data:', { ...newFAQ, institution_id: institutionId })
      const faqData = {
        ...newFAQ,
        institution_id: institutionId,
      }

      const response = await faqService.createFAQ(faqData)
      console.log('FAQ created:', response)

      setFaqs([...faqs, response])
      setNewFAQ({
        question: '',
        answer: '',
        category: 'admission',
        language: 'English',
        institution_id: institutionId,
      })
      setIsAddingNew(false)
      toast.success('FAQ added successfully')
    } catch (error) {
      console.error('Error creating FAQ:', error)
      toast.error('Failed to add FAQ: ' + (error.message || 'Unknown error'))
    }
  }

  const handleEdit = (faq) => {
    setEditingFAQ({ ...faq })
  }

  const handleSaveEdit = async () => {
    try {
      const response = await faqService.updateFAQ(editingFAQ.faq_id, editingFAQ)
      setFaqs(faqs.map((faq) => (faq.faq_id === editingFAQ.faq_id ? response : faq)))
      setEditingFAQ(null)
      toast.success('FAQ updated successfully')
    } catch (error) {
      console.error('Error updating FAQ:', error)
      toast.error(error.message || 'Failed to update FAQ')
    }
  }

  const handleDelete = async (faqId) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      await faqService.deleteFAQ(faqId)
      setFaqs(faqs.filter((faq) => faq.faq_id !== faqId))
      toast.success('FAQ deleted successfully')
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      toast.error(error.message || 'Failed to delete FAQ')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!institutionId) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
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
        <h2 className="text-2xl font-bold text-foreground">FAQ Management</h2>
        <Button onClick={() => setIsAddingNew(true)} className="bg-primary text-primary-foreground hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" />
          Add New FAQ
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="p-6 bg-card border border-border/20 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-foreground placeholder:text-muted-foreground transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-background border border-border/30 rounded-lg focus:ring-2 focus:ring-primary/20 text-foreground min-w-[160px]"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Add New FAQ Form */}
      {isAddingNew && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Add New FAQ</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={newFAQ.category}
                  onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                <select
                  value={newFAQ.language}
                  onChange={(e) => setNewFAQ({ ...newFAQ, language: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Question</label>
              <input
                type="text"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                placeholder="Enter the question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Answer</label>
              <textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                placeholder="Enter the answer..."
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSaveNew} className="bg-green-600 text-white hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={() => setIsAddingNew(false)} variant="outline" className="border-border/30">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Empty State or FAQ List */}
      {faqs.length === 0 && !isAddingNew ? (
        <Card className="p-12 text-center">
          <div className="text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No FAQs yet</h3>
            <p>Create your first FAQ to help users get instant answers to common questions.</p>
            <Button onClick={() => setIsAddingNew(true)} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80">
              <Plus className="w-4 h-4 mr-2" />
              Create First FAQ
            </Button>
          </div>
        </Card>
      ) : (
        faqs.length > 0 && (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.faq_id} className="p-6">
                {editingFAQ && editingFAQ.faq_id === faq.faq_id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                        <select
                          value={editingFAQ.category}
                          onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                        >
                          {categories.slice(1).map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                        <select
                          value={editingFAQ.language}
                          onChange={(e) => setEditingFAQ({ ...editingFAQ, language: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                        >
                          {languages.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Question</label>
                      <input
                        type="text"
                        value={editingFAQ.question}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Answer</label>
                      <textarea
                        value={editingFAQ.answer}
                        onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveEdit} className="bg-green-600 text-white hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={() => setEditingFAQ(null)} variant="outline" className="border-border/30">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(faq.category)}`}>{faq.category}</span>
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-muted/60 text-muted-foreground rounded-full">
                            <Languages className="w-3 h-3 mr-1" />
                            {faq.language}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            {faq.usage_count || 0} uses
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(faq)} className="p-2 text-primary hover:bg-primary/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(faq.faq_id)} className="p-2 text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last updated: {faq.updated_at || faq.created_at}</span>
                      <span>Confidence: {((faq.confidence || 0) * 100).toFixed(0)}%</span>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        )
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{faqs.length}</div>
          <div className="text-sm text-muted-foreground">Total FAQs</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{new Set(faqs.map((f) => f.language)).size}</div>
          <div className="text-sm text-muted-foreground">Languages</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">{faqs.reduce((sum, f) => sum + (f.usage_count || 0), 0)}</div>
          <div className="text-sm text-muted-foreground">Total Usage</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">{faqs.length > 0 ? ((faqs.reduce((sum, f) => sum + (f.confidence || 0), 0) / faqs.length) * 100).toFixed(0) : '0'}%</div>
          <div className="text-sm text-muted-foreground">Avg Confidence</div>
        </Card>
      </div>
    </div>
  )
}

export default FAQManagement
