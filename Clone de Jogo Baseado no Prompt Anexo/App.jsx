import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import './App.css';
import MenuScene from './scenes/MenuScene';
import LevelScene from './scenes/LevelScene';
import EditorScene from './scenes/EditorScene';
import WorldMapScene from './scenes/WorldMapScene';

function App() {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [MenuScene, WorldMapScene, LevelScene, EditorScene],
      parent: 'game-container',
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="app-container">
      <div id="game-container"></div>
    </div>
  );
}

export default App;
