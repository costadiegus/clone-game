export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    console.log('MenuScene created');

    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#2c3e50');

    const audio = this.game.audioManager;
    

    // ========================
    // 🔓 UNLOCK (apenas se necessário)
    // ========================
    if (!audio.isUnlocked) {
      const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8)
        .setDepth(1000);

      const text = this.add.text(width / 2, height / 2, 'CLIQUE PARA INICIAR', {
        fontSize: '32px',
        fill: '#fff'
      })
      .setOrigin(0.5)
      .setDepth(1001);

      this.input.once('pointerdown', async () => {
        await audio.unlock();
        audio.playMusic(this, 'backgroundMusic', { fade: 800 });

        overlay.destroy();
        text.destroy();
      });

    } else {
      // já desbloqueado → toca direto
      audio.playMusic(this, 'backgroundMusic', { fade: 800 });
    }

    // ========================
    // 🧾 TÍTULOS
    // ========================
    this.add.text(width / 2, 80, 'Fireboy & Watergirl', {
      fontSize: '48px',
      fontStyle: 'bold',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(width / 2, 140, 'Forest Temple', {
      fontSize: '32px',
      fill: '#ecf0f1',
      align: 'center'
    }).setOrigin(0.5);

    // ========================
    // ▶️ PLAY BUTTON
    // ========================
    const playButton = this.add.rectangle(width / 2, 250, 200, 60, 0x27ae60)
      .setInteractive({ useHandCursor: true });

    playButton.on('pointerover', () => {
      playButton.setFillStyle(0x229954);
    });

    playButton.on('pointerout', () => {
      playButton.setFillStyle(0x27ae60);
    });

    playButton.on('pointerdown', () => {
      audio.playSfx('click');
      this.scene.start('LevelScene');
    });

    this.add.text(width / 2, 250, 'PLAY', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);

    // ========================
    // 🛠️ EDITOR BUTTON
    // ========================
    const editorButton = this.add.rectangle(width / 2, 340, 200, 60, 0x2980b9)
      .setInteractive({ useHandCursor: true });

    editorButton.on('pointerover', () => {
      editorButton.setFillStyle(0x1f618d);
    });

    editorButton.on('pointerout', () => {
      editorButton.setFillStyle(0x2980b9);
    });

    editorButton.on('pointerdown', () => {
      audio.playSfx('click');
      this.scene.launch('EditorScene');
      this.scene.pause();
    });

    this.add.text(width / 2, 340, 'EDITOR', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);

    // ========================
    // ℹ️ CONTROLES
    // ========================
    this.add.text(
      width / 2,
      480,
      'Fireboy (Red) - Arrow Keys | Watergirl (Blue) - A, W, D',
      {
        fontSize: '14px',
        fill: '#bdc3c7',
        align: 'center'
      }
    ).setOrigin(0.5);
  }
}