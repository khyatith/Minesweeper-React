About the App :

1. This is a Minesweeper game. Initially on loading the page, you should see a select with 3 levels.
2. On selecting any level, it should load the board
3. The behaviour of the board when user wins or loses , is the same : the whole board gets revealed.
4. On Winning or losing, I have added Sounds to indicate the losing or the Winning

App Structure:

1. Create-React-App : I have used create react app with Flux.
2. Why Flux ? I have used flux just for the sake of it. The entire logic is actually in components for now.

Design choices:

1. The main component is Table, where the logic for creating the board is.
2. some of the functions are in helpers, so the components could be lightweight.

Tests:

1. Jest with Enzyme : I wanted to write tests for all the components, but due to time constraints , I just kept it very minimal for now

Features to look for :

1. Fade-In css transition
2. Use of gifs and sounds if user wins or loses
3. Tests

Improvements and New Features to be Added:

1. Definitely , refactoring. If there was more time I would refactor the component to move the logic to flux. 
2. Make the UI a bit better. Use different colors for showing numbers.
4. Writing more tests.
5. Adding flagging functionality.

How to Run the app
1. Extract the folder
2. cd minesweeper
3. Install node modules by using : yarn
4. yarn start -> The app should open on your localhost:3000

How to run Test
1. cd minesweeper
2. yarn test

Expected Warnings:
1. I am getting a warning when I run the tests : validateDOMNesting warning. I am not sure what that is, but anyhow all the tests should pass.