# Haven 🌿

> A voice-first AI companion built with LiveKit and Gemini

Haven is designed to feel less like chatting with a traditional bot and more like calling a supportive, empathetic friend. It focuses on low-latency, real-time voice conversations.

---

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + LiveKit React Components SDK
- **Backend**: FastAPI (Python) + LiveKit Agents SDK
- **AI**: Gemini

---

## Project Structure

```text
Haven-AI/
├── .env.example              # Template for API keys and configuration
├── README.md                 # Project guide
├── docs/                     # Product requirements & specifications
├── backend/                  # FastAPI server & LiveKit agent worker
│   ├── main.py               # Token server endpoint (FastAPI)
│   ├── agent.py              # Voice agent orchestrator (LiveKit Agent)
│   ├── requirements.txt      # Python dependencies
│   └── venv/                 # Python virtual environment (git-ignored)
└── frontend/                 # React client application
    ├── src/                  # React components & styles
    ├── package.json          # Node dependencies
    └── vite.config.js        # Vite configurations
```

---

## Setup & Run Instructions

### Step 1: Clone & Configure Credentials

1. Locate the `.env.example` file in the root directory.
2. Copy it to a new file named `.env` in the root:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your keys:
   - **LiveKit Server**: Register a free account at [livekit.io](https://livekit.io/) to get your `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET`.
   - **OpenAI**: Get your `OPENAI_API_KEY` from [platform.openai.com](https://platform.openai.com/).

> [!IMPORTANT]
> Keep your `.env` file secure. Do not commit it to version control.

---

### Step 2: Run the Backend Services

Open **two terminal windows/tabs** (one for the API server, one for the Agent worker):

#### Tab A: API Server (Token Generator)
This FastAPI app runs on `http://localhost:8000` and generates room tokens for the React app.
```bash
cd backend
# Activate the virtual environment
source venv/bin/activate
# Start the FastAPI server
uvicorn main:app --reload --port 8000
```

#### Tab B: Voice Agent Worker
The agent connects to the LiveKit server and joins rooms to converse with users.
```bash
cd backend
# Activate the virtual environment
source venv/bin/activate
# Start the LiveKit agent worker in dev mode
python agent.py dev
```

---

### Step 3: Run the Frontend Client

Open a **third terminal window/tab** for the React app:

```bash
cd frontend
# Install packages (if not already done)
npm install
# Run the Vite local development server
npm run dev
```

Open `http://localhost:5173` in your browser. Click **Start Conversation**, allow microphone access, and start talking to **Haven**! 🌿
