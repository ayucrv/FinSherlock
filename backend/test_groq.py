from dotenv import load_dotenv
from pathlib import Path
from groq import Groq
import os

# Load .env
load_dotenv(Path(".env"))

key = os.getenv("GROQ_API_KEY")

print("Loaded Key:", repr(key))
print("Starts with gsk_:", key.startswith("gsk_") if key else False)
print("Length:", len(key) if key else 0)

client = Groq(api_key=key)

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": "Say hello."
        }
    ]
)

print(response.choices[0].message.content)