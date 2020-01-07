import Phaser from 'phaser'
import {getBottomCenterOfTileToWorld} from './maps/mapUtils'

export class Character {
  readonly sprite: Phaser.GameObjects.Sprite
  private target: [number, number] | undefined

  constructor(
    scene: Phaser.Scene,
    readonly spriteName: string,
    readonly tilemap: Phaser.Tilemaps.Tilemap,
    readonly speed: number = 1.5
  ) {
    this.sprite = scene.add.sprite(0, 0, spriteName)
    this.sprite.setOrigin(0.5, 1)
  }

  teleportToTile(x: number, y: number) {
    const [wx, wy] = getBottomCenterOfTileToWorld(this.tilemap, x, y)
    this.sprite.setX(wx)
    this.sprite.setY(wy)
  }

  hasTarget() {
    return !!this.target
  }

  setTarget(x: number, y: number) {
    this.target = [x, y]
  }

  /**
   * Moves the sprite towards the tile x,y
   * Returns true if the destination has been reached
   */
  moveTowardsTile(x: number, y: number, delta: number) {
    // Current sprite position in world
    const {x: currentX, y: currentY} = this.sprite

    // Destination in world
    const [dx, dy] = getBottomCenterOfTileToWorld(this.tilemap, x, y)

    // Distance between current position and destination
    const distanceLeft = Phaser.Math.Distance.Between(
      currentX,
      currentY,
      dx,
      dy
    )

    // Distance traveled
    const distance = (this.speed * this.tilemap.tileWidth * delta) / 1000

    if (distanceLeft > distance) {
      const toDestX = dx - currentX
      const toDestY = dy - currentY

      // Normalize
      const toDestLength = Math.sqrt(toDestX * toDestX + toDestY * toDestY)
      const toDestXN = toDestX / toDestLength
      const toDestYN = toDestY / toDestLength

      this.sprite.setX(currentX + toDestXN * distance)
      this.sprite.setY(currentY + toDestYN * distance)
      return false
    }

    // The sprite is close enough
    // Make sure the sprite is exactly at the destination
    this.sprite.setX(dx)
    this.sprite.setY(dy)
    return true
  }

  getTileX() {
    return this.tilemap.worldToTileX(this.sprite.x)
  }

  getTileY() {
    return this.tilemap.worldToTileY(this.sprite.y)
  }

  collidesWith(otherCharacter: Character) {
    return (
      this.getTileX() === otherCharacter.getTileX() &&
      this.getTileY() === otherCharacter.getTileY()
    )
  }

  update(time: number, delta: number) {
    if (this.target) {
      if (this.moveTowardsTile(this.target[0], this.target[1], delta)) {
        this.target = undefined
      }
    }
  }
}
