// Import utilities
import AnimationManager from '../utils/AnimationManager.js';
import ParticleFactory from '../utils/ParticleFactory.js';

export default class Watergirl {
  /**
   * @param {Phaser.Scene} scene - A cena Phaser que instancia o Watergirl
   * @param {number} x - Posição X inicial
   * @param {number} y - Posição Y inicial
   */
  constructor(scene, x, y) {
    this.scene = scene;

    // Create water particles using factory
    this.particles = ParticleFactory.createWaterEmitter(scene, 'waterParticleTex');

    // Ensure water particle texture exists (create if needed)
    if (!scene.textures.exists('waterParticleTex')) {
      const waterGfx = scene.make.graphics({ x: 0, y: 0, add: false });
      waterGfx.fillStyle(0x4ecdc4, 1);
      waterGfx.fillCircle(4, 4, 4);
      waterGfx.generateTexture('waterParticleTex', 8, 8);
      waterGfx.destroy();
    }

    // Cria sprite com física
    this.sprite = scene.add.sprite(x, y, 'watergirl-idle');
    this.sprite.setScale(1);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setBounce(0.2);
    this.sprite.body.setCollideWorldBounds(true);

    // Metadados de estado
    this.sprite.type = 'watergirl';
    this.sprite.isAlive = true;
    this.sprite.isMoving = false;
    this.sprite.isJumping = false;

    // Create walk animation using AnimationManager
    AnimationManager.createFromRange(scene, 'watergirl-walk-anim', 'watergirl-walk', 0, 3, 8, -1);

    // Teclas de controle
    this.keys = {
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    };
    this.sprite.keys = this.keys;
  }

  // --- Atalhos de acesso às propriedades do sprite ---

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }
  get body() { return this.sprite.body; }
  get isAlive() { return this.sprite.isAlive; }
  set isAlive(v) { this.sprite.isAlive = v; }
  get isMoving() { return this.sprite.isMoving; }
  set isMoving(v) { this.sprite.isMoving = v; }
  get isJumping() { return this.sprite.isJumping; }
  set isJumping(v) { this.sprite.isJumping = v; }

  /** Delega chamadas de método ao sprite subjacente */
  play(key) { return this.sprite.play(key); }
  stop() { return this.sprite.stop(); }
  setTexture(key) { return this.sprite.setTexture(key); }
  setFlipX(value) { return this.sprite.setFlipX(value); }
  setVisible(value) { return this.sprite.setVisible(value); }

  /**
   * Lógica de movimento e animação — chamada a cada frame pelo update da cena.
   */
  update() {
    const sprite = this.sprite;
    const keys = this.keys;

    sprite.body.setVelocityX(0);
    let moving = false;

    if (keys.left.isDown) {
      sprite.body.setVelocityX(-200);
      moving = true;
      sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(200);
      moving = true;
      sprite.setFlipX(false);
    }

    // Atualiza sprite de animação
    if (sprite.body.touching.down) {
      if (moving && !sprite.isMoving) {
        sprite.play('watergirl-walk-anim');
        sprite.isMoving = true;
      } else if (!moving && sprite.isMoving) {
        sprite.stop();
        sprite.setTexture('watergirl-idle');
        sprite.isMoving = false;
      }
    } else if (sprite.isMoving) {
      sprite.stop();
      sprite.isMoving = false;
    }

    if (keys.up.isDown && sprite.body.touching.down) {
      sprite.body.setVelocityY(-400);
      this.scene.game.audioManager.playSfx('jump-water');
      sprite.setTexture('watergirl-jump');
      sprite.isJumping = true;
      if (sprite.isMoving) {
        sprite.stop();
        sprite.isMoving = false;
      }
      // Emite partículas de água ao pular
      this.particles.emitParticleAt(sprite.x, sprite.y + 20, 5);
    } else if (sprite.isJumping && sprite.body.touching.down) {
      sprite.isJumping = false;
      if (!moving) {
        sprite.setTexture('watergirl-idle');
      }
    }
  }
}