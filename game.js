// Fireboy & Watergirl Game - Phaser 3 with Sprites
console.log('Game script loading...');

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    // Preload assets
    this.load.image('fireboy-idle', 'assets/fireboy.png');
    this.load.image('watergirl-idle', 'assets/watergirl.png');
  }

  create() {
    console.log('MenuScene created');
    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#2c3e50');
    
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
    
    // Create PLAY button
    const playButton = this.add.rectangle(width / 2, 250, 200, 60, 0x27ae60);
    playButton.setInteractive({ useHandCursor: true });
    
    playButton.on('pointerover', () => {
      console.log('Hover over PLAY');
      playButton.setFillStyle(0x229954);
    });
    
    playButton.on('pointerout', () => {
      playButton.setFillStyle(0x27ae60);
    });
    
    playButton.on('pointerdown', () => {
      console.log('PLAY button clicked! Starting LevelScene...');
      this.scene.start('LevelScene');
    });
    
    this.add.text(width / 2, 250, 'PLAY', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    // Create EDITOR button
    const editorButton = this.add.rectangle(width / 2, 340, 200, 60, 0x2980b9);
    editorButton.setInteractive({ useHandCursor: true });
    
    editorButton.on('pointerover', () => {
      editorButton.setFillStyle(0x1f618d);
    });
    
    editorButton.on('pointerout', () => {
      editorButton.setFillStyle(0x2980b9);
    });
    
    editorButton.on('pointerdown', () => {
      console.log('EDITOR button clicked!');
      this.scene.start('EditorScene');
    });
    
    this.add.text(width / 2, 340, 'EDITOR', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, 480, 'Fireboy (Red) - Arrow Keys | Watergirl (Blue) - A, W, D', {
      fontSize: '14px',
      fill: '#bdc3c7',
      align: 'center'
    }).setOrigin(0.5);
  }
}

class GameOverScene extends Phaser.Scene {
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
    
    // Game Over title
    this.add.text(width / 2, 80, 'GAME OVER', {
      fontSize: '64px',
      fontStyle: 'bold',
      fill: '#ff6b6b',
      align: 'center'
    }).setOrigin(0.5);
    
    // Death message
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
    
    // Restart button
    const restartButton = this.add.rectangle(width / 2 - 120, height / 2 + 80, 180, 60, 0x27ae60);
    restartButton.setInteractive({ useHandCursor: true });
    
    restartButton.on('pointerover', () => {
      restartButton.setFillStyle(0x229954);
    });
    
    restartButton.on('pointerout', () => {
      restartButton.setFillStyle(0x27ae60);
    });
    
    restartButton.on('pointerdown', () => {
      console.log('Restart button clicked');
      this.scene.start('LevelScene');
    });
    
    this.add.text(width / 2 - 120, height / 2 + 80, 'RESTART', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    // Menu button
    const menuButton = this.add.rectangle(width / 2 + 120, height / 2 + 80, 180, 60, 0x2980b9);
    menuButton.setInteractive({ useHandCursor: true });
    
    menuButton.on('pointerover', () => {
      menuButton.setFillStyle(0x1f618d);
    });
    
    menuButton.on('pointerout', () => {
      menuButton.setFillStyle(0x2980b9);
    });
    
    menuButton.on('pointerdown', () => {
      console.log('Menu button clicked');
      this.scene.start('MenuScene');
    });
    
    this.add.text(width / 2 + 120, height / 2 + 80, 'MENU', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
  }
}

class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelScene' });
  }

  preload() {
    // Preload sprite assets
    this.load.image('fireboy-idle', 'assets/fireboy.png');
    this.load.image('watergirl-idle', 'assets/watergirl.png');
    this.load.image('fireboy-jump', 'assets/fireboy-jump.png');
    this.load.image('watergirl-jump', 'assets/watergirl-jump.png');
    this.load.spritesheet('fireboy-walk', 'assets/fireboy-walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('watergirl-walk', 'assets/watergirl-walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('door-red', 'assets/door-red.png');
    this.load.image('door-blue', 'assets/door-blue.png');
  }

  create() {
    console.log('LevelScene created');
    this.cameras.main.setBackgroundColor('#1a1a1a');
    
    const wallGfx = this.make.graphics({ x: 0, y: 0, add: false });
    wallGfx.fillStyle(0x3a3a3a, 1);
    wallGfx.fillRect(0, 0, 80, 80);
    wallGfx.fillStyle(0x4a4a4a, 1);
    for (let row = 0; row < 4; row++) {
      const y = row * 20;
      const offset = (row % 2) * 20;
      for (let col = 0; col < 2; col++) {
        const x = col * 40 + offset;
        wallGfx.fillRect(x + 2, y + 4, 36, 12);
        wallGfx.lineStyle(2, 0x333333, 1);
        wallGfx.strokeRect(x + 2, y + 4, 36, 12);
      }
    }
    wallGfx.generateTexture('stoneWallTex', 80, 80);
    wallGfx.destroy();
    this.add.tileSprite(400, 300, 800, 600, 'stoneWallTex').setDepth(-2);
    
    this.platforms = this.physics.add.staticGroup();
    this.hazards = [];
    this.doors = [];
    
    // Create particle emitters for effects (used for jumps and hazards) with simple circle textures
    const fireGfx = this.make.graphics({ x: 0, y: 0, add: false });
    fireGfx.fillStyle(0xff6b6b, 1);
    fireGfx.fillCircle(4, 4, 4);
    fireGfx.generateTexture('fireParticleTex', 8, 8);
    fireGfx.destroy();
    
    this.fireParticles = this.add.particles('fireParticleTex');    
    this.fireParticles.createEmitter({
      speed: { min: -200, max: 200 },
      angle: { min: 240, max: 300 },
      scale: { start: 1, end: 0 },
      lifespan: 600,
      gravityY: -300
    });
    
    // Create water particles for Watergirl's jump and water hazards with simple circle textures
    const waterGfx = this.make.graphics({ x: 0, y: 0, add: false });
    waterGfx.fillStyle(0x4ecdc4, 1);
    waterGfx.fillCircle(4, 4, 4);
    waterGfx.generateTexture('waterParticleTex', 8, 8);
    waterGfx.destroy();
    
    this.waterParticles = this.add.particles('waterParticleTex');    
    this.waterParticles.createEmitter({
      speed: { min: -200, max: 200 },
      angle: { min: 240, max: 300 },
      scale: { start: 1, end: 0 },
      lifespan: 600,
      gravityY: -300
    });
    
    // Create floor texture for bottom ground
    const stoneGfx = this.make.graphics({ x: 0, y: 0, add: false });
    stoneGfx.fillStyle(0x555555, 1);
    stoneGfx.fillRect(0, 0, 40, 40);
    stoneGfx.fillStyle(0x6e6e6e, 1);
    stoneGfx.fillRect(2, 4, 12, 10);
    stoneGfx.fillRect(26, 4, 10, 8);
    stoneGfx.fillRect(10, 20, 20, 10);
    stoneGfx.fillStyle(0x444444, 1);
    stoneGfx.fillRect(0, 28, 8, 8);
    stoneGfx.fillRect(30, 24, 8, 10);
    stoneGfx.lineStyle(2, 0x2e2e2e, 1);
    stoneGfx.strokeRect(0, 0, 40, 40);
    stoneGfx.generateTexture('stoneBlockTex', 40, 40);
    stoneGfx.destroy();

    const platform = this.add.tileSprite(400, 550, 800, 50, 'stoneBlockTex');
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    
    const platform2 = this.add.rectangle(200, 450, 150, 20, 0x8b4513);
    this.physics.add.existing(platform2, true);
    this.platforms.add(platform2);
    
    const platform3 = this.add.rectangle(600, 400, 150, 20, 0x8b4513);
    this.physics.add.existing(platform3, true);
    this.platforms.add(platform3);

    const platform4 = this.add.rectangle(400, 300, 180, 20, 0x8b4513);
    this.physics.add.existing(platform4, true);
    this.platforms.add(platform4);
    
    const toxic = this.add.rectangle(400, 289, 140, 1, 0x27ae60);
    this.physics.add.existing(toxic, true);
    toxic.hazardType = 'toxic';
    toxic.setDepth(2);
    toxic.setStrokeStyle(2, 0x1abc9c);
    this.hazards.push(toxic);
    
    // Create slime effect for toxic hazard
    this.toxicSlime = this.add.graphics();
    this.toxicSlime.x = toxic.x;
    this.toxicSlime.y = toxic.y;
    this.toxicSlime.setDepth(3);
    
    // Store toxic reference for animation
    this.toxicRect = toxic;
    
    // Lava
    const lava = this.add.rectangle(150, 525, 100, 1, 0xff4500);
    this.physics.add.existing(lava, true);
    lava.hazardType = 'lava';
    this.hazards.push(lava);
    
    // Create lava flame effect
    this.lavaFlame = this.add.graphics();
    this.lavaFlame.x = 150;
    this.lavaFlame.y = 525;
    
    // Store lava reference for animation
    this.lavaRect = lava;
    
    // Water
    const water = this.add.rectangle(650, 525, 100, 1, 0x0099ff);
    this.physics.add.existing(water, true);
    water.hazardType = 'water';
    this.hazards.push(water);
    this.waterBody = water;
    this.waterWave = this.add.graphics();
    this.waterWave.x = water.x;
    this.waterWave.y = water.y;
    this.waterWave.setDepth(10);
    
    // Doors
    const fireDoor = this.add.sprite(200, 440, 'door-red').setOrigin(0.5, 1);
    this.physics.add.existing(fireDoor, true);
    fireDoor.doorType = 'fire';
    this.fireDoor = fireDoor;
    this.doors.push(fireDoor);
    
    const waterDoor = this.add.sprite(600, 390, 'door-blue').setOrigin(0.5, 1);
    this.physics.add.existing(waterDoor, true);
    waterDoor.doorType = 'water';
    this.waterDoor = waterDoor;
    this.doors.push(waterDoor);
    
    // Create players with sprites
    this.fireboy = this.add.sprite(50, 420, 'fireboy-idle');
    this.fireboy.setScale(1);
    this.physics.add.existing(this.fireboy);
    this.fireboy.body.setBounce(0.2);
    this.fireboy.body.setCollideWorldBounds(true);
    this.fireboy.type = 'fireboy';
    this.fireboy.isAlive = true;
    this.fireboy.isMoving = false;
    this.fireboy.isJumping = false;
    
    this.watergirl = this.add.sprite(750, 420, 'watergirl-idle');
    this.watergirl.setScale(1);
    this.physics.add.existing(this.watergirl);
    this.watergirl.body.setBounce(0.2);
    this.watergirl.body.setCollideWorldBounds(true);
    this.watergirl.type = 'watergirl';
    this.watergirl.isAlive = true;
    this.watergirl.isMoving = false;
    this.watergirl.isJumping = false;
    
    // Create animations
    if (!this.anims.exists('fireboy-walk-anim')) {
      this.anims.create({
        key: 'fireboy-walk-anim',
        frames: this.anims.generateFrameNumbers('fireboy-walk', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
      });
    }
    
    if (!this.anims.exists('watergirl-walk-anim')) {
      this.anims.create({
        key: 'watergirl-walk-anim',
        frames: this.anims.generateFrameNumbers('watergirl-walk', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
      });
    }
    
    // Setup collisions with platforms
    this.physics.add.collider(this.fireboy, this.platforms);
    this.physics.add.collider(this.watergirl, this.platforms);
    
    // Setup hazard collisions
    this.hazards.forEach(hazard => {
      this.physics.add.overlap(this.fireboy, hazard, () => {
        if (hazard.hazardType !== 'lava') {
          console.log('Fireboy hit hazard:', hazard.hazardType);
          this.fireboy.isAlive = false;
          this.scene.start('GameOverScene', { playerDied: 'fireboy' });
        }
      });
      
      this.physics.add.overlap(this.watergirl, hazard, () => {
        if (hazard.hazardType !== 'water') {
          console.log('Watergirl hit hazard:', hazard.hazardType);
          this.watergirl.isAlive = false;
          this.scene.start('GameOverScene', { playerDied: 'watergirl' });
        }
      });
    });
    
    // Setup input
    this.fireboy.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    };
    
    this.watergirl.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    };
    
    this.add.text(10, 10, 'Level 1: Forest Temple', {
      fontSize: '16px',
      fill: '#fff'
    });
    
    this.add.text(10, 30, 'ESC: Back to Menu', {
      fontSize: '12px',
      fill: '#aaa'
    });
    
    this.input.keyboard.on('keydown-ESC', () => {
      console.log('ESC pressed, returning to menu');
      this.scene.start('MenuScene');
    });
    
    this.levelComplete = false;
    this.levelCompleteAnimating = false;
  }

  startLevelCompleteSequence() {
    this.fireboy.body.setVelocity(0);
    this.watergirl.body.setVelocity(0);
    this.fireboy.body.allowGravity = false;
    this.watergirl.body.allowGravity = false;

    this.fireboy.play('fireboy-walk-anim');
    this.watergirl.play('watergirl-walk-anim');
    this.fireboy.setFlipX(this.fireDoor.x < this.fireboy.x);
    this.watergirl.setFlipX(this.waterDoor.x < this.watergirl.x);

    const fireDoorEffect = this.add.graphics({ x: this.fireDoor.x, y: this.fireDoor.y - this.fireDoor.height / 2 });
    fireDoorEffect.lineStyle(2, 0x333333, 0.2);
    fireDoorEffect.strokeRect(-this.fireDoor.width / 2, -this.fireDoor.height / 2, this.fireDoor.width, this.fireDoor.height);
    for (let i = 1; i < 3; i++) {
      const offset = i * this.fireDoor.width * 0.2;
      fireDoorEffect.lineBetween(-this.fireDoor.width / 2 + offset, -this.fireDoor.height / 2, -this.fireDoor.width / 2 + offset, this.fireDoor.height / 2);
      fireDoorEffect.lineBetween(-this.fireDoor.width / 2, -this.fireDoor.height / 2 + offset * 0.6, this.fireDoor.width / 2, -this.fireDoor.height / 2 + offset * 0.6);
    }
    fireDoorEffect.setAlpha(0);
    fireDoorEffect.setDepth(this.fireDoor.depth + 1);

    const waterDoorEffect = this.add.graphics({ x: this.waterDoor.x, y: this.waterDoor.y - this.waterDoor.height / 2 });
    waterDoorEffect.lineStyle(2, 0x333333, 0.2);
    waterDoorEffect.strokeRect(-this.waterDoor.width / 2, -this.waterDoor.height / 2, this.waterDoor.width, this.waterDoor.height);
    for (let i = 1; i < 3; i++) {
      const offset = i * this.waterDoor.width * 0.2;
      waterDoorEffect.lineBetween(-this.waterDoor.width / 2 + offset, -this.waterDoor.height / 2, -this.waterDoor.width / 2 + offset, this.waterDoor.height / 2);
      waterDoorEffect.lineBetween(-this.waterDoor.width / 2, -this.waterDoor.height / 2 + offset * 0.6, this.waterDoor.width / 2, -this.waterDoor.height / 2 + offset * 0.6);
    }
    waterDoorEffect.setAlpha(0);
    waterDoorEffect.setDepth(this.waterDoor.depth + 1);

    const fireTargetY = this.fireDoor.y - this.fireDoor.height * 0.7;
    const waterTargetY = this.waterDoor.y - this.waterDoor.height * 0.7;

    let completeCount = 0;
    const finishTween = () => {
      completeCount += 1;
      if (completeCount === 2) {
        this.showLevelCompleteText();
      }
    };

    this.tweens.add({
      targets: fireDoorEffect,
      alpha: 0.9,
      scaleX: 1.15,
      scaleY: 1.15,
      duration: 300,
      yoyo: true,
      ease: 'Quad.easeInOut'
    });

    this.tweens.add({
      targets: waterDoorEffect,
      alpha: 0.9,
      scaleX: 1.15,
      scaleY: 1.15,
      duration: 300,
      yoyo: true,
      ease: 'Quad.easeInOut'
    });

    this.tweens.add({
      targets: this.fireboy,
      x: this.fireDoor.x,
      y: fireTargetY,
      alpha: 0.2,
      scaleX: 0.45,
      scaleY: 0.45,
      duration: 700,
      ease: 'Power2',
      onComplete: () => {
        this.fireboy.setVisible(false);
        finishTween();
      }
    });

    this.tweens.add({
      targets: this.watergirl,
      x: this.waterDoor.x,
      y: waterTargetY,
      alpha: 0.2,
      scaleX: 0.45,
      scaleY: 0.45,
      duration: 700,
      ease: 'Power2',
      onComplete: () => {
        this.watergirl.setVisible(false);
        finishTween();
      }
    });
  }

  showLevelCompleteText() {
    const camWidth = this.cameras.main.width;
    const camHeight = this.cameras.main.height;

    const overlay = this.add.rectangle(
      camWidth / 2,
      camHeight / 2,
      camWidth,
      camHeight,
      0x000000,
      0.0
    ).setDepth(90);

    this.tweens.add({
      targets: overlay,
      alpha: 0.45,
      duration: 400,
      ease: 'Quad.easeOut'
    });

    const blurOverlay = this.add.graphics().setDepth(91);
    const tileSize = 24;
    for (let y = 0; y < camHeight; y += tileSize) {
      for (let x = 0; x < camWidth; x += tileSize) {
        blurOverlay.fillStyle(0x000000, 0.9 + ((x + y) % (tileSize * 2) ? 0 : 0.02));
        blurOverlay.fillRect(x, y, tileSize, tileSize);
      }
    }
    blurOverlay.setAlpha(0);
    blurOverlay.setBlendMode(Phaser.BlendModes.NORMAL);
    this.tweens.add({
      targets: blurOverlay,
      alpha: 0.75,
      duration: 400,
      ease: 'Quad.easeOut'
    });

    const levelCompleteText = this.add.text(camWidth / 2, camHeight / 2, 'LEVEL COMPLETE!', {
      fontSize: '48px',
      fontStyle: 'bold',
      fill: '#00ff00',
      align: 'center'
    }).setOrigin(0.5);
    levelCompleteText.setDepth(100);
  }

  update() {
    if (!this.fireboy.isAlive || !this.watergirl.isAlive || this.levelComplete) return;
    
    // Fireboy movement
    this.fireboy.body.setVelocityX(0);
    let fireboyMoving = false;
    
    if (this.fireboy.keys.left.isDown) {
      this.fireboy.body.setVelocityX(-200);
      fireboyMoving = true;
      this.fireboy.setFlipX(true);
    } else if (this.fireboy.keys.right.isDown) {
      this.fireboy.body.setVelocityX(200);
      fireboyMoving = true;
      this.fireboy.setFlipX(false);
    }
    
    // Update Fireboy sprite
    if (this.fireboy.body.touching.down) {
      if (fireboyMoving && !this.fireboy.isMoving) {
        this.fireboy.play('fireboy-walk-anim');
        this.fireboy.isMoving = true;
      } else if (!fireboyMoving && this.fireboy.isMoving) {
        this.fireboy.stop();
        this.fireboy.setTexture('fireboy-idle');
        this.fireboy.isMoving = false;
      }
    } else if (this.fireboy.isMoving) {
      this.fireboy.stop();
      this.fireboy.isMoving = false;
    }
    
    if (this.fireboy.keys.up.isDown && this.fireboy.body.touching.down) {
      this.fireboy.body.setVelocityY(-400);
      this.fireboy.setTexture('fireboy-jump');
      this.fireboy.isJumping = true;
      if (this.fireboy.isMoving) {
        this.fireboy.stop();
        this.fireboy.isMoving = false;
      }
      // Emit fire particles on jump
      this.fireParticles.emitParticleAt(this.fireboy.x, this.fireboy.y + 20, 5);
    } else if (this.fireboy.isJumping && this.fireboy.body.touching.down) {
      this.fireboy.isJumping = false;
      if (!fireboyMoving) {
        this.fireboy.setTexture('fireboy-idle');
      }
    }
    
    // Watergirl movement
    this.watergirl.body.setVelocityX(0);
    let watergirMoving = false;
    
    if (this.watergirl.keys.left.isDown) {
      this.watergirl.body.setVelocityX(-200);
      watergirMoving = true;
      this.watergirl.setFlipX(true);
    } else if (this.watergirl.keys.right.isDown) {
      this.watergirl.body.setVelocityX(200);
      watergirMoving = true;
      this.watergirl.setFlipX(false);
    }
    
    // Update Watergirl sprite
    if (this.watergirl.body.touching.down) {
      if (watergirMoving && !this.watergirl.isMoving) {
        this.watergirl.play('watergirl-walk-anim');
        this.watergirl.isMoving = true;
      } else if (!watergirMoving && this.watergirl.isMoving) {
        this.watergirl.stop();
        this.watergirl.setTexture('watergirl-idle');
        this.watergirl.isMoving = false;
      }
    } else if (this.watergirl.isMoving) {
      this.watergirl.stop();
      this.watergirl.isMoving = false;
    }
    
    if (this.watergirl.keys.up.isDown && this.watergirl.body.touching.down) {
      this.watergirl.body.setVelocityY(-400);
      this.watergirl.setTexture('watergirl-jump');
      this.watergirl.isJumping = true;
      if (this.watergirl.isMoving) {
        this.watergirl.stop();
        this.watergirl.isMoving = false;
      }
      // Emit water particles on jump
      this.waterParticles.emitParticleAt(this.watergirl.x, this.watergirl.y + 20, 5);
    } else if (this.watergirl.isJumping && this.watergirl.body.touching.down) {
      this.watergirl.isJumping = false;
      if (!watergirMoving) {
        this.watergirl.setTexture('watergirl-idle');
      }
    }
    
    // Animate lava for flame effect
    if (this.lavaRect) {
      const time = this.time.now * 0.01;
      const alpha = 0.7 + Math.sin(time) * 0.3;
      this.lavaRect.setAlpha(alpha);
    }
    
    // Animate flame graphics
    if (this.lavaFlame) {
      this.lavaFlame.clear();
      const time = this.time.now * 0.01;
      
      // Create multiple flame tongues
      for (let i = 0; i < 8; i++) {
        const x = (i - 4) * 12;
        const height = 8 + Math.sin(time + i * 0.5) * 4;
        const alpha = 0.6 + Math.sin(time + i * 0.3) * 0.2;
        
        // Base flame (red)
        this.lavaFlame.fillStyle(0xff4500, alpha);
        this.lavaFlame.fillRect(x, -height, 8, height);
        
        // Yellow tips
        if (height > 10) {
          this.lavaFlame.fillStyle(0xffff00, alpha * 0.7);
          this.lavaFlame.fillRect(x + 1, -height - 2, 6, 2);
        }
      }
    }

    // Animate water wave effect
    if (this.waterWave && this.waterBody) {
      this.waterWave.clear();
      const time = this.time.now * 0.01;
      const width = this.waterBody.width;
      const height = this.waterBody.height;
      const segmentCount = 5;
      const waveHeight = 2;
      const waveHeightEllipse = 8;
      const waveY = -height / 2 + waveHeightEllipse / 2 -5;

      for (let i = 0; i < segmentCount; i++) {
        const x = -width / 2 + 16 + i * (width / segmentCount);
        const y = waveY + Math.sin(time + i * 0.9) * waveHeight;
        const waveWidth = width / 3;

        this.waterWave.fillStyle(0x6d9be0, 0.5);
        this.waterWave.fillEllipse(x, y, waveWidth, waveHeightEllipse);
      }

      this.waterWave.lineStyle(2, 0x6d9be0, 0.7);
      this.waterWave.beginPath();
      for (let i = 0; i <= segmentCount; i++) {
        const x = -width / 2 + i * (width / segmentCount);
        const y = waveY + Math.sin(time + i * 0.9) * waveHeight - waveHeightEllipse / 2 + 2;
        if (i === 0) {
          this.waterWave.moveTo(x, y);
        } else {
          this.waterWave.lineTo(x, y);
        }
      }
      this.waterWave.strokePath();

      for (let i = 0; i < segmentCount; i += 2) {
        const x = -width / 2 + 16 + i * (width / segmentCount);
        const y = waveY + Math.sin(time + i * 0.9) * waveHeight - 10;
        this.waterWave.fillStyle(0x6d9be0, 0.4);
        this.waterWave.fillCircle(x, y, 1);
      }
    }
    
    // Animate slime effect for toxic hazard
    if (this.toxicSlime && this.toxicRect) {
      this.toxicSlime.clear();
      const time = this.time.now * 0.008;
      const width = this.toxicRect.width;
      const height = this.toxicRect.height;
      
      // Draw base slime layer with slight pulsing
      const baseAlpha = 0.4 + Math.sin(time * 0.5) * 0.1;
      this.toxicSlime.fillStyle(0x2ecc71, baseAlpha);
      this.toxicSlime.fillRect(-width/2, -height/2, width, height);
      
      // Draw slime bubbles/oozes
      const bubbleCount = 6;
      for (let i = 0; i < bubbleCount; i++) {
        const x = -width/2 + (i + 0.5) * (width / bubbleCount) + Math.sin(time + i * 0.7) * 5;
        const y = -height/2 + Math.cos(time + i * 0.5) * 3;
        const radius = 3 + Math.sin(time * 2 + i * 0.3) * 2;
        const alpha = 0.6 + Math.sin(time + i * 0.4) * 0.2;
        
        this.toxicSlime.fillStyle(0x27ae60, alpha);
        this.toxicSlime.fillCircle(x, y, radius);
        
        // Add highlight
        this.toxicSlime.fillStyle(0x4ecdc4, alpha * 0.7);
        this.toxicSlime.fillCircle(x - 1, y - 1, radius * 0.5);
      }
      
      // Draw wavy top surface
      this.toxicSlime.lineStyle(2, 0x1abc9c, 0.8);
      this.toxicSlime.beginPath();
      const wavePoints = 10;
      for (let i = 0; i <= wavePoints; i++) {
        const x = -width/2 + i * (width / wavePoints);
        const y = -height/2 + Math.sin(time + i * 0.8) * 2;
        if (i === 0) {
          this.toxicSlime.moveTo(x, y);
        } else {
          this.toxicSlime.lineTo(x, y);
        }
      }
      this.toxicSlime.strokePath();
    }
    
    // Check win condition
    let fireboyAtRedDoor = false;
    let watergirlAtBlueDoor = false;
    
    this.doors.forEach(door => {
      if (door.doorType === 'fire' && this.physics.overlap(this.fireboy, door)) {
        fireboyAtRedDoor = true;
      }
      if (door.doorType === 'water' && this.physics.overlap(this.watergirl, door)) {
        watergirlAtBlueDoor = true;
      }
    });
    
    if (fireboyAtRedDoor && watergirlAtBlueDoor && !this.levelCompleteAnimating) {
      this.levelCompleteAnimating = true;
      this.startLevelCompleteSequence();
      this.levelComplete = true;
    }
  }
}

class EditorScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EditorScene' });
  }

  create() {
    console.log('EditorScene created');
    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#2c3e50');
    
    this.add.text(width / 2, height / 2, 'Level Editor - Coming Soon!', {
      fontSize: '32px',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, height / 2 + 60, 'Press ESC to return to menu', {
      fontSize: '16px',
      fill: '#bdc3c7',
      align: 'center'
    }).setOrigin(0.5);
    
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }
}

// Initialize Phaser game
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [MenuScene, LevelScene, GameOverScene, EditorScene],
  render: {
    pixelArt: true,
    antialias: false
  },
  parent: 'game-container',
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
  },
};

console.log('Creating game with config:', config);
const game = new Phaser.Game(config);
window.game = game;
console.log('Game created successfully!');

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});