export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.playerDied = data.playerDied || 'Unknown';
  }

  create() {
    console.log('GameOverScene created - Player died:', this.playerDied);

    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#1a1a1a');

    const audio = this.game.audioManager;

    // ========================
    // 🎵 MÚSICA GAME OVER
    // ========================
    audio.playMusic(this, 'gameOverMusic', { fade: 600 });

    // ========================
    // 🧾 TÍTULO
    // ========================
    this.add.text(width / 2, 80, 'GAME OVER', {
      fontSize: '64px',
      fontStyle: 'bold',
      fill: '#ff6b6b',
      align: 'center'
    }).setOrigin(0.5);

    // ========================
    // 💀 MENSAGEM DE MORTE
    // ========================
    let deathMessage = '';
    let deathColor = '#ff6b6b';

    if (this.playerDied === 'fireboy') {
      deathMessage = 'Fireboy fell into a hazard!';
      deathColor = '#ff6b6b';
    } else if (this.playerDied === 'watergirl') {
      deathMessage = 'Watergirl fell into a hazard!';
      deathColor = '#4ecdc4';
    }

    this.add.text(width / 2, 180, deathMessage, {
      fontSize: '32px',
      fill: deathColor,
      align: 'center'
    }).setOrigin(0.5);

    // ========================
    // 🔁 RESTART BUTTON
    // ========================
    const restartButton = this.add.rectangle(width / 2 - 120, height / 2 + 80, 180, 60, 0x27ae60)
      .setInteractive({ useHandCursor: true });

    restartButton.on('pointerover', () => {
      restartButton.setFillStyle(0x229954);
    });

    restartButton.on('pointerout', () => {
      restartButton.setFillStyle(0x27ae60);
    });

    restartButton.on('pointerdown', () => {
      audio.playSfx('click');
      this.scene.start('LevelScene');
    });

    this.add.text(width / 2 - 120, height / 2 + 80, 'RESTART', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);

    // ========================
    // 🏠 MENU BUTTON
    // ========================
    const menuButton = this.add.rectangle(width / 2 + 120, height / 2 + 80, 180, 60, 0x2980b9)
      .setInteractive({ useHandCursor: true });

    menuButton.on('pointerover', () => {
      menuButton.setFillStyle(0x1f618d);
    });

    menuButton.on('pointerout', () => {
      menuButton.setFillStyle(0x2980b9);
    });

    menuButton.on('pointerdown', () => {
      audio.playSfx('click');
      //this.scene.start('MenuScene');
      this.scene.stop();
      this.scene.stop('LevelScene');
      this.scene.start('MenuScene');
    });

    this.add.text(width / 2 + 120, height / 2 + 80, 'MENU', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
  }
}