import cv2 # KEEP OPENCV VERSION TO 4.5.1.48 FOR THIS TO WORK
import threading
import json
from subprocess import call

face_cascade = cv2.CascadeClassifier('ml_modules/haarcascade_frontalface_default.xml')
video_capture = cv2.VideoCapture(0)

face_frame = 0
faces = ()
face_detected = False

def voice_recog_process():
    call('python ml_modules/speech_recog.py', shell=True) # **CHANGE TO 'python3 speech_recog.py' FOR RASPBERRY PI

voice_recog_thread = threading.Thread(target=voice_recog_process)

while True:
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    detect_secs = 1 # amount of frames needed = fps * unlock_secs
    ret, frame = video_capture.read()
    #frame = cv2.resize(frame, (800, 600))
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
    if face_frame >= detect_secs * fps: # START SPEECH RECOG
        if not voice_recog_thread.is_alive() and not face_detected:
            # LISTENING
            with open('GUI/data/data.json', mode='r') as data_read:
                data = json.loads(data_read.readline())
                data[3] = {
                    "command": None,
                    "response": 'Listening...'
                }
            with open('GUI/data/data.json', mode='w') as data_write:
                json.dump(data, data_write)
                print("Listening...")
            face_detected = True
            voice_recog_thread.start()
        elif not voice_recog_thread.is_alive() and face_detected:
            print('\n[Voice Recognition Thread Ended]')
            voice_recog_thread = threading.Thread(target=voice_recog_process) # Re-define the voice recog thread
            face_frame = 0
            face_detected = False
    else: 
        if faces != (): # face detected
            face_frame += 1
        else: # no face detected
            face_frame = 0

    faces = face_cascade.detectMultiScale(
        image=gray_frame,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(100, 100)
    )
