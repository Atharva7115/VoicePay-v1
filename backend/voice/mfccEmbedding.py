import sys
import librosa
import numpy as np

audio_path = sys.argv[1]

# Load audio (mono, 16kHz)
y, sr = librosa.load(audio_path, sr=16000)

# Extract MFCC features
mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)

# Take mean across time axis
mfcc_mean = np.mean(mfcc, axis=1)

# Output as comma-separated values
print(",".join(map(str, mfcc_mean)))
