# Game Description
It is a simple game in which, you have to jump over a bar. If you touch the bar, then game is over. If you go outside th screen, game is over.



# How AI learns
Using Tensorflow.js, the game is modified in order for the AI to learn, how to jump. If the Bot touches the bar or go out the screen, it gets punishment by getting killed. If it jumps, it gets reward. After,
death of all the bots in one generation, new generation is created by mutating random Bots from the previous generation. 
This process is repeated until the user stops it. 



# Observations
In the starting generations 1-4, AI can only move forward. After which, some of the bots starts jumping to a very low height.
After 100 generation, Bots can be seen to jump atleast 3-4 bars.
On average, after 300 generations, Bots learned to jump and to even go backwards, to slow their speed, if the consecutive bars are close.
