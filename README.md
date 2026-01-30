# Mocks - AI-Powered Interview Preparation Platform

## Introduction
Mocks is a cutting-edge web application designed to help job seekers prepare for technical interviews through AI-powered mock interviews. Built with modern technologies like Next.js and powered by the Gemini AI API, Mocks provides a realistic interview environment with personalized feedback.

## Technology Stack
- **Frontend**: Next.js, Tailwind CSS, shadcn/ui components
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **AI Integration**: Google's Gemini API
- **Speech Recognition**: Web Speech API

## Core Features

### 1. User Authentication
- Secure login/signup system powered by Clerk
- Personalized dashboard for each user
- Session management and user data protection

### 2. Interview Creation
Users can create customized interview sessions by specifying:
- Target job position
- Role description
- Required technical skills
- Experience level (Fresher/Experienced)
- Preferred technology stack

### 3. AI-Powered Interview Experience
- **Real-time Video**: Browser-based camera activation for a realistic interview setting
- **Speech Recognition**: Converts user's spoken answers to text
- **Dynamic Questions**: AI-generated questions based on the user's profile and preferences
- **Split-screen Interface**:
  - Left side: Displays current interview question
  - Right side: Shows user's video feed and speech-to-text conversion

### 4. Intelligent Feedback System
- Real-time analysis of user responses
- Comprehensive feedback on each answer including:
  - Answer quality rating (1-5 scale)
  - Detailed improvement suggestions
  - Comparison with ideal answers
  - Overall interview performance score

### 5. Progress Tracking
- Historical interview sessions
- Performance analytics
- Improvement tracking over time

## User Journey

1. **Landing Page**
   - Introduction to Mocks
   - Feature highlights
   - Clear call-to-action for signup

2. **Authentication**
   - Seamless login/signup process
   - Social login options
   - Secure credential management

3. **Dashboard**
   - Overview of past interviews
   - Option to create new interview sessions
   - Access to performance metrics

4. **Interview Creation**
   - Simple form to specify interview parameters
   - AI customization based on inputs
   - Technology stack selection

5. **Interview Session**
   - Camera and microphone setup
   - Question display
   - Real-time speech-to-text conversion
   - Progress indicator

6. **Feedback Page**
   - Comprehensive performance analysis
   - Question-by-question breakdown
   - AI-generated improvement suggestions
   - Overall interview score

## Upcoming Features

### 1. Interactive Code Editor
- Real-time coding environment
- Multiple language support
- Code execution capabilities
- AI-powered code review

### 2. Premium Subscription (Stripe Integration)
- **Basic Plan**: Limited interviews per month
- **Premium Plan**: 
  - Unlimited interviews
  - Advanced analytics
  - Priority feedback
  - Code editor access
  - Interview recording feature

### 3. Future Enhancements
- Mock system design interviews
- Behavioral interview preparation
- Industry-specific question sets
- Interview recording and playback
- Peer review system

## Value Proposition
Mocks transforms interview preparation by:
- Providing realistic interview simulation
- Offering immediate, actionable feedback
- Reducing interview anxiety through practice
- Saving time and resources compared to traditional mock interviews
- Enabling continuous improvement through AI-powered insights

## Target Audience
- Job seekers in tech industry
- Fresh graduates
- Experienced professionals looking to switch roles
- Career coaching institutions
- Educational institutions

The platform's scalable architecture and modular design allow for continuous feature additions and improvements, ensuring it stays relevant to evolving interview practices and technical requirements.
