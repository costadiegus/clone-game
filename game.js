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
  }

  create() {
    console.log('LevelScene created');
    this.cameras.main.setBackgroundColor('#1a1a1a');
    
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
    
    // Create platforms
    const platform = this.add.rectangle(400, 550, 800, 50, 0x8b4513);
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    
    const platform2 = this.add.rectangle(200, 450, 150, 20, 0x8b4513);
    this.physics.add.existing(platform2, true);
    this.platforms.add(platform2);
    
    const platform3 = this.add.rectangle(600, 400, 150, 20, 0x8b4513);
    this.physics.add.existing(platform3, true);
    this.platforms.add(platform3);
    
    // Lava
    const lava = this.add.rectangle(150, 500, 100, 30, 0xff4500);
    this.physics.add.existing(lava, true);
    lava.hazardType = 'lava';
    this.hazards.push(lava);
    
    // Water
    const water = this.add.rectangle(650, 500, 100, 30, 0x0099ff);
    this.physics.add.existing(water, true);
    water.hazardType = 'water';
    this.hazards.push(water);
    
    // Doors
    const fireDoor = this.add.rectangle(150, 350, 30, 50, 0xff6b6b);
    this.physics.add.existing(fireDoor, true);
    fireDoor.doorType = 'fire';
    this.doors.push(fireDoor);
    
    const waterDoor = this.add.rectangle(650, 350, 30, 50, 0x4ecdc4);
    this.physics.add.existing(waterDoor, true);
    waterDoor.doorType = 'water';
    this.doors.push(waterDoor);
    
    // Create players with sprites
    this.fireboy = this.add.sprite(100, 400, 'fireboy-idle');
    this.fireboy.setScale(1);
    this.physics.add.existing(this.fireboy);
    this.fireboy.body.setBounce(0.2);
    this.fireboy.body.setCollideWorldBounds(true);
    this.fireboy.type = 'fireboy';
    this.fireboy.isAlive = true;
    this.fireboy.atDoor = false;
    this.fireboy.isMoving = false;
    this.fireboy.isJumping = false;
    
    this.watergirl = this.add.sprite(700, 400, 'watergirl-idle');
    this.watergirl.setScale(1);
    this.physics.add.existing(this.watergirl);
    this.watergirl.body.setBounce(0.2);
    this.watergirl.body.setCollideWorldBounds(true);
    this.watergirl.type = 'watergirl';
    this.watergirl.isAlive = true;
    this.watergirl.atDoor = false;
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
    
    // Setup door collisions
    this.doors.forEach(door => {
      this.physics.add.overlap(this.fireboy, door, () => {
        if (door.doorType === 'fire') {
          this.fireboy.atDoor = true;
        }
      });
      
      this.physics.add.overlap(this.watergirl, door, () => {
        if (door.doorType === 'water') {
          this.watergirl.atDoor = true;
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
    }
    
    if (this.fireboy.keys.up.isDown && this.fireboy.body.touching.down) {
      this.fireboy.body.setVelocityY(-400);
      this.fireboy.setTexture('fireboy-jump');
      this.fireboy.isJumping = true;
      // Emit fire particles on jump
      this.fireParticles.emitParticleAt(this.fireboy.x, this.fireboy.y + 20, 5);
    } else if (this.fireboy.isJumping && this.fireboy.body.touching.down) {
      this.fireboy.isJumping = false;
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
    }
    
    if (this.watergirl.keys.up.isDown && this.watergirl.body.touching.down) {
      this.watergirl.body.setVelocityY(-400);
      this.watergirl.setTexture('watergirl-jump');
      this.watergirl.isJumping = true;
      // Emit water particles on jump
      this.waterParticles.emitParticleAt(this.watergirl.x, this.watergirl.y + 20, 5);
    } else if (this.watergirl.isJumping && this.watergirl.body.touching.down) {
      this.watergirl.isJumping = false;
    }
    
    // Check win condition
    if (this.fireboy.atDoor && this.watergirl.atDoor) {
      this.levelComplete = true;
      this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'LEVEL COMPLETE!', {
        fontSize: '48px',
        fontStyle: 'bold',
        fill: '#00ff00',
        align: 'center'
      }).setOrigin(0.5);
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