export const getBottomCenterOfTileToWorld = (
  map: Phaser.Tilemaps.Tilemap,
  x: number,
  y: number
) => {
  const wx = map.tileToWorldX(x) + map.tileWidth / 2
  const wy = map.tileToWorldY(y) + map.tileHeight - 1
  return [wx, wy]
}
