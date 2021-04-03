import speech_recognition as sr

r = sr.Recognizer()
with sr.Microphone() as source:
    print('Listening')
    x = r.listen(source)
    x = r.recognize_google(x)
    print(x)