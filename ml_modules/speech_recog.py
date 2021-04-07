import speech_recognition as sr
import json

r = sr.Recognizer()
try:
    with sr.Microphone() as source:
        print('Listening')
        x = r.listen(source)
        x = r.recognize_google(x)
        y = 'Test response!'
        print(f'You said: {x}')
        print(y)
except sr.UnknownValueError:
    x = None
    y = "Sorry, I didn't quite get that..."
    print(y)

with open('GUI/data/data.json', mode='r') as data_read:
    data = json.loads(data_read.readline())
    data[3] = {
        "command": x,
        "response": y
    }

with open('GUI/data/data.json', mode='w') as data_write:
    json.dump(data, data_write)
    print("Wrote speech recog to data.json!")