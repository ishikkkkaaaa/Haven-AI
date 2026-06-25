import os
import logging
from dotenv import load_dotenv
from livekit.agents import JobContext, WorkerOptions, cli, Agent, AgentSession
from livekit.plugins.google.realtime import RealtimeModel

# Load environment variables from root directory first
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("haven-agent")

async def entrypoint(ctx: JobContext):
    logger.info(f"Connecting to room: {ctx.room.name}...")
    
    # Configure the system instructions that form Haven't empathetic personality
    system_instruction = (
        "You are Haven 🌿, a warm, supportive, and empathetic AI friend. "
        "Your focus is on listening carefully, offering compassionate support, "
        "and holding a natural voice conversation. "
        "Keep your answers short, friendly, and natural—just like a supportive phone call. "
        "Do not sound like a machine. Ask gentle, open-ended questions when appropriate to "
        "encourage the user to share."
    )

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key or api_key == "your-google-gemini-api-key":
        logger.error("GOOGLE_API_KEY is not set or not configured in your .env file!")
        return

    # Initialize the Gemini Live Realtime model
    # Model name: gemini-2.0-flash (stable Live API model)
    # Voices available: Puck (friendly male), Aoede (warm female), Charon, Fenrir, Kore
    model = RealtimeModel(
        model="gemini-2.0-flash",
        api_key=api_key,
        voice="Aoede",
        instructions=system_instruction,
        temperature=0.8,
    )

    # Initialize the AgentSession using Gemini Realtime Model as the llm orchestrator
    session = AgentSession(
        llm=model
    )
    
    # Start the session in the room
    await session.start(
        agent=Agent(instructions=system_instruction),
        room=ctx.room
    )
    
    logger.info("Haven Gemini Live voice assistant started successfully and connected to room!")

if __name__ == "__main__":
    # Start the agent CLI
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
