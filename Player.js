export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.type = type; // 'fireboy' or 'watergirl'
    this.isAlive = true;
    this.velocityX = 0;
    this.speed = 200;
    this.jumpPower = -400;
    this.isJumping = false;

    // Physics setup
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.setDrag(0.99);

    // Create simple graphics if no texture exists
    if (!scene.textures.exists('player')) {
      this.createPlayerGraphics(scene);
    }

    // Input handling
    this.setupControls(scene);
  }

  createPlayerGraphics(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

    // Fireboy - Red
    if (this.type === 'fireboy') {
      graphics.fillStyle(0xff6b6b);
      graphics.fillRect(0, 0, 32, 32);
      graphics.fillStyle(0xffff00);
      graphics.fillCircle(8, 8, 4);
      graphics.fillCircle(24, 8, 4);
      graphics.fillStyle(0xff0000);
      graphics.fillRect(8, 20, 16, 8);
    }
    // Watergirl - Blue
    else {
      graphics.fillStyle(0x4ecdc4);
      graphics.fillRect(0, 0, 32, 32);
      graphics.fillStyle(0xffffff);
      graphics.fillCircle(8, 8, 4);
      graphics.fillCircle(24, 8, 4);
      graphics.fillStyle(0x0099ff);
      graphics.fillRect(8, 20, 16, 8);
    }

    graphics.generateTexture('player', 32, 32);
    graphics.destroy();
  }

  setupControls(scene) {
    this.keys = {};

    if (this.type === 'fireboy') {
      // Arrow keys for Fireboy
      this.keys.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keys.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keys.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    } else {
      // WASD for Watergirl
      this.keys.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keys.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keys.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
  }

  update() {
    if (!this.isAlive) return;

    // Horizontal movement
    this.velocityX = 0;
    if (this.keys.left.isDown) {
      this.velocityX = -this.speed;
      this.setFlipX(true);
    } else if (this.keys.right.isDown) {
      this.velocityX = this.speed;
      this.setFlipX(false);
    }

    this.setVelocityX(this.velocityX);

    // Jumping
    if (this.keys.up.isDown && this.body.touching.down) {
      this.setVelocityY(this.jumpPower);
      this.isJumping = true;
    }

    if (this.body.touching.down) {
      this.isJumping = false;
    }
  }

  die() {
    this.isAlive = false;
    this.setTint(0x888888);
  }

  reset(x, y) {
    this.isAlive = true;
    this.setPosition(x, y);
    this.setVelocity(0, 0);
    this.clearTint();
  }

  canTouchHazard(hazardType) {
    if (this.type === 'fireboy') {
      // Fireboy: immune to lava, dies on water and toxic mud
      return hazardType !== 'lava';
    } else {
      // Watergirl: immune to water, dies on lava and toxic mud
      return hazardType !== 'water';
    }
  }
}
