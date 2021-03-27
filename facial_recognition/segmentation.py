import cv2

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
video_capture = cv2.VideoCapture(0)

while True:
    fps = video_capture.get(cv2.CAP_PROP_FPS)
    ret, frame = video_capture.read()
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale( # ** PLAY WITH THESE VALUES! **
        image=gray_frame,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(100, 100)
    )

    cv2.putText(frame, f"FPS: {fps}", (10, 15), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0), 1)

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 1)
        cv2.putText(frame, 'Face', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow('SEGMENTATION CAM', frame)

    exit_key = cv2.waitKey(20) # ESC key 
    if exit_key == 27:
        break

video_capture.release()
cv2.destroyAllWindows()