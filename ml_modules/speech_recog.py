import speech_recognition as sr
import json
from speech_algorithm import algorithm

while True:
    r = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            print('Listening')
            x = r.listen(source)
            x = r.recognize_google(x, language='en-US')
            print('You said: ' + str(x))
            y = algorithm(x)
    except sr.UnknownValueError:
        x = None
        y = "Sorry, I didn't quite get that..."

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
        print("Wrote speech recog to data.json!")
