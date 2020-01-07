import Phaser from 'phaser'
import {TILE_IMAGE, TILE_SIZE} from '../constants'
import {Character} from '../character'
import {generateLevel} from '../maps/level'
import {
  canWalkOn,
  getNeighbourTileTowards,
  getWalkableNeighbourTiles,
  tileWithinMap,
} from '../maps/mapUtils'
import {sampleFromArray} from '../utils'

export class WorldScene extends Phaser.Scene {
  private player: Character | undefined
  private enemies: Character[] = []
  private cheese: Character | undefined
  private tilemap: Phaser.Tilemaps.Tilemap | undefined

  constructor() {
    super('WorldScene')
  }

  preload() {
    // Load tileset image for the maps
    this.load.image('tileset-image', `/assets/tilesets/${TILE_IMAGE}.png`)
    this.load.image('mouse', '/assets/mouse.png')
    this.load.image('cat', '/assets/cat.png')
    this.load.image('cheese', '/assets/cheese.png')
  }

  create() {
    this.tilemap = this.make.tilemap({
      data: generateLevel(),
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    })
    const tileset = this.tilemap.addTilesetImage(
      'tileset-image',
      'tileset-image',
      64,
      64,
      1,
      2
    )
    this.tilemap.createStaticLayer(0, tileset, 0, 0)

    // Create player
    this.player = new Character(this, 'mouse', this.tilemap)
    this.player.teleportToTile(0, 0)

    // Create the cheese
    this.cheese = new Character(this, 'cheese', this.tilemap)
    this.cheese.teleportToTile(9, 9)

    // Create enemy
    this.enemies = []
    const enemy = new Character(this, 'cat', this.tilemap)
    enemy.teleportToTile(5, 4)
    this.enemies.push(enemy)

    // Camera setup
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    )
    this.cameras.main.startFollow(this.player.sprite, false, 0.3, 0.3)

    // Configure input
    this.input.on(
      'pointerdown',
      (pointer: {x: number; y: number}) => {
        const {x, y} = pointer
        const {x: worldX, y: worldY} = this.cameras.main.getWorldPoint(x, y)
        const clickedTileX = this.tilemap!.worldToTileX(worldX)
        const clickedTileY = this.tilemap!.worldToTileY(worldY)

        // Is the player already moving ?
        if (this.player?.hasTarget()) {
          return
        }

        if (tileWithinMap(this.tilemap!, clickedTileX, clickedTileY)) {
          // User clicked on tile [clickedTileX, clickedTileY]

          // What is the next cell in the direction we clicked?
          const nt = getNeighbourTileTowards(
            this.tilemap!,
            this.player!.getTileX(),
            this.player!.getTileY(),
            clickedTileX,
            clickedTileY
          )

          // Can we go there?
          if (canWalkOn(this.tilemap!, nt[0], nt[1])) {
            this.player?.setTarget(nt[0], nt[1])
          }
        }
      },
      this
    )
  }

  update(time: number, delta: number): void {
    this.player?.update(time, delta)

    this.enemies.forEach(enemy => {
      if (!enemy.hasTarget()) {
        const possibleDestinations = getWalkableNeighbourTiles(
          this.tilemap!,
          enemy.getTileX(),
          enemy.getTileY()
        )
        const destination = sampleFromArray(possibleDestinations)
        enemy.setTarget(destination[0], destination[1])
      }
      enemy.update(time, delta)
    })

    // Does the player collide with any enemy?
    const collidesWithEnemy = this.enemies.some(enemy =>
      enemy.collidesWith(this.player!)
    )
    if (collidesWithEnemy) {
      // Game over
      console.log('Game over')
      this.scene.restart()
    }

    if (this.player!.collidesWith(this.cheese!)) {
      console.log('Congrats')
      this.scene.restart()
    }
  }
}
