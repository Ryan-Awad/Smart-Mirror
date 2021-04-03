import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source:
    print('Listening')
    x = r.listen(source)
    x = r.recognize_google(x)
    print(f'You said: {x}')

if 'hello' in x:
    print('Response: Hi there!')
    