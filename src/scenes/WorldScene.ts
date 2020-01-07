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
    const map = this.make.tilemap({
      data: generateLevel(),
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    })
    const tileset = map.addTilesetImage('tileset-image')
    const layer = map.createStaticLayer(0, tileset, 0, 0)

    const player = new Character(this, 'mouse', map)
    player.teleportToTile(0, 0)

    const enemy = new Character(this, 'cat', map)
    enemy.teleportToTile(5, 4)
  }
}
