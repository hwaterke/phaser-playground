import React, {useEffect} from 'react'
import Phaser from 'phaser'
import {WorldScene} from '../scenes/WorldScene'
import {TILE_SIZE} from '../constants'

const PHASER_GAME_DIV_ID = 'phaser'

export const PhaserContainer: React.FC = () => {
  useEffect(() => {
    const config = {
      parent: PHASER_GAME_DIV_ID,
      width: Math.min(window.innerWidth, 11 * TILE_SIZE),
      height: Math.min(window.innerHeight, 11 * TILE_SIZE),
      scene: [WorldScene],
    }
    new Phaser.Game(config)
  }, [])

  return <div id={PHASER_GAME_DIV_ID} />
}

export const App = React.memo(PhaserContainer)
