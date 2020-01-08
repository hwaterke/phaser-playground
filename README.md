# phaser-playground

Welcome to this playground.
Let's learn phaser by building a game together.

## Helpers

While working on the game, do not forget to check the few utils already available for you.
Some utility functions around random elements are in `src/utils.ts` and many for the maps are in `src/maps/mapUtils.ts`.

Also, if you want to add other elements to the game, you can grab emojis from `https://emojipedia.org/apple/`.
You can then resize them to 64x64 with:

```
convert emoji.png -resize 64x64 resized_emoji.png
```

## Game additions

Here are stuff that you can implement in order to improve the game.

### More enemies (easy)

Add more enemies to the game

### Keyboard movements (easy)

For the moment the player is able to move when clicking (or touching on a mobile device) on a cell.
Add keyboards shortcut for PC players to move the player up/down/righ/left.

### Map generation (easy)

The initial map is quite boring as it never changes.
Lets generate a new random map each time the `Scene` starts.
Have a look at `generateLevel`

Note that the player, the enemies and the cheese are always placed at the same exact location as well
Place them randomly on your map (have a look at `src/maps/mapUtils.ts` for useful map utilities).

### Better ending (easy)

Add lives for our little mouse and a score to count the number of death and cheese you caught.
Display those in game to keep track of how you're doing.

### Multiple moves (intermediate)

The player only moves one cell at a time.
It would be nice if we could stack multiple moves so that the player follows a sequence of steps.

Hint: The `Character` stores a `target` for its current destination. We could maybe use an array to store multiple destinations?

### Better looking maps (intermediate)

The map only uses two tiles from the tileset.
The tileset provided contains a rich variety of sprites to use.
Modify the map to use corners for the walls.

### Kill the cats (intermediate)

Add another kind of enemies that chases the cats (wolves/foxes for examples)

### Spawn new enemies (easy)

To increase the difficulty of the game, new enemies should spawn as time goes by.
This will force the player to move fast.

### Bomberman (intermediate)

It would be nice if we could fight those enemies.
Add a keyboard shortcut to place a bomb on the floor.
After some time the bomb must explode. Anything close to the bomb at that time dies (player and enemies)
For example, the bomb could kill anything up to 3 tiles in each direction (left/right/up/down)

Extra: Add walls that the bombs destroy
Extra: Add a visual when the bomb explodes.

### Pathfinding (advanced)

It would be nice if the player was about to find a way to go on the clicked cell.
Implement a pathfinding algorithm (dijkstra or A\*) to define a path that the player can follow.

Extra: Add the pathfinding to the enemies so that they move toward the player for extra difficulty.

### Multiple levels (advanced)

Add stairs to allow the player to move from one level to another.

Hint: You can store the current level in the instance of the `WorldScene` and generate the map accordingly when the Scene starts.
Walking on stairs would restart the scene after modifying the current level.

# Infos

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project uses typescript and phaser 3.
