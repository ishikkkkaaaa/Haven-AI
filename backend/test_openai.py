import asyncio
import os
import sys
import json
from dotenv import load_dotenv

# Load env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

async def test_openai_realtime(model_name):
    import websockets
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY is not set in environment.")
        return False
        
    url = f"wss://api.openai.com/v1/realtime?model={model_name}"
    
    # GA Realtime API does not require the OpenAI-Beta header
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    print(f"\n--- Testing model: {model_name} ---")
    print(f"Connecting to {url}...")
    try:
        try:
            ws_conn = websockets.connect(url, additional_headers=headers)
        except TypeError:
            ws_conn = websockets.connect(url, extra_headers=headers)
            
        async with ws_conn as ws:
            print("Success: Connected to WebSocket!")
            response = await ws.recv()
            data = json.loads(response)
            print("Initial Message Type:", data.get("type"))
            print("Content:", json.dumps(data, indent=2)[:500])
            return True
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

async def main():
    try:
        # Test beta model vs GA model name
        await test_openai_realtime("gpt-4o-realtime-preview")
        await test_openai_realtime("gpt-realtime")
        await test_openai_realtime("gpt-realtime-2")
    except ImportError:
        print("websockets package not found in this environment.")

if __name__ == "__main__":
    asyncio.run(main())
