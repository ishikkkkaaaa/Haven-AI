# Haven 🌿

> A voice-first AI companion built with LiveKit.

Haven is designed to feel less like chatting with a bot and more like
calling a supportive friend. The focus is on natural, low-latency voice
conversations powered by LiveKit and an LLM.

------------------------------------------------------------------------

# Vision

Create an AI companion that people can talk to naturally through voice.
The MVP focuses on building a delightful conversation experience before
adding advanced features like memory, journaling, or mood tracking.

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   React
-   Vite
-   Tailwind CSS
-   LiveKit React Components

## Backend

-   Python
-   FastAPI
-   LiveKit Agents SDK

## AI

-   OpenAI Realtime API

## Future

-   Supabase
-   Docker
-   Vercel
-   Railway/Fly.io

------------------------------------------------------------------------

# Development Roadmap

## Phase 1 --- Project Setup

### Tasks

-   Create frontend (React + Vite)
-   Create backend (FastAPI)
-   Configure environment variables
-   Create project structure

### Acceptance Criteria

-   Frontend starts locally
-   Backend starts locally
-   Project structure matches specification

------------------------------------------------------------------------

## Phase 2 --- LiveKit Integration

### Tasks

-   Create LiveKit account
-   Configure API keys
-   Generate access tokens
-   Join a LiveKit room
-   Request microphone permissions

### Acceptance Criteria

-   User joins a room successfully
-   Microphone permission works
-   Connection state is visible
-   User can disconnect cleanly

------------------------------------------------------------------------

## Phase 3 --- AI Voice Conversation (MVP)

### Tasks

-   Create LiveKit Agent
-   Connect to OpenAI Realtime API
-   Stream microphone audio
-   Stream AI audio responses
-   Add a simple companion prompt

### Acceptance Criteria

-   User speaks naturally
-   AI responds with voice
-   Multi-turn conversations work
-   No page refresh required

------------------------------------------------------------------------

## Phase 4 --- User Experience

### Tasks

-   Loading states
-   Error handling
-   Conversation status
-   End conversation button
-   Improve UI polish

### Acceptance Criteria

-   Clear connection feedback
-   Friendly error messages
-   Stable conversation experience

------------------------------------------------------------------------

## Phase 5 --- Companion Personality

### Tasks

-   Create system prompt
-   Friendly greeting
-   Active listening
-   Gentle follow-up questions
-   Natural tone

### Acceptance Criteria

-   AI feels conversational
-   Responses remain consistent
-   Doesn't sound robotic

------------------------------------------------------------------------

## Phase 6 --- Memory (Optional)

### Tasks

-   User profiles
-   Conversation summaries
-   Long-term memory
-   Recall previous conversations

### Acceptance Criteria

-   AI remembers previous sessions (with user consent)
-   Context improves conversations

------------------------------------------------------------------------

## Phase 7 --- Journaling

### Tasks

-   Summarize conversations
-   Daily reflections
-   Store journal entries

### Acceptance Criteria

-   Journal generated after each session
-   User can review previous entries

------------------------------------------------------------------------

## Phase 8 --- Dashboard

### Tasks

-   Conversation history
-   Streak tracking
-   Mood visualization
-   Goals

### Acceptance Criteria

-   Dashboard displays user progress
-   Data loads correctly

------------------------------------------------------------------------

## Phase 9 --- Premium Experience

### Tasks

-   Walk With Me mode
-   Ambient conversations
-   Voice settings
-   Multiple AI personalities

### Acceptance Criteria

-   Companion supports long-running sessions
-   Personality switching works

------------------------------------------------------------------------

# Project Structure

``` text
haven/
├── frontend/
├── backend/
├── docs/
├── prompts/
├── README.md
└── .env.example
```

------------------------------------------------------------------------

# MVP Definition

The MVP is complete when:

-   A user can open the application.
-   A user can start a voice conversation.
-   LiveKit connects successfully.
-   The AI replies using speech.
-   The conversation supports multiple turns.
-   The user can end the conversation.

Everything else is a future enhancement.

------------------------------------------------------------------------

# Future Ideas

-   Daily check-ins
-   Mood garden
-   Voice journal
-   Companion avatars
-   Calendar integration
-   Spotify integration
-   Smart reminders
-   Wearable support
-   Mobile apps (iOS/Android)

------------------------------------------------------------------------

# Guiding Principle

**Build the conversation first. Everything else comes later.**
