import cv2
import matplotlib.pyplot as plt

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
        minSize=(30, 30)
    )

    cv2.putText(frame, f"FPS: {fps}", (10, 15), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0), 1)

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 1)
        cv2.putText(frame, 'Face', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Getting ROI and preprocessing
        cropped_img = frame[y:y+h,x:x+w] # Crops to Region of Interest (ROI)
        cropped_img = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2GRAY)
        cropped_img = cv2.resize(cropped_img, (128,128)) # RESIZE IMG TO (128,128)

    cv2.imshow('SEGMENTATION CAM', frame)

    exit_key = cv2.waitKey(20) # ESC key 
    if exit_key == 27:
        break

video_capture.release()
cv2.destroyAllWindows()