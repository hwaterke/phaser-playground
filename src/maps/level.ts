export const PATH_INDEX = 26

enum Wall {
  None = 0,
  Bottom = 1 << 0,
  Left = 1 << 1,
  Right = 1 << 2,
  Top = 1 << 3,
}

const WALLS = {
  [Wall.Bottom]: 60,
  [Wall.Bottom | Wall.Left]: 61,
  [Wall.Bottom | Wall.Left | Wall.Right]: 62,
  [Wall.Bottom | Wall.Right]: 63,
  [Wall.Left]: 64,
  [Wall.Right]: 66,
  [Wall.Top | Wall.Bottom]: 80,
  [Wall.Top | Wall.Bottom | Wall.Left]: 81,
  [Wall.Top | Wall.Bottom | Wall.Left | Wall.Right]: 82,
  [Wall.Top | Wall.Bottom | Wall.Right]: 83,
  [Wall.Top | Wall.Left]: 84,
  [Wall.Top]: 85,
  [Wall.Top | Wall.Right]: 86,
  [Wall.None]: 65,
}

const hasPathAbove = (level: number[][], x: number, y: number) =>
  level?.[y - 1]?.[x] === 0 ?? false

const hasPathBelow = (level: number[][], x: number, y: number) =>
  level?.[y + 1]?.[x] === 0 ?? false

const hasPathRight = (level: number[][], x: number, y: number) =>
  level?.[y]?.[x + 1] === 0 ?? false

const hasPathLeft = (level: number[][], x: number, y: number) =>
  level?.[y]?.[x - 1] === 0 ?? false

const getWallSprite = (level: number[][], x: number, y: number) => {
  let result = Wall.None
  if (hasPathAbove(level, x, y)) {
    result |= Wall.Top
  }

  if (hasPathBelow(level, x, y)) {
    result |= Wall.Bottom
  }

  if (hasPathRight(level, x, y)) {
    result |= Wall.Right
  }

  if (hasPathLeft(level, x, y)) {
    result |= Wall.Left
  }

  return WALLS[result] || 65
}

const toSprite = (level: number[][]) => {
  const spriteLevel: number[][] = []
  for (let y = 0; y < level.length; ++y) {
    spriteLevel.push([])
    for (let x = 0; x < level[y].length; ++x) {
      if (level[y][x] === 1) {
        spriteLevel[y][x] = getWallSprite(level, x, y)
      } else {
        spriteLevel[y][x] = PATH_INDEX
      }
    }
  }

  return spriteLevel
}

export const generateLevel = () =>
  toSprite([
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  ])
