import os
import logging
from dotenv import load_dotenv
from livekit.agents import JobContext, WorkerOptions, cli, Agent, AgentSession
from livekit.plugins import openai

# Load environment variables from root directory first
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("haven-agent")

async def entrypoint(ctx: JobContext):
    logger.info(f"Connecting to room: {ctx.room.name}...")
    
    # Configure the system instructions that form Haven's empathetic personality
    system_instruction = (
        "You are Haven 🌿, a warm, supportive, and empathetic AI friend. "
        "Your focus is on listening carefully, offering compassionate support, "
        "and holding a natural voice conversation. "
        "Keep your answers short, friendly, and natural—just like a supportive phone call. "
        "Do not sound like a machine. Ask gentle, open-ended questions when appropriate to "
        "encourage the user to share."
    )

    # Initialize the OpenAI Realtime model
    # Choices for voice: alloy, ash, ballad, coral, echo, verse
    model = openai.realtime.RealtimeModel(
        voice="alloy",
        modalities=["audio", "text"],
        temperature=0.8,
    )

    # Initialize the AgentSession using our Realtime Model as the llm
    session = AgentSession(
        llm=model
    )
    
    # Start the session in the room
    # This automatically connects to the room and handles lifecycle
    await session.start(
        agent=Agent(instructions=system_instruction),
        room=ctx.room
    )
    
    logger.info("Haven voice assistant started successfully and connected to room!")

if __name__ == "__main__":
    # Start the agent CLI
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
