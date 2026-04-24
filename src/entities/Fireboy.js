export default class Fireboy {
  /**
   * @param {Phaser.Scene} scene - A cena Phaser que instancia o Fireboy
   * @param {number} x - Posição X inicial
   * @param {number} y - Posição Y inicial
   */
  constructor(scene, x, y) {
    this.scene = scene;

    // Cria partículas de fogo
    const fireGfx = scene.make.graphics({ x: 0, y: 0, add: false });
    fireGfx.fillStyle(0xff6b6b, 1);
    fireGfx.fillCircle(4, 4, 4);
    fireGfx.generateTexture('fireParticleTex', 8, 8);
    fireGfx.destroy();

    this.particles = scene.add.particles('fireParticleTex');
    this.particles.createEmitter({
      speed: { min: -200, max: 200 },
      angle: { min: 240, max: 300 },
      scale: { start: 1, end: 0 },
      lifespan: 600,
      gravityY: -300
    });

    // Cria sprite com física
    this.sprite = scene.add.sprite(x, y, 'fireboy-idle');
    this.sprite.setScale(1);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setBounce(0.2);
    this.sprite.body.setCollideWorldBounds(true);

    // Metadados de estado
    this.sprite.type = 'fireboy';
    this.sprite.isAlive = true;
    this.sprite.isMoving = false;
    this.sprite.isJumping = false;

    // Cria animação de caminhada (apenas uma vez)
    if (!scene.anims.exists('fireboy-walk-anim')) {
      scene.anims.create({
        key: 'fireboy-walk-anim',
        frames: scene.anims.generateFrameNumbers('fireboy-walk', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
      });
    }

    // Teclas de controle
    this.keys = {
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
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
        sprite.play('fireboy-walk-anim');
        sprite.isMoving = true;
      } else if (!moving && sprite.isMoving) {
        sprite.stop();
        sprite.setTexture('fireboy-idle');
        sprite.isMoving = false;
      }
    } else if (sprite.isMoving) {
      sprite.stop();
      sprite.isMoving = false;
    }

    if (keys.up.isDown && sprite.body.touching.down) {
      sprite.body.setVelocityY(-400);
      this.scene.game.audioManager.playSfx('jump-fire');
      sprite.setTexture('fireboy-jump');
      sprite.isJumping = true;
      if (sprite.isMoving) {
        sprite.stop();
        sprite.isMoving = false;
      }
      // Emite partículas de fogo ao pular
      this.particles.emitParticleAt(sprite.x, sprite.y + 20, 5);
    } else if (sprite.isJumping && sprite.body.touching.down) {
      sprite.isJumping = false;
      if (!moving) {
        sprite.setTexture('fireboy-idle');
      }
    }
  }
}
