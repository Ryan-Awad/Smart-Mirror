import speech_recognition as sr
import json
from speech_algorithm import algorithm

aura_called = False

while True:
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            x = r.listen(source)
            x = r.recognize_google(x, language='en-US')
            y = None
            if str(x).upper() == 'AURA' and not aura_called:
                y = 'Listening'
                aura_called = True
            elif aura_called:
                y = algorithm(x)
                aura_called = False
    except sr.UnknownValueError:
        if aura_called:
            x = None
            y = "Sorry, I didn't quite get that..."
        else:
            x = None
            y = None

    # writing the speech data to data.json
    with open('GUI/data/data.json', mode='r') as data_read:
        if x:
            x = x.capitalize()
            if x[-1:] != '.':
                x += '.'

        data = json.loads(data_read.readline())    
        data[3] = {
            "command": x,
            "response": y
        }

    with open('GUI/data/data.json', mode='w') as data_write:
        json.dump(data, data_write)
