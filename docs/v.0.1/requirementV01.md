# Haven -- Project Specification (v0.1)

## Overview

**Haven** is a voice-first AI companion built using LiveKit. The goal is
to create an experience that feels like calling a supportive friend
rather than chatting with a traditional chatbot.

This MVP focuses on one thing only:

> A user can start a voice conversation with an AI companion in real
> time.

------------------------------------------------------------------------

# Goals

## Primary Goal

Build a real-time voice conversation using LiveKit.

The user should be able to:

-   Open the application
-   Click **Start Conversation**
-   Speak naturally
-   Receive spoken responses from the AI
-   End the conversation

------------------------------------------------------------------------

# Non-Goals (v0.1)

The following are intentionally excluded:

-   User authentication
-   Conversation history
-   Long-term memory
-   Mood tracking
-   Journaling
-   Push notifications
-   Mobile application
-   Analytics
-   Multi-user conversations

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   React
-   Vite
-   Tailwind CSS
-   LiveKit React SDK

## Backend

-   Python
-   FastAPI
-   LiveKit Agents SDK

## AI

-   OpenAI Realtime API

------------------------------------------------------------------------

# High-Level Architecture

``` text
User
  │
  ▼
React Frontend
  │
  ▼
LiveKit Room
  │
  ▼
LiveKit Agent
  │
  ▼
OpenAI Realtime API
  │
  ▼
Voice Response
```

------------------------------------------------------------------------

# Functional Requirements

## Landing Screen

Display:

-   Project title
-   Connection status
-   Start Conversation button

### Acceptance Criteria

-   Application loads successfully.
-   Start button is visible.

------------------------------------------------------------------------

## Voice Connection

When the user presses **Start Conversation**:

-   Connect to a LiveKit room
-   Request microphone permission
-   Establish an audio session

### Acceptance Criteria

-   Connection completes successfully.
-   Microphone permission is requested only once.
-   Status updates to **Connected**.

------------------------------------------------------------------------

## AI Conversation

After connecting:

-   AI greets the user.
-   User can speak naturally.
-   AI responds with synthesized speech.

### Acceptance Criteria

-   AI responds within a few seconds.
-   Conversation can continue for multiple turns.

------------------------------------------------------------------------

## End Conversation

The user can end the session.

### Acceptance Criteria

-   Audio stops immediately.
-   Connection is closed cleanly.
-   UI returns to the initial state.

------------------------------------------------------------------------

# UI Requirements

## Main Screen

    --------------------------------

            Haven 🌿

    Status:
    Disconnected

    [ Start Conversation ]

    --------------------------------

Connected state:

    --------------------------------

            Haven 🌿

    🟢 Connected

    🎤 Listening...

    [ End Conversation ]

    --------------------------------

------------------------------------------------------------------------

# Error Handling

Handle:

-   Microphone permission denied
-   Network failure
-   AI unavailable
-   LiveKit connection failure

Display clear, user-friendly messages.

------------------------------------------------------------------------

# Project Structure

``` text
haven/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── agent.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

------------------------------------------------------------------------

# Future Roadmap

## v0.2

-   Persistent conversation history
-   User authentication
-   Personality configuration

## v0.3

-   Long-term memory
-   Daily check-ins
-   Voice journal

## v0.4

-   Mood visualization
-   Goal tracking
-   Companion achievements

## v1.0

-   Walk With Me mode
-   Emotion-aware responses (non-diagnostic)
-   Multi-device support
-   Production deployment

------------------------------------------------------------------------

# Success Criteria

The MVP is considered complete when:

-   A user can start a conversation.
-   LiveKit connects successfully.
-   The AI responds with voice.
-   The user can hold a natural multi-turn conversation.
-   The user can end the conversation gracefully.

Nothing else is required for version 0.1.
