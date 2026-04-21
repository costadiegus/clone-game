export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    const { width } = this.cameras.main;
    const audio = this.game.audioManager;

    // 🔊 botão mute global
    this.muteBtn = this.add.image(width - 30, 30, audio.muted ? 'mute' : 'unmute')
      .setInteractive({ useHandCursor: true })
      .setScrollFactor(0) // 🔥 não move com câmera
      .setDepth(1000)
      .setScale(0.5);

    this.muteBtn.on('pointerdown', () => {
      audio.setMuted(!audio.muted);
      this.updateIcon();
    });

    this.muteBtn.on('pointerover', () => this.muteBtn.setScale(0.6));
    this.muteBtn.on('pointerout', () => this.muteBtn.setScale(0.5));

    this.updateIcon();
    this.game.events.on('audio:muteChanged', () => {
        this.updateIcon();
    });
  }

  updateIcon() {
    const audio = this.game.audioManager;
    this.muteBtn.setTexture(audio.muted ? 'mute' : 'unmute');
  }
}