import cv2
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt
import numpy as np

model = keras.Sequential([
    layers.Conv2D(filters=32, kernel_size=(3,3), activation='relu', input_shape=(32,32,3)),
    layers.MaxPool2D(pool_size=(2,2), strides=(2,2)),
    layers.Conv2D(filters=64, kernel_size=(3,3), activation='relu'),
    layers.MaxPool2D(pool_size=(2,2), strides=(2,2)),
    layers.Conv2D(filters=64, kernel_size=(3,3), activation='relu'),
    layers.MaxPool2D(pool_size=(2,2), strides=(2,2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss=keras.losses.sparse_categorical_crossentropy, metrics=['accuracy'])
model.load_weights('cifar10_weights.hdf5')

class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

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
        #cv2.putText(frame, 'Face', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Getting ROI and preprocessing
        cropped_img = frame[y:y+h,x:x+w] # Crops to Region of Interest (ROI)
        cropped_img = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB) # CHANGE TO BGR2GRAY
        cropped_img = cv2.resize(cropped_img, (32,32)) # RESIZE IMG TO (128,128)
        cropped_img = tf.convert_to_tensor(cropped_img, dtype=tf.float32) / 255.0
        cropped_img = tf.expand_dims(cropped_img, axis=0)
        pred = model.predict(cropped_img)
        pred = np.argmax(pred)
        cv2.putText(frame, class_names[pred], (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow('SEGMENTATION CAM', frame)

    exit_key = cv2.waitKey(20) # ESC key 
    if exit_key == 27:
        break

video_capture.release()
cv2.destroyAllWindows()