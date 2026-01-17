import os
import sys
import whisper
import io

# 🔥 Force UTF-8 output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 🔥 Force FFmpeg path
os.environ["PATH"] += r";C:\ffmpeg\bin"

audio_path = sys.argv[1]

model = whisper.load_model("small")
result = model.transcribe(audio_path)

print(result["text"].strip())
