import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, Search, Edit, Trash2, Languages, BarChart3, Save, X } from 'lucide-react';

const FAQManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Sample FAQ data
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'What are the admission requirements for engineering courses?',
      answer: 'For engineering courses, students need to have completed 12th grade with Physics, Chemistry, and Mathematics. A minimum of 75% marks is required along with a valid JEE score.',
      category: 'admission',
      language: 'English',
      usage_count: 156,
      last_updated: '2025-01-10',
      confidence: 0.95
    },
    {
      id: 2,
      question: 'इंजीनियरिंग कोर्स के लिए प्रवेश आवश्यकताएं क्या हैं?',
      answer: 'इंजीनियरिंग कोर्स के लिए, छात्रों को भौतिकी, रसायन विज्ञान और गणित के साथ 12वीं कक्षा पूरी करनी होगी। न्यूनतम 75% अंक आवश्यक हैं और एक वैध JEE स्कोर भी चाहिए।',
      category: 'admission',
      language: 'Hindi',
      usage_count: 89,
      last_updated: '2025-01-10',
      confidence: 0.92
    },
    {
      id: 3,
      question: 'How can I apply for scholarships?',
      answer: 'Scholarships can be applied through our online portal. Merit-based scholarships are available for students with 85%+ marks. Need-based scholarships require income certificate.',
      category: 'scholarship',
      language: 'English',
      usage_count: 203,
      last_updated: '2025-01-08',
      confidence: 0.88
    },
    {
      id: 4,
      question: 'What is the fee structure for different courses?',
      answer: 'Fee structure varies by course: Engineering - ₹1,50,000/year, Management - ₹1,20,000/year, Arts - ₹60,000/year. Additional fees for hostel and other facilities apply.',
      category: 'fees',
      language: 'English',
      usage_count: 178,
      last_updated: '2025-01-12',
      confidence: 0.96
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'admission', label: 'Admission' },
    { value: 'scholarship', label: 'Scholarship' },
    { value: 'fees', label: 'Fees' },
    { value: 'timetable', label: 'Timetable' },
    { value: 'facilities', label: 'Facilities' }
  ];

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali'];

  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    category: 'admission',
    language: 'English'
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      admission: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400',
      scholarship: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400',
      fees: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-400',
      timetable: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-400',
      facilities: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-400'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const handleSaveNew = () => {
    if (newFAQ.question && newFAQ.answer) {
      const newId = Math.max(...faqs.map(f => f.id)) + 1;
      setFaqs([...faqs, {
        ...newFAQ,
        id: newId,
        usage_count: 0,
        last_updated: new Date().toISOString().split('T')[0],
        confidence: 0.9
      }]);
      setNewFAQ({ question: '', answer: '', category: 'admission', language: 'English' });
      setIsAddingNew(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFAQ({ ...faq });
  };

  const handleSaveEdit = () => {
    setFaqs(faqs.map(faq => faq.id === editingFAQ.id ? editingFAQ : faq));
    setEditingFAQ(null);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">FAQ Management</h2>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/80"
        >
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
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
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
                  onChange={(e) => setNewFAQ({...newFAQ, category: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                <select
                  value={newFAQ.language}
                  onChange={(e) => setNewFAQ({...newFAQ, language: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Question</label>
              <input
                type="text"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                placeholder="Enter the question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Answer</label>
              <textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                placeholder="Enter the answer..."
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveNew}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsAddingNew(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <Card key={faq.id} className="p-6">
            {editingFAQ && editingFAQ.id === faq.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={editingFAQ.category}
                      onChange={(e) => setEditingFAQ({...editingFAQ, category: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                    <select
                      value={editingFAQ.language}
                      onChange={(e) => setEditingFAQ({...editingFAQ, language: e.target.value})}
                      className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Question</label>
                  <input
                    type="text"
                    value={editingFAQ.question}
                    onChange={(e) => setEditingFAQ({...editingFAQ, question: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Answer</label>
                  <textarea
                    value={editingFAQ.answer}
                    onChange={(e) => setEditingFAQ({...editingFAQ, answer: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border/30 text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setEditingFAQ(null)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(faq.category)}`}>
                        {faq.category}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-muted/60 text-muted-foreground dark:bg-muted dark:text-muted-foreground rounded-full">
                        <Languages className="w-3 h-3 mr-1" />
                        {faq.language}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground rounded-full">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        {faq.usage_count} uses
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Last updated: {faq.last_updated}</span>
                  <span>Confidence: {(faq.confidence * 100).toFixed(0)}%</span>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{faqs.length}</div>
          <div className="text-sm text-muted-foreground">Total FAQs</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {new Set(faqs.map(f => f.language)).size}
          </div>
          <div className="text-sm text-muted-foreground">Languages</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {faqs.reduce((sum, f) => sum + f.usage_count, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Usage</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {(faqs.reduce((sum, f) => sum + f.confidence, 0) / faqs.length * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg Confidence</div>
        </Card>
      </div>
    </div>
  );
};

export default FAQManagement;