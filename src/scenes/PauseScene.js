export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.game.audioManager.setMusicVolume(0.2);

    // overlay escuro
    this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.5);

    // título
    this.add.text(width/2, height/2 - 100, 'PAUSED', {
      fontSize: '48px',
      fill: '#fff'
    }).setOrigin(0.5);

    // botão resume
    const resumeBtn = this.add.text(width/2, height/2, 'RESUME', {
      fontSize: '28px',
      fill: '#0f0'
    }).setOrigin(0.5).setInteractive();

    resumeBtn.on('pointerdown', () => {
      this.game.audioManager.setMusicVolume(1);
      this.resumeGame();
    });

    // botão menu
    const menuBtn = this.add.text(width/2, height/2 + 60, 'MENU', {
      fontSize: '28px',
      fill: '#fff'
    }).setOrigin(0.5).setInteractive();

    menuBtn.on('pointerdown', () => {
      this.game.audioManager.setMusicVolume(1);
      this.scene.stop('LevelScene');
      this.scene.start('MenuScene');
      this.scene.stop();
    });

    // SPACE também volta
    this.input.keyboard.on('keydown-SPACE', () => {
      this.game.audioManager.setMusicVolume(1);
      this.resumeGame();
    });
  }

  resumeGame() {
    this.scene.stop();
    this.scene.resume('LevelScene');
  }
}