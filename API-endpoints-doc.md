# API Endpoints Documentation

## Base URL
```
https://
```

## Authentication

### POST /auth/login
Login user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "admin",
      "company": "ABC University"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

**Used in:** [`src/components/Login.jsx`](src/components/Login.jsx)

---

### POST /auth/register
Register new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "company": "ABC University",
  "phone": "+91 98765 43210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user",
      "company": "ABC University"
    },
    "token": "jwt_token_here"
  }
}
```

**Used in:** [`src/components/SignUp.jsx`](src/components/SignUp.jsx)

---

### POST /auth/logout
Logout user and invalidate tokens.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Used in:** [`src/App.jsx`](src/App.jsx)

---

## Tasks Management

### GET /tasks
Fetch all tasks with optional filtering.

**Query Parameters:**
- `userId` (optional): Filter tasks by user ID
- `status` (optional): Filter by status (todo, in-progress, in-review, completed)
- `assignee` (optional): Filter by assignee
- `priority` (optional): Filter by priority (low, medium, high)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "task_123",
      "title": "Design new landing page",
      "description": "Create a modern and responsive landing page",
      "status": "todo",
      "category": "Design",
      "priority": "high",
      "assignee": "rahul",
      "due_date": "2025-09-25",
      "created_at": "2025-09-18T10:30:00Z",
      "updated_at": "2025-09-18T10:30:00Z",
      "user_id": "user_123"
    }
  ]
}
```

**Used in:** [`src/hooks/useTaskBoard.js`](src/hooks/useTaskBoard.js)

---

### POST /tasks
Create a new task.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Task Title",
  "description": "Task description",
  "status": "todo",
  "category": "Development",
  "priority": "medium",
  "assignee": "user_id",
  "due_date": "2025-10-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task_124",
    "title": "New Task Title",
    "description": "Task description",
    "status": "todo",
    "category": "Development",
    "priority": "medium",
    "assignee": "user_id",
    "due_date": "2025-10-01",
    "created_at": "2025-09-20T15:30:00Z",
    "updated_at": "2025-09-20T15:30:00Z",
    "user_id": "user_123"
  }
}
```

**Used in:** [`src/hooks/useTaskBoard.js`](src/hooks/useTaskBoard.js)

---

### PATCH /tasks/{taskId}
Update task status or other properties.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "in-progress",
  "priority": "high",
  "assignee": "new_user_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task_123",
    "title": "Design new landing page",
    "description": "Create a modern and responsive landing page",
    "status": "in-progress",
    "category": "Design",
    "priority": "high",
    "assignee": "new_user_id",
    "due_date": "2025-09-25",
    "created_at": "2025-09-18T10:30:00Z",
    "updated_at": "2025-09-20T16:45:00Z",
    "user_id": "user_123"
  }
}
```

**Used in:** [`src/hooks/useTaskBoard.js`](src/hooks/useTaskBoard.js), [`src/components/TaskColumn.jsx`](src/components/TaskColumn.jsx)

---

### DELETE /tasks/{taskId}
Delete a task.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Used in:** [`src/hooks/useTaskBoard.js`](src/hooks/useTaskBoard.js)

---

## Conversations & Analytics

### GET /conversations
Fetch conversation logs with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `user_id` (optional): Filter by user ID
- `date_from` (optional): Filter from date (ISO format)
- `date_to` (optional): Filter to date (ISO format)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "conv_123",
        "user_id": "user_456",
        "user_name": "Rahul Sharma",
        "user_phone": "+91 98765 43210",
        "start_time": "2025-01-15T14:30:00Z",
        "end_time": "2025-01-15T14:35:30Z",
        "duration": "5m 30s",
        "query_type": "admission",
        "language": "Hindi",
        "emotion": "curious",
        "satisfaction": 4.5,
        "resolved": true,
        "transcript": "User asked about admission requirements...",
        "agent_responses": ["The admission process requires..."],
        "tags": ["admission", "requirements", "documents"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 150,
      "totalPages": 3
    }
  }
}
```

**Used in:** [`src/components/ConversationLogs.jsx`](src/components/ConversationLogs.jsx)

---

### GET /conversations/{conversationId}
Fetch detailed conversation data.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conv_123",
    "user_id": "user_456",
    "user_name": "Rahul Sharma",
    "start_time": "2025-01-15T14:30:00Z",
    "end_time": "2025-01-15T14:35:30Z",
    "duration": "5m 30s",
    "query_type": "admission",
    "language": "Hindi",
    "emotion": "curious",
    "satisfaction": 4.5,
    "resolved": true,
    "full_transcript": [
      {
        "timestamp": "2025-01-15T14:30:15Z",
        "speaker": "user",
        "message": "क्या admission के लिए क्या documents चाहिए?",
        "language": "Hindi"
      },
      {
        "timestamp": "2025-01-15T14:30:20Z",
        "speaker": "agent",
        "message": "Admission के लिए आपको ये documents चाहिए...",
        "language": "Hindi"
      }
    ]
  }
}
```

**Used in:** [`src/components/ConversationLogs.jsx`](src/components/ConversationLogs.jsx)

---

### GET /analytics/dashboard
Fetch dashboard analytics data.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalConversations": 2450,
    "totalUsers": 1850,
    "avgSatisfaction": 4.3,
    "resolutionRate": 87.5,
    "languageDistribution": {
      "English": 45,
      "Hindi": 30,
      "Tamil": 15,
      "Telugu": 10
    },
    "emotionAnalysis": {
      "positive": 65,
      "neutral": 25,
      "negative": 10
    },
    "queryTypes": {
      "admission": 35,
      "fees": 25,
      "courses": 20,
      "scholarships": 15,
      "other": 5
    },
    "responseMetrics": {
      "avgResponseTime": "2.3s",
      "unknownContact": "12m",
      "arjunCodess": "41m"
    },
    "interestLevel": {
      "unknownContact": 45,
      "arjunCodess": 85
    }
  }
}
```

**Used in:** [`src/components/Dashboard.jsx`](src/components/Dashboard.jsx)

---

## FAQ Management

### GET /faqs
Fetch all FAQs with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `language` (optional): Filter by language
- `search` (optional): Search in question/answer text

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "faq_123",
      "question": "What are the admission requirements?",
      "answer": "Admission requirements include 12th pass certificate, entrance exam scores...",
      "category": "admission",
      "language": "English",
      "usage_count": 245,
      "last_updated": "2025-01-10T09:15:00Z",
      "confidence": 0.95,
      "status": "active"
    }
  ]
}
```

**Used in:** [`src/components/FAQManagement.jsx`](src/components/FAQManagement.jsx)

---

### POST /faqs
Create a new FAQ.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "question": "How to apply for scholarships?",
  "answer": "Scholarships can be applied through our online portal...",
  "category": "scholarship",
  "language": "English",
  "tags": ["scholarship", "application", "financial-aid"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "faq_124",
    "question": "How to apply for scholarships?",
    "answer": "Scholarships can be applied through our online portal...",
    "category": "scholarship",
    "language": "English",
    "usage_count": 0,
    "last_updated": "2025-09-20T16:30:00Z",
    "confidence": 1.0,
    "status": "active"
  }
}
```

**Used in:** [`src/components/FAQManagement.jsx`](src/components/FAQManagement.jsx)

---

### PUT /faqs/{faqId}
Update an existing FAQ.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "question": "Updated question text",
  "answer": "Updated answer text",
  "category": "admission",
  "language": "English"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "faq_123",
    "question": "Updated question text",
    "answer": "Updated answer text",
    "category": "admission",
    "language": "English",
    "usage_count": 245,
    "last_updated": "2025-09-20T16:45:00Z",
    "confidence": 0.95,
    "status": "active"
  }
}
```

**Used in:** [`src/components/FAQManagement.jsx`](src/components/FAQManagement.jsx)

---

### DELETE /faqs/{faqId}
Delete an FAQ.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "FAQ deleted successfully"
}
```

**Used in:** [`src/components/FAQManagement.jsx`](src/components/FAQManagement.jsx)

---

## User Management

### GET /users
Fetch all users with optional filtering.

**Query Parameters:**
- `role` (optional): Filter by role (student, parent, admin)
- `status` (optional): Filter by status (active, inactive, pending)
- `search` (optional): Search by name or email
- `page` (optional): Page number
- `limit` (optional): Items per page

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "name": "Rahul Sharma",
        "email": "rahul.sharma@email.com",
        "phone": "+91 98765 43210",
        "role": "student",
        "status": "active",
        "lastCall": "2025-01-15T11:45:30Z",
        "totalCalls": 12,
        "avgSatisfaction": 4.5,
        "preferredLanguage": "English",
        "joinedDate": "2024-08-15T00:00:00Z",
        "notes": "Frequently asks about admission requirements"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 150,
      "totalPages": 3
    }
  }
}
```

**Used in:** [`src/components/UserManagement.jsx`](src/components/UserManagement.jsx)

---

### GET /users/{userId}
Fetch detailed user information.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "Rahul Sharma",
    "email": "rahul.sharma@email.com",
    "phone": "+91 98765 43210",
    "role": "student",
    "status": "active",
    "lastCall": "2025-01-15T11:45:30Z",
    "totalCalls": 12,
    "avgSatisfaction": 4.5,
    "preferredLanguage": "English",
    "joinedDate": "2024-08-15T00:00:00Z",
    "notes": "Frequently asks about admission requirements",
    "callHistory": [
      {
        "id": "call_456",
        "date": "2025-01-15T11:45:30Z",
        "duration": "3m 20s",
        "satisfaction": 5,
        "query_type": "admission"
      }
    ]
  }
}
```

**Used in:** [`src/components/UserManagement.jsx`](src/components/UserManagement.jsx)

---

### PATCH /users/{userId}/status
Update user status.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "status": "active",
    "updated_at": "2025-09-20T16:30:00Z"
  }
}
```

**Used in:** [`src/components/UserManagement.jsx`](src/components/UserManagement.jsx)

---

### GET /users/stats
Fetch user statistics for dashboard.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1850,
    "activeUsers": 1620,
    "newUsersThisMonth": 145,
    "usersByRole": {
      "student": 1200,
      "parent": 580,
      "admin": 70
    },
    "usersByLanguage": {
      "English": 830,
      "Hindi": 555,
      "Tamil": 278,
      "Telugu": 187
    }
  }
}
```

**Used in:** [`src/components/Dashboard.jsx`](src/components/Dashboard.jsx)

---

## Error Handling

All endpoints should return consistent error responses:

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details (optional)"
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` (401): Invalid or missing token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `INTERNAL_ERROR` (500): Server error

---

## Authentication Headers

For all authenticated endpoints, include:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

## Rate Limiting

All endpoints are rate limited:
- **Authentication endpoints**: 5 requests per minute
- **CRUD operations**: 100 requests per minute
- **Read operations**: 200 requests per minute

## Implementation Priority

1. **High Priority** (Core functionality):
   - Authentication endpoints (`/auth/*`)
   - Task management (`/tasks/*`)
   - Basic analytics (`/analytics/dashboard`)

2. **Medium Priority** (Dashboard features):
   - Conversation logs (`/conversations/*`)
   - User management (`/users/*`)
   - FAQ management (`/faqs/*`)

3. **Low Priority** (Enhanced features):
   - Advanced analytics
   - Detailed conversation analysis
   - User behavior tracking

---
