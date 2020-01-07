import {PATH_INDEX} from './level'
import {rand, shuffleArray} from '../utils'
import {range} from 'ramda'

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

/**
 * Given a tile position, return an array of neighbour tile positions
 */
export const getNeighbourTiles = (
  tilemap: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number
) => {
  const neighbours: [number, number][] = []

  const deltas = [-1, 0, 1]
  for (const dx of deltas) {
    for (const dy of deltas) {
      if ((dx !== 0 || dy !== 0) && (dx === 0 || dy === 0)) {
        neighbours.push([x + dx, y + dy])
      }
    }
  }

  return neighbours
}

/**
 * Given a tile position, return an array of neighbour tile positions
 */
export const getWalkableNeighbourTiles = (
  tilemap: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number
) => {
  return getNeighbourTiles(tilemap, x, y).filter(([tx, ty]) =>
    canWalkOn(tilemap, tx, ty)
  )
}

export const getRandomTile = (tilemap: Phaser.Tilemaps.Tilemap) => {
  const x = rand(0, tilemap.width)
  const y = rand(0, tilemap.height)
  return [x, y]
}

export const getRandomWalkableTile = (
  tilemap: Phaser.Tilemaps.Tilemap
): [number, number] | null => {
  const xs = shuffleArray(range(0, tilemap.width))
  const ys = shuffleArray(range(0, tilemap.height))
  for (const x of xs) {
    for (const y of ys) {
      if (canWalkOn(tilemap, x, y)) {
        return [x, y]
      }
    }
  }
  return null
}
