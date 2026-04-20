export default class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    const audio = this.game.audioManager;

    // 🔲 fundo preto
    this.cameras.main.setBackgroundColor('#000');

    // 🖼️ logo
    const logo = this.add.image(width / 2, height / 2, 'splash')
      .setAlpha(0)
      .setScale(0.9);

    // 🔊 som do estúdio (curto)
    //const introSound = this.sound.add('intro'); // carregar no preload

    // =========================
    // 🎬 TIMELINE CINEMATOGRÁFICA
    // =========================

    this.time.delayedCall(300, () => {

      // fade in + leve zoom
      this.tweens.add({
        targets: logo,
        alpha: 1,
        scale: 1,
        duration: 1200,
        ease: 'Cubic.easeOut'
      });

      // tocar som sincronizado
      //introSound.play({ volume: 0.8 });

    });

    // ✨ efeito leve de "respiração"
    this.tweens.add({
      targets: logo,
      scale: 1.03,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // =========================
    // ⏱️ Depois do logo → UI
    // =========================

    this.time.delayedCall(2500, () => {

      const text = this.add.text(width / 2, height - 100, 'CLIQUE PARA INICIAR', {
        fontSize: '28px',
        fill: '#ffffff'
      }).setOrigin(0.5).setAlpha(0);

      // fade do texto
      this.tweens.add({
        targets: text,
        alpha: 1,
        duration: 800
      });

      // piscando
      this.tweens.add({
        targets: text,
        alpha: 0.3,
        duration: 800,
        yoyo: true,
        repeat: -1
      });

      // clique
      this.input.once('pointerdown', async () => {
        await audio.unlock();

        audio.playSfx('click');

        // fade out cinematográfico
        this.cameras.main.fadeOut(800);

        this.time.delayedCall(800, () => {
          this.scene.start('MenuScene');
        });
      });

    });

    // fade in inicial
    this.cameras.main.fadeIn(800);
  }
}