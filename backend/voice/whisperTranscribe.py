import os
import sys
import whisper
import io

# 🔥 Force UTF-8 output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# 🔥 Force FFmpeg path (Windows)
os.environ["PATH"] += r";C:\ffmpeg\bin"

audio_path = sys.argv[1]

# 🔥 Load model (small is good balance)
model = whisper.load_model("small")

# 🔥 FORCE HINDI + TRANSCRIPTION ONLY
result = model.transcribe(
    audio_path,
    language="hi",           # ✅ FORCE HINDI
    task="transcribe",       # ✅ no translation
    fp16=False               # ✅ Windows safety
)

text = result.get("text", "").strip()

# 🔍 Debug print (optional but useful)
# print("RAW:", result)

print(text)

