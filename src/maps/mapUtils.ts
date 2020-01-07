import {PATH_INDEX} from './level'

/**
 * Given the position of a tile, returns the bottom center in world coordinates
 */
export const getBottomCenterOfTileToWorld = (
  tilemap: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number
) => {
  const wx = tilemap.tileToWorldX(x) + tilemap.tileWidth / 2
  const wy = tilemap.tileToWorldY(y) + tilemap.tileHeight - 1
  return [wx, wy]
}

export const tileWithinMap = (
  tilemap: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number
) => {
  return x >= 0 && y >= 0 && x < tilemap.width && y < tilemap.height
}

/**
 * Given the position of a tile, returns whether or not the player can walk on it
 */
export const canWalkOn = (
  tilemap: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number
) => {
  return (
    tileWithinMap(tilemap, x, y) && tilemap.getTileAt(x, y).index === PATH_INDEX
  )
}

/**
 * Given the position of a tile and a destination tile, return neighbour tile in that direction
 */
export const getNeighbourTileTowards = (
  tilemap: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number,
  destinationX: number,
  destinationY: number
) => {
  const dx = destinationX - x
  const dy = destinationY - y

  if (Math.abs(dx) > Math.abs(dy)) {
    return [x + dx / (Math.abs(dx) || 1), y]
  }
  return [x, y + dy / (Math.abs(dy) || 1)]
}
