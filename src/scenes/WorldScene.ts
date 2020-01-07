import Phaser from 'phaser'
import {TILE_IMAGE, TILE_SIZE} from '../constants'

export class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene')
  }

  preload() {
    // Load tileset image for the maps
    this.load.image('tileset-image', `/assets/tilesets/${TILE_IMAGE}.png`)
  }

  create() {
    const X = 65
    const O = 26

    const level = [
      [O, O, X, X, X, X, X, X, X, X, X],
      [X, O, X, O, X, O, X, O, O, O, X],
      [X, O, O, O, X, O, X, O, X, O, X],
      [X, X, X, O, X, O, X, O, X, O, O],
      [X, O, O, O, O, O, X, O, X, X, X],
      [X, O, X, X, X, X, X, O, O, O, X],
      [X, O, O, X, O, X, X, X, O, X, X],
      [X, X, O, O, O, O, O, X, O, O, X],
      [X, X, O, X, O, X, X, X, X, O, X],
      [X, O, O, X, O, O, O, O, O, O, X],
      [X, X, X, X, X, X, X, X, X, X, X],
    ]

    const map = this.make.tilemap({
      data: level,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    })
    const tileset = map.addTilesetImage('tileset-image')
    const layer = map.createStaticLayer(0, tileset, 0, 0)
  }
}
