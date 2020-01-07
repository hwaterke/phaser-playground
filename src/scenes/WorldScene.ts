import Phaser from 'phaser'
import {TILE_IMAGE, TILE_SIZE} from '../constants'
import {Character} from '../character'
import {generateLevel} from '../maps/level'

export class WorldScene extends Phaser.Scene {
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
    const tileset = tilemap.addTilesetImage('tileset-image')
    const layer = tilemap.createStaticLayer(0, tileset, 0, 0)

    // Create player
    const player = new Character(this, 'mouse', tilemap)
    player.teleportToTile(0, 0)

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
    this.cameras.main.startFollow(player.sprite, false, 0.3, 0.3)
  }
}
