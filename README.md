# Starbomber
A full stack Javascript game and experiment in physics simulation and proximity detection.

## How to Play
[catcher23.github.io/starbomber][game]

[game]: http://catcher23.github.io/starbomber/

Go to this link and stay alive!

Beware, this game is fun and addictive!

![screenshot_1]

[screenshot_1]: ./images/ss1.png

## Technology
Technology used
- JavaScript
- HTML5 Canvas
- jQuery

### Game
Object-oriented design using prototypical inheritance

#### Enemy Movement AI
Enemies can detect the position of the user to modify shooting angle and give chase. Using Javascript's atan2 function, they modify their position based on where the user is. Their speeds are generated randomly upon creation, to ensure non-overlap.

#### Collision and proximity detection
There are collision and proximity detection algorithms for enemies, bullets, and ship. The velocity of objects in the game are affected upon impact with other objects, i.e. enemies move backward slightly when hit by bullets.

#### Assisted shooting
To solve the issue of exact shooting angles being required to hit the target, algorithmically assisted shooting increases accuracy within a shooting window. This means that when a bullet is within a certain distance of the enemy, the user's ship automatically shifts it's shooting angle to match with the position of the enemy on the grid.

### Backend
Currently, a simple RESTful backend on Rails is under development to keep high scores.

### Frontend
Frontend is built using jQuery, HTML, CSS.
