import Phaser from 'phaser'
import {getBottomCenterOfTileToWorld} from './maps/mapUtils'

export class Character {
  readonly sprite: Phaser.GameObjects.Sprite

  constructor(
    scene: Phaser.Scene,
    readonly spriteName: string,
    readonly tilemap: Phaser.Tilemaps.Tilemap
  ) {
    this.sprite = scene.add.sprite(0, 0, spriteName)
    this.sprite.setOrigin(0.5, 1)
  }

  teleportToTile(x: number, y: number) {
    const [wx, wy] = getBottomCenterOfTileToWorld(this.tilemap, x, y)
    this.sprite.setX(wx)
    this.sprite.setY(wy)
  }
}
