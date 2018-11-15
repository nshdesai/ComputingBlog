title: Brief Intro to the AI behind Self Driving Cars
subtitle: How can cars navigate themselves in a complex environment?
date: 2018-11-15
author: Lucy An

_Note_: This post is a summary of the discussion about the
how self driving cars work and how they can be implemented ... 

### What is Reinforcement Learning?
----
Reinforcement learning is the process of the computer teaching _itself_ to complete a certain task.
Unlike other neural networks, this is based **entirely** on rewards.
to further understand this concept, you need to understand that there are two main objects in reinforcement learning:

* The Environment
* The Agent


### 1.The Environment
----

In reinforcement learning, the "environment" is usually the set of states that the "agent" can influence to gain rewards by conducting various "actions". In this case, the environment would be the physical simulation of the lanes, and grass, and the wall.

### 2. The Agent
----

This "agent" does **not** refer to the secret agents that you see in action movies, nor does it refer to the oxidizing/reducing agent that you learning in your chemistry class. The agent that we are talking about is something that can interact with its environment by making various actions to **maximize** its reward. The agent also need to have a current state, which indicates its position within the environment. Only with these basic functions can the agent and the environment make up to form a properly functional reinforcement learning program. In our simulation, the agent is the car. It can choose to turn at a specific angle, and it has a state, which is uniform speed.

![Image](https://www.kdnuggets.com/images/reinforcement-learning-fig1-700.jpg)

### Training the AI
----

In our driverless car simulation, the car needs to first **crash** multiple times to learn to drive on the road. The car receives more points the longer it stays "alive", and with enough trials, the AI will be so good that it will never crash in the **same** environment.

### When then, how does the model train?
----
How the AI is trained is by using features. Not having enough features will make the AI not "smart" enough, while **too much** will cause the learning to be extremely slow. It is also different from the traditional neural network in terms of its network structure. While before, there was the same amount of neurons in every layer. Reinforcement learning, however, have multiple neurons in the previous layer sending to a common neuron in its next layer. This allows for faster processing speed as well.
