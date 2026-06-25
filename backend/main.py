import os
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from livekit import api

# Load environment variables from parent directory or local backend .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

app = FastAPI(title="Haven API - Voice Companion Backend")

# Enable CORS for the frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LIVEKIT_URL = os.getenv("LIVEKIT_URL")
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")

@app.get("/api/token")
def get_token():
    # Fallback/validation of keys
    api_key = LIVEKIT_API_KEY or os.getenv("LIVEKIT_API_KEY")
    api_secret = LIVEKIT_API_SECRET or os.getenv("LIVEKIT_API_SECRET")
    server_url = LIVEKIT_URL or os.getenv("LIVEKIT_URL")

    if not api_key or not api_secret:
        raise HTTPException(
            status_code=500,
            detail="LiveKit API key or secret not configured on backend. Please configure your .env file."
        )
    
    # Generate a unique identity for the participant
    identity = f"haven_user_{random.randint(1000, 9999)}"
    # We will generate a unique room name for each session
    room_name = f"haven_room_{random.randint(1000, 9999)}"
    
    try:
        # Create LiveKit Access Token
        token = (
            api.AccessToken(api_key, api_secret)
            .with_identity(identity)
            .with_name("Haven User")
            .with_grants(api.VideoGrants(
                room_join=True,
                room=room_name,
            ))
        )
        
        return {
            "token": token.to_jwt(),
            "serverUrl": server_url,
            "roomName": room_name,
            "identity": identity
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate LiveKit token: {str(e)}"
        )

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "livekit_configured": bool(LIVEKIT_API_KEY and LIVEKIT_API_SECRET),
        "gemini_configured": bool(os.getenv("GOOGLE_API_KEY"))
    }
