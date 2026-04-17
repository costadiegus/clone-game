import * as Phaser from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import LevelScene from './scenes/LevelScene.js';
import EditorScene from './scenes/EditorScene.js';
import WorldMapScene from './scenes/WorldMapScene.js';

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

window.game = new Phaser.Game(config);
console.log('Game initialized');
