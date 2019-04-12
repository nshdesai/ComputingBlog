title: Dismantling the Black box of Autonomous Driving
subtitle: Teaching vehicles to see a rapidly changing enviroment the way humans do
date: 2019-01-25
author: Nishkrit Desai


### Objective
----
* How much of autonomous driving is reality?  
* What underlying technology is driving this revolution? (no pun intended)
* How can I make one? (I will attempt to do this _live_ in the next session)


### How real is autonomous driving?
----

Most of it. Vehicles today treat the road as a video game, and by learning how to play this game
they become really good drivers. 

### How our system makes decisions
----
Every time the robot takes an action (a), in state (s), it receives a reward (r). In its head, it constantly updates its memory of rewards for taking certain actions in those states. This is called the policy. The policy is essentially how the agent makes decisions. All decisions are based around predicted rewards. Let’s pretend the robot has a huge table in its head. The table stores all of the states, with all possible actions, and predicted rewards for that state-action pair. At the beginning of training, all predicted rewards are set to 0.

### The Technology (Reinforcement learning)
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

### Training the Agent
----

In our driverless car simulation, the car needs to first **crash** multiple times to learn to drive on the road. The car receives more points the longer it stays "alive", and with enough trials, the AI will be so good that it will never crash in the **same** environment.

### Well then, how does the model perform?
----
How the AI is trained is by using features. Not having enough features will make the AI not "smart" enough, while **too much** will cause the learning to be extremely slow. It is also different from the traditional neural network in terms of its network structure. While before, there was the same amount of neurons in every layer. Reinforcement learning, however, have multiple neurons in the previous layer sending to a common neuron in its next layer. This allows for faster processing speed as well.
