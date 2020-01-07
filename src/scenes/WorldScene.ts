import Phaser from 'phaser'
import {TILE_IMAGE, TILE_SIZE} from '../constants'
import {Character} from '../character'
import {generateLevel} from '../maps/level'
import {
  canWalkOn,
  getNeighbourTileTowards,
  tileWithinMap,
} from '../maps/mapUtils'

export class WorldScene extends Phaser.Scene {
  private player: Character | undefined

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
    const tilemap = this.make.tilemap({
      data: generateLevel(),
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    })
    const tileset = tilemap.addTilesetImage(
      'tileset-image',
      'tileset-image',
      64,
      64,
      1,
      2
    )
    const layer = tilemap.createStaticLayer(0, tileset, 0, 0)

    // Create player
    this.player = new Character(this, 'mouse', tilemap)
    this.player.teleportToTile(0, 0)

    // Create enemy
    const enemy = new Character(this, 'cat', tilemap)
    enemy.teleportToTile(5, 4)

    // Camera setup
    this.cameras.main.setBounds(
      0,
      0,
      tilemap.widthInPixels,
      tilemap.heightInPixels
    )
    this.cameras.main.startFollow(this.player.sprite, false, 0.3, 0.3)

    // Configure input
    this.input.on(
      'pointerdown',
      (pointer: {x: number; y: number}) => {
        const {x, y} = pointer
        const {x: worldX, y: worldY} = this.cameras.main.getWorldPoint(x, y)
        const clickedTileX = tilemap.worldToTileX(worldX)
        const clickedTileY = tilemap.worldToTileY(worldY)

        // Is the player already moving ?
        if (this.player?.hasTarget()) {
          return
        }

        if (tileWithinMap(tilemap, clickedTileX, clickedTileY)) {
          // User clicked on tile [clickedTileX, clickedTileY]

          // What is the next cell in the direction we clicked?
          const nt = getNeighbourTileTowards(
            tilemap,
            this.player!.getTileX(),
            this.player!.getTileY(),
            clickedTileX,
            clickedTileY
          )

          // Can we go there?
          if (canWalkOn(tilemap, nt[0], nt[1])) {
            this.player?.setTarget(nt[0], nt[1])
          }
        }
      },
      this
    )
  }

  update(time: number, delta: number): void {
    this.player?.update(time, delta)
  }
}
