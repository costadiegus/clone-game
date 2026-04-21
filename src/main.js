
import PreloadScene from './scenes/PreloadScene.js';
import SplashScene from './scenes/SplashScene.js';
import MenuScene from './scenes/MenuScene.js';
import LevelScene from './scenes/LevelScene.js';
import EditorScene from './scenes/EditorScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import PauseScene from './scenes/PauseScene.js';
import AudioManager from './game/AudioManager.js';
import UIScene from './scenes/UIScene.js';

console.log('Game script loading...');

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
  scene: [PreloadScene, SplashScene, MenuScene, LevelScene, EditorScene, GameOverScene, PauseScene, UIScene],
  parent: 'game-container',
};

console.log('Creating game with config:', config);
const game = new Phaser.Game(config);
// 🔊 injeta o AudioManager global
game.audioManager = new AudioManager(game);

window.game = game;
console.log('Game created successfully!');

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
