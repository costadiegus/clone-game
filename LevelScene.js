export default class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelScene' });
  }

  init(data) {
    this.levelNumber = data.levelNumber || 1;
  }

  preload() {
    this.load.image('door-red', 'assets/door-red.png');
    this.load.image('door-blue', 'assets/door-blue.png');
    
    // Create lava particle texture (simplified for graphics)
    const lavaGfx = this.make.graphics({ x: 0, y: 0, add: false });
    lavaGfx.fillStyle(0xffa500, 1);
    lavaGfx.fillCircle(4, 4, 4);
    lavaGfx.generateTexture('lavaParticleTex', 8, 8);
    lavaGfx.destroy();
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a1a');
    
    // Create groups
    this.platforms = this.physics.add.staticGroup();
    this.hazards = this.physics.add.group();
    this.doors = this.physics.add.group();
    
    // Create level
    this.createLevel();
    
    // Create players far from doors
    this.fireboy = this.add.rectangle(50, 420, 32, 32, 0xff6b6b);
    this.physics.add.existing(this.fireboy);
    this.fireboy.body.setBounce(0.2);
    this.fireboy.body.setCollideWorldBounds(true);
    this.fireboy.type = 'fireboy';
    this.fireboy.isAlive = true;
    
    this.watergirl = this.add.rectangle(750, 420, 32, 32, 0x4ecdc4);
    this.physics.add.existing(this.watergirl);
    this.watergirl.body.setBounce(0.2);
    this.watergirl.body.setCollideWorldBounds(true);
    this.watergirl.type = 'watergirl';
    this.watergirl.isAlive = true;
    
    // Setup collisions
    this.physics.add.collider(this.fireboy, this.platforms);
    this.physics.add.collider(this.watergirl, this.platforms);
    
    // Setup hazards
    this.physics.add.overlap(this.fireboy, this.hazards, (player, hazard) => {
      if (hazard.hazardType !== 'lava') {
        this.resetLevel();
      }
    });
    
    this.physics.add.overlap(this.watergirl, this.hazards, (player, hazard) => {
      if (hazard.hazardType !== 'water') {
        this.resetLevel();
      }
    });
    
    // Setup doors
    this.physics.add.overlap(this.fireboy, this.doors, (player, door) => {
      if (door.doorType === 'fire') {
        this.fireboy.atDoor = true;
      }
    });
    
    this.physics.add.overlap(this.watergirl, this.doors, (player, door) => {
      if (door.doorType === 'water') {
        this.watergirl.atDoor = true;
      }
    });
    
    // Setup input
    this.setupInput();
    
    // UI
    this.add.text(10, 10, `Level ${this.levelNumber}`, {
      fontSize: '16px',
      fill: '#fff'
    });
    
    this.add.text(10, 30, 'ESC: Back to Map', {
      fontSize: '12px',
      fill: '#aaa'
    });
    
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('WorldMapScene'));
  }

  createLevel() {
    // Platform
    const platform = this.add.rectangle(400, 550, 800, 50, 0x8b4513);
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    
    // Platforms
    const platform2 = this.add.rectangle(200, 450, 150, 20, 0x8b4513);
    this.physics.add.existing(platform2, true);
    this.platforms.add(platform2);
    
    const platform3 = this.add.rectangle(600, 400, 150, 20, 0x8b4513);
    this.physics.add.existing(platform3, true);
    this.platforms.add(platform3);
    
    // Doors
    const fireDoor = this.add.sprite(200, 440, 'door-red').setOrigin(0.5, 1);
    this.physics.add.existing(fireDoor, true);
    fireDoor.doorType = 'fire';
    this.doors.add(fireDoor);
    
    const waterDoor = this.add.sprite(600, 390, 'door-blue').setOrigin(0.5, 1);
    this.physics.add.existing(waterDoor, true);
    waterDoor.doorType = 'water';
    this.doors.add(waterDoor);
    
    // Create lava flame effect using a simple animated sprite
    this.lavaFlame = this.add.graphics();
    this.lavaFlame.x = 150;
    this.lavaFlame.y = 485;
    
    // Store lava reference for animation
    this.lavaRect = lava;
  }

  setupInput() {
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
  }

  update() {
    if (!this.fireboy.isAlive || !this.watergirl.isAlive) return;
    
    // Fireboy movement
    this.fireboy.body.setVelocityX(0);
    if (this.fireboy.keys.left.isDown) {
      this.fireboy.body.setVelocityX(-200);
    } else if (this.fireboy.keys.right.isDown) {
      this.fireboy.body.setVelocityX(200);
    }
    
    if (this.fireboy.keys.up.isDown && this.fireboy.body.touching.down) {
      this.fireboy.body.setVelocityY(-400);
    }
    
    // Watergirl movement
    this.watergirl.body.setVelocityX(0);
    if (this.watergirl.keys.left.isDown) {
      this.watergirl.body.setVelocityX(-200);
    } else if (this.watergirl.keys.right.isDown) {
      this.watergirl.body.setVelocityX(200);
    }
    
    if (this.watergirl.keys.up.isDown && this.watergirl.body.touching.down) {
      this.watergirl.body.setVelocityY(-400);
    }
    
    // Check win condition
    if (this.fireboy.atDoor && this.watergirl.atDoor) {
      this.levelComplete();
    }
    
    this.fireboy.atDoor = false;
    this.watergirl.atDoor = false;
    
    // Animate lava for flame effect - simple pulsing
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
        const height = 15 + Math.sin(time + i * 0.5) * 8;
        const alpha = 0.6 + Math.sin(time + i * 0.3) * 0.2;
        
        // Base flame (red)
        this.lavaFlame.fillStyle(0xff4500, alpha);
        this.lavaFlame.fillRect(x, -height, 8, height);
        
        // Yellow tips
        if (height > 18) {
          this.lavaFlame.fillStyle(0xffff00, alpha * 0.7);
          this.lavaFlame.fillRect(x + 1, -height - 3, 6, 3);
        }
      }
    }
  }

  levelComplete() {
    this.add.text(400, 300, 'LEVEL COMPLETE!', {
      fontSize: '48px',
      fontStyle: 'bold',
      fill: '#00ff00',
      align: 'center'
    }).setOrigin(0.5);
    
    this.time.delayedCall(2000, () => {
      this.scene.start('WorldMapScene');
    });
  }

  resetLevel() {
    this.scene.restart();
  }
}
