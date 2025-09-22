# AINevis API Documentation

This document provides comprehensive information about the AINevis API endpoints, authentication, and usage patterns.

## Table of Contents

- [Base Configuration](#base-configuration)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Content Categories](#content-categories)
  - [Chat System](#chat-system)
  - [Image Generation](#image-generation)
  - [Resume Builder](#resume-builder)
  - [Data Services](#data-services)
  - [Dashboard & History](#dashboard--history)
- [Request/Response Examples](#requestresponse-examples)
- [Rate Limiting](#rate-limiting)

## Base Configuration

### Base URL
```
Production: https://api.ainevis.com/api/v1
Development: http://localhost:4000/api/v1
```

### Headers
```http
Content-Type: application/json
X-CUSTOM-LANG: en | fa
Authorization: Bearer {access_token}
```

### Timeout
- Request timeout: 5 minutes (300,000ms)

## Authentication

AINevis uses JWT-based authentication with access and refresh tokens.

### Authentication Flow

1. **Request OTP**: Send mobile number to get OTP
2. **Verify OTP**: Verify the OTP to get access and refresh tokens
3. **Use Access Token**: Include in Authorization header for protected endpoints
4. **Refresh Token**: Use refresh token to get new access token when expired

### Token Management

- **Access Token**: Short-lived token for API access
- **Refresh Token**: Long-lived token for getting new access tokens
- **Auto-refresh**: The client automatically refreshes tokens when they expire

## Error Handling

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
- `5000` - Custom token expiration (triggers auto-refresh)

## API Endpoints

### User Management

#### Generate Mobile OTP
```http
POST /public/user/generate-mobile-otp
```

**Request Body:**
```json
{
  "mobile": "+1234567890"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "otpId": "12345"
}
```

#### Verify Mobile OTP
```http
POST /auth/user/verify-mobile
```

**Request Body:**
```json
{
  "mobile": "+1234567890",
  "otp": "123456",
  "otpId": "12345"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "mobile": "+1234567890",
    "name": "User Name"
  }
}
```

#### Get User Profile
```http
GET /auth/user/profile
```

**Headers:**
```http
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": "user_id",
  "mobile": "+1234567890",
  "name": "User Name",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update User Name
```http
PUT /user/user/update-name
```

**Request Body:**
```json
{
  "name": "New User Name"
}
```

#### Refresh Access Token
```http
POST /auth/user/refresh
```

**Headers:**
```http
Authorization: Bearer {refresh_token}
```

#### Generate Content Prompt
```http
POST /user/user/prompt
```

**Request Body:**
```json
{
  "categoryId": "category_id",
  "prompt": "Content description",
  "tone": "professional",
  "additional_params": {}
}
```

### Content Categories

#### List All Categories
```http
GET /public/category/list
```

**Response:**
```json
{
  "categories": [
    {
      "id": "cat_1",
      "name": "Blog Posts",
      "description": "Create engaging blog content",
      "icon": "blog-icon.svg",
      "subcategories": [...]
    }
  ]
}
```

#### Get Plain Category List
```http
GET /public/category/plain-list
```

#### Get Category Details
```http
GET /public/category/get/{categoryId}
```

#### Request New Category
```http
POST /user/category-request
```

**Request Body:**
```json
{
  "name": "Requested Category",
  "description": "Category description",
  "useCase": "Use case description"
}
```

### Chat System

#### Get Chat History
```http
GET /user/chat
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

#### Send Chat Message
```http
POST /user/chat/message
```

**Request Body:**
```json
{
  "message": "User message",
  "context": "additional_context"
}
```

**Response:**
```json
{
  "id": "message_id",
  "userMessage": "User message",
  "aiResponse": "AI generated response",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### Delete Chat
```http
DELETE /user/chat/delete
```

**Request Body:**
```json
{
  "chatId": "chat_id"
}
```

### Image Generation

#### Generate Image
```http
POST /user/user/image-prompt
```

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "style": "realistic",
  "size": "1024x1024",
  "quality": "hd"
}
```

**Response:**
```json
{
  "imageUrl": "https://generated-image-url.com/image.jpg",
  "prompt": "A beautiful sunset over mountains",
  "metadata": {
    "style": "realistic",
    "size": "1024x1024",
    "generatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Resume Builder

#### Create Resume
```http
POST /user/resume
```

**Request Body:**
```json
{
  "title": "Software Engineer Resume",
  "templateId": "template_1"
}
```

#### Get All Resumes
```http
GET /user/resume/list
```

#### Get Resume Templates
```http
GET /public/template
```

#### Create Resume from Voice
```http
POST /user/resume/voice
```

#### Create Resume from Occupation
```http
POST /user/resume/occupation
```

**Request Body:**
```json
{
  "occupation": "Software Engineer",
  "experience": "3 years",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

#### Get Single Resume
```http
GET /user/resume/{resumeId}
```

#### Update Resume Title
```http
PUT /user/resume/{resumeId}/title
```

#### Delete Resume
```http
DELETE /user/resume/{resumeId}
```

#### Resume Sections

All resume section endpoints follow the pattern:
```http
POST /user/resume/{resumeId}/{section}
PUT /user/resume/{resumeId}/{section}
DELETE /user/resume/{resumeId}/{section}
```

**Available Sections:**
- `basic` - Basic information
- `education` - Education history
- `work` - Work experience
- `skill` - Skills
- `project` - Projects
- `language` - Languages
- `certificate` - Certifications
- `profile` - Profile summary
- `publication` - Publications
- `invention` - Inventions
- `interest` - Interests
- `award` - Awards
- `reference` - References
- `speech` - Speeches
- `teaching` - Teaching experience
- `volunteer` - Volunteer work

#### AI-Powered Resume Features

#### Generate AI Bio
```http
POST /user/resume/{resumeId}/bio-ai
```

#### Generate AI Highlights
```http
POST /user/resume/{resumeId}/highlight-ai
```

#### Upload Profile Image
```http
POST /user/resume/{resumeId}/upload-image
```

### Data Services

#### Get Skills
```http
GET /public/data/skills
```

#### Get Companies
```http
GET /public/data/companies
```

#### Get Provinces
```http
GET /public/data/provinces
```

#### Get Occupations
```http
GET /public/data/occupations
```

#### Get Universities
```http
GET /public/data/universities
```

#### Get Study Fields
```http
GET /public/data/study-fields
```

#### Get Tones
```http
GET /public/data/tones
```

### Dashboard & History

#### Get Dashboard Data
```http
GET /user/history/dashboard
```

**Response:**
```json
{
  "stats": {
    "totalContent": 150,
    "thisMonth": 25,
    "totalTokens": 50000
  },
  "recentActivity": [...],
  "charts": {...}
}
```

#### Get History
```http
GET /user/history/list?page={page}
```

**Query Parameters:**
- `page`: Page number (required)

#### Submit Feedback
```http
POST /user/history/feedback/{historyId}
```

**Request Body:**
```json
{
  "rating": 5,
  "feedback": "Great content generation!",
  "helpful": true
}
```

## Request/Response Examples

### Creating Content with Category

```javascript
// Request
const response = await fetch('/user/user/prompt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_access_token',
    'X-CUSTOM-LANG': 'en'
  },
  body: JSON.stringify({
    categoryId: 'blog_post_category',
    prompt: 'Write a blog post about artificial intelligence in healthcare',
    tone: 'professional',
    length: 'medium',
    targetAudience: 'healthcare professionals'
  })
});

// Response
{
  "id": "content_id",
  "generatedContent": "Artificial Intelligence is revolutionizing healthcare...",
  "metadata": {
    "wordCount": 500,
    "tokensUsed": 750,
    "generationTime": "2.5s"
  },
  "suggestions": [
    "Consider adding statistics",
    "Include case studies"
  ]
}
```

### Error Handling Example

```javascript
try {
  const response = await apiCall();
} catch (error) {
  if (error.status === 5000) {
    // Token expired, will be automatically refreshed
    console.log('Token refreshed, retrying...');
  } else {
    console.error('API Error:', error.message);
    // Handle other errors
  }
}
```

## Rate Limiting

- **Content Generation**: 100 requests per hour per user
- **Chat Messages**: 50 requests per minute per user
- **Image Generation**: 20 requests per hour per user
- **Data Endpoints**: 1000 requests per hour per user

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Best Practices

### Security
- Always use HTTPS in production
- Store tokens securely (not in localStorage for sensitive apps)
- Implement proper CORS policies
- Validate all inputs on the server side

### Performance
- Use pagination for large datasets
- Implement proper caching strategies
- Use compression for large payloads
- Monitor API response times

### Error Handling
- Always handle network errors gracefully
- Implement retry logic for transient failures
- Log errors for debugging purposes
- Provide meaningful error messages to users

### API Versioning
- Always specify API version in requests
- Plan for backward compatibility
- Communicate breaking changes in advance

## Support

For API support and questions:
- **Issues**: [GitHub Issues](https://github.com/amirrstm/AIN-NextJS/issues)
- **Email**: amr.rostam@gmail.com

## Changelog

### Version 1.0.0
- Initial API release
- User authentication system
- Content generation endpoints
- Resume builder functionality
- Chat system
- Image generation

---

*Last updated: September 2024*