import '../index.css'
import React, {useEffect} from 'react'
import Phaser from 'phaser'
import {WorldScene} from '../scenes/WorldScene'
import {TILE_SIZE} from '../constants'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

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

  return <Container id={PHASER_GAME_DIV_ID} />
}

export const App = React.memo(PhaserContainer)
