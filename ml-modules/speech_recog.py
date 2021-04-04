import speech_recognition as sr

r = sr.Recognizer()
try:
    with sr.Microphone() as source:
        print('Listening')
        x = r.listen(source)
        x = r.recognize_google(x)
        print(f'You said: {x}')
except sr.UnknownValueError:
    print("Sorry, I didn't quite get that...")
    