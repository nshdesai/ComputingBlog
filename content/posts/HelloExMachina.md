title: Introduction to CNNs
subtitle: More rigourous testing of application
author: Nishkrit Desai
date: 2018-11-06

# Convolutional Neural Networks:  An Introduction
----
We will use the [MNIST](http://yann.lecun.com/exdb/mnist/) dataset to build a Simple Deep Learning model
that can recognise handwritten digits.

----
Author: Nishkrit Desai


```python
# Make all the imports we will need to build our model
# These libraries give us all the good stuff we need to create "AI"
import numpy as np
import keras
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras import backend as K

#We need this library to plot our results and peek at some of the pictures
import matplotlib.pyplot as plt
```

    Using TensorFlow backend.


## Download the MNIST dataset
----

### A little bit about Testing and Training Data
The Training data is used to **teach** the model. Whereas, the testing data is used to **measure** how good (or bad) the model is.

**Rule of Thumb**: *Generally* you would want to divide the training and testing data in the ratio 70/30 of the entire population.

**Note**: There is also something called *validation data*, but this is not *very* relevant to us at the moment.

----
### About plotting the data
If the syntax used to plot the data seems a bit unfamiliar, don't panic.
> "You will become a normal thing over time!"

Sometimes it looks ugly, but matplotlib really helps us understand how the data looks.

----

### On the Size of the Images
Note that the size of the images in this case is 28x28 and they are all grayscale. This simplifies the data to fit our *simple* model.


```python
#This gives us the training and testing samples
(x_train, y_train), (x_test, y_test) = mnist.load_data()

#Let's plot some of these images in grayscale to see what they look like
#Get and store all the images in different subplots
for image in range(4):
    plt.subplot(221 + image)
    plt.imshow(x_train[image + 50], cmap=plt.get_cmap('gray'))

# Finally show all the images
plt.show()

#Finally lets save the testing dataset as a different variable so that we can plot our data later
orig_test_data_x, orig_test_data_y = x_test, y_test
```


![png](HelloExMachina_files/HelloExMachina_3_0.png)


### Defining Constants and Preprocessing Data
There are some important things to do before we can get to the good stuff.
Data preprocessing is one of the _most important_ tasks while dealing with Machine Learning models

----

#### What are our constants ?
Here we pick out things that don't change and store them in variables.
Examples: Image Size, Epochs, etc.

In this case, our constants are the Image Size, #Epochs, Batch Size, #Classes

----

#### How do we preprocess our data?

We have transform all our values to be in the given range (_why?_):
$$ x \thinspace \epsilon \thinspace [0, 1]$$

We use this formula to do what we stated above:
![Image](https://wikimedia.org/api/rest_v1/media/math/render/svg/0222c9472478eec2857b8bcbfa4148ece4a11b84)

Also just to mention two other terms: **One-hot vectors** and **Channel order preservation**


```python
image_rows, image_cols = 28, 28

batch_size = 128
num_classes = 10
epochs = 6

# Reshape the data to have the shape: [samples][pixels][shape][shape]
if K.image_data_format() == 'channels_first':
    x_train = x_train.reshape(x_train.shape[0], 1, image_rows, image_cols)
    x_test = x_test.reshape(x_test.shape[0], 1, image_rows, image_cols)
    input_shape = (1, img_rows, img_cols)
else:
    x_train = x_train.reshape(x_train.shape[0], image_rows, image_cols, 1)
    x_test = x_test.reshape(x_test.shape[0], image_rows, image_cols, 1)
    input_shape = (image_rows, image_cols, 1)

# Normalize the pixel values of each image (our model is very "pick-y")
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

print("The labels initially look something like this: \n", y_train[0])

# Lets convert all the outputs to be categorical one-hot vectors
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

#Peek at some of the data we have
#print("The Images now look something like this: ", x_train[0])
print("The one-hot vector labels look something like this: \n", y_train[0])
print("The shape of our input is: ", input_shape)
```

    x_train shape: (60000, 28, 28, 1)
    60000 train samples
    10000 test samples
    The labels initially look something like this:
     5
    The one-hot vector labels look something like this:
     [0. 0. 0. 0. 0. 1. 0. 0. 0. 0.]
    The shape of our input is:  (28, 28, 1)


### Building the AI model
The people and Google have made it really easy for us to build models. But this section is the **most** important section of the entire project.

----

We are going to build this model with python.
![ConvNetImage](data:image/png;base64,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)

#### Step by Step, Line by Line, Image by Image, Layer by Layer

Since all of us are _true_ computer scientists, we will use a method to build the model. Instead of doing it line by line.

----

### A little bit on activations

For all the convolutional layers we will use the **ReLU** activation function. It looks something like this:

$$ R(z) \thinspace = \thinspace max(0, z) $$

For the last fully connected layer we are going to use the friendly-neighbourhood **Softmax** function:

$$ \sigma(z) \thinspace = \thinspace \frac {1}{1 + e^{-z}} $$

----

### The Dropout layer

This is used to make sure that the Neural Net does _not_ get "addicted" to certain patterns/images or pixel values

![DropoutImage](https://leonardoaraujosantos.gitbooks.io/artificial-inteligence/content/more_images/Dropout.png)

----

### What the Kernels (Weights) look like

_If_ we were to visualize the weights that the trained model gives us, they would look something like this:

<img src="http://cs231n.github.io/assets/cnnvis/filt1.jpeg" alt="filt1" width="200" height="400"/>

We can also see that as we go to deeper layers the weights become more _complex_ and _intricate_. More importantly, they become more _subtle_, this is clearly seen in the image below. These are the weights after activations have been applied.

<img src="http://cs231n.github.io/assets/cnnvis/act1.jpeg" alt="act1" width="200" height="400"/>

Similarly the weights of layer 5 look something like this (Again, this is post-activation):

<img src="http://cs231n.github.io/assets/cnnvis/act2.jpeg" alt="act2" width="200" height="400"/>

----
### What does all this add up to?

All this math and code, is to do **one** _simple_ thing: Simulate _how_ humans _see_ (well, on some level)...

----
Now that we have created the Neural Net, let us begin to make it smart. Onward and Upward!

**Note** : _Look at the number of trainable parameter within our Neural Network. Mind Blowing, Isn't it?_


```python
#Build the model
model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3),
                 activation='relu',
                 input_shape=input_shape))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))

model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.Adadelta(),
              metrics=['accuracy'])

print("Summary of model: ")
model.summary()
```

    Summary of model:
    _________________________________________________________________
    Layer (type)                 Output Shape              Param #   
    =================================================================
    conv2d_1 (Conv2D)            (None, 26, 26, 32)        320       
    _________________________________________________________________
    conv2d_2 (Conv2D)            (None, 24, 24, 64)        18496     
    _________________________________________________________________
    max_pooling2d_1 (MaxPooling2 (None, 12, 12, 64)        0         
    _________________________________________________________________
    dropout_1 (Dropout)          (None, 12, 12, 64)        0         
    _________________________________________________________________
    flatten_1 (Flatten)          (None, 9216)              0         
    _________________________________________________________________
    dense_1 (Dense)              (None, 128)               1179776   
    _________________________________________________________________
    dropout_2 (Dropout)          (None, 128)               0         
    _________________________________________________________________
    dense_2 (Dense)              (None, 10)                1290      
    =================================================================
    Total params: 1,199,882
    Trainable params: 1,199,882
    Non-trainable params: 0
    _________________________________________________________________


### Optimization, Optimization and more Optimization ...
Now that the Neural Net exists. We need to **train** it so that it becomes _good_ at seeing numbers.

### Loss function to Optimize our model
We will be using the Categorical Crossentropy Loss function to Optimize our model. Don't panic:

![CrossEntropy](https://gombru.github.io/assets/cross_entropy_loss/intro.png)

**Food for thought** : Think about what we are trying to do with the loss function.(This is the _very_ basis of a Neural Net)

### Let's talk Strategy
Even with a strong mathematical backing, our model still needs to be trained **optimally** (_why?_)
To do this we need to use a gradient descent optimization technique.
Here we will use **AdaDelta**.

![Adadelta](https://i.stack.imgur.com/aojCe.png)

This algorithm will (hopefully) help us find the _global_ minimum of your loss function

![GlobalMin](https://qph.fs.quoracdn.net/main-qimg-7adad11c6ee947a96e917e2a8205392d.webp)

----


```python
model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          validation_data=(x_test, y_test))
```

    Train on 60000 samples, validate on 10000 samples
    Epoch 1/6
    60000/60000 [==============================] - 44s 732us/step - loss: 0.2664 - acc: 0.9187 - val_loss: 0.0637 - val_acc: 0.9803: 0.2706
    Epoch 2/6
    60000/60000 [==============================] - 34s 569us/step - loss: 0.0909 - acc: 0.9735 - val_loss: 0.0454 - val_acc: 0.9839
    Epoch 3/6
    60000/60000 [==============================] - 34s 572us/step - loss: 0.0660 - acc: 0.9803 - val_loss: 0.0413 - val_acc: 0.9863 - ETA: 1s
    Epoch 4/6
    60000/60000 [==============================] - 35s 581us/step - loss: 0.0542 - acc: 0.9840 - val_loss: 0.0330 - val_acc: 0.9882
    Epoch 5/6
    60000/60000 [==============================] - 36s 599us/step - loss: 0.0466 - acc: 0.9864 - val_loss: 0.0382 - val_acc: 0.9871
    Epoch 6/6
    60000/60000 [==============================] - 34s 560us/step - loss: 0.0406 - acc: 0.9880 - val_loss: 0.0281 - val_acc: 0.99020398





    <keras.callbacks.History at 0x198ce3d8cf8>



### Evaluating the accuracy of the Neural Net
----

We will use the accuracy metric to determine how good our model is ( >90% is _really_ good). All the measurements will be done using the testing dataset.

Let's see how we did!


```python
score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0]) #The value of our loss function on the testing dataset
print('Test accuracy: %.3f%%'%(score[1] * 100)) # The accuracy of the model based on the number of correct predictions
#Do these numbers seem suspicious? If so, why?
```

    Test loss: 0.028128457714716205
    Test accuracy: 99.020%


### Using the model to make actual predictions

----

We will look at the image and try to see what is written in it (with our eyes). Then, we will give the same image to the computer, and ask it what it sees. Let's have a look at what the results are ...

**Caution**: Beware of _one-hot_ encoded vectors while formatting the output


**Food for thought**: _How can the output be made to be more attractive/interactive?_

----

**Note**: _To "look" at a different image, you can change the value of_ `image_index` _to be anything between 1 and 10000_


```python
image_index = 257
#Lets plot one of the testing images too (we will save this for later)
plot_test_image = orig_test_data_x[image_index] #Pick the 258th Image
test_label = orig_test_data_y[image_index] #Pick the corresponding label

#This is the image we will give the model
test_image = np.expand_dims(x_test[image_index, :, :, :], axis=0)

print("This is the number we will show the computer... \n")
plt.imshow(plot_test_image, cmap=plt.get_cmap('gray'))
plt.show()

#results = model.predict(test_image)
#print("I am looking at the number: ", results)
#Why is the above output so weird looking? Think about the what predict method might be doing...

result = model.predict_classes(test_image)[0]
print("\n============= PREDICTION ================\n")
print("The number in the image is likely to be: ", result)

#Show the actual value of the label (for debugging)
#print("The label of the image is: ", test_label)
```

    This is the number we will show the computer...




![png](HelloExMachina_files/HelloExMachina_13_1.png)



    ============= PREDICTION ================

    The number in the image is likely to be:  8
