// Simple game initialization
console.log('Game script loading...');

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
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
    
    const playButton = this.add.rectangle(width / 2, 250, 200, 60, 0x27ae60);
    playButton.setInteractive({ useHandCursor: true });
    playButton.on('pointerover', () => playButton.setFillStyle(0x229954));
    playButton.on('pointerout', () => playButton.setFillStyle(0x27ae60));
    playButton.on('pointerdown', () => this.scene.start('LevelScene'));
    
    this.add.text(width / 2, 250, 'PLAY', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    const editorButton = this.add.rectangle(width / 2, 340, 200, 60, 0x2980b9);
    editorButton.setInteractive({ useHandCursor: true });
    editorButton.on('pointerover', () => editorButton.setFillStyle(0x1f618d));
    editorButton.on('pointerout', () => editorButton.setFillStyle(0x2980b9));
    editorButton.on('pointerdown', () => this.scene.start('EditorScene'));
    
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

class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a1a');
    
    this.platforms = this.physics.add.staticGroup();
    this.hazards = this.physics.add.group();
    this.doors = this.physics.add.group();
    
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
    this.hazards.add(lava);
    
    // Water
    const water = this.add.rectangle(650, 500, 100, 30, 0x0099ff);
    this.physics.add.existing(water, true);
    water.hazardType = 'water';
    this.hazards.add(water);
    
    // Doors
    const fireDoor = this.add.rectangle(150, 350, 30, 50, 0xff6b6b);
    this.physics.add.existing(fireDoor, true);
    fireDoor.doorType = 'fire';
    this.doors.add(fireDoor);
    
    const waterDoor = this.add.rectangle(650, 350, 30, 50, 0x4ecdc4);
    this.physics.add.existing(waterDoor, true);
    waterDoor.doorType = 'water';
    this.doors.add(waterDoor);
    
    // Create players
    this.fireboy = this.add.rectangle(100, 400, 32, 32, 0xff6b6b);
    this.physics.add.existing(this.fireboy);
    this.fireboy.body.setBounce(0.2);
    this.fireboy.body.setCollideWorldBounds(true);
    this.fireboy.type = 'fireboy';
    this.fireboy.isAlive = true;
    
    this.watergirl = this.add.rectangle(700, 400, 32, 32, 0x4ecdc4);
    this.physics.add.existing(this.watergirl);
    this.watergirl.body.setBounce(0.2);
    this.watergirl.body.setCollideWorldBounds(true);
    this.watergirl.type = 'watergirl';
    this.watergirl.isAlive = true;
    
    // Setup collisions
    this.physics.add.collider(this.fireboy, this.platforms);
    this.physics.add.collider(this.watergirl, this.platforms);
    
    this.physics.add.overlap(this.fireboy, this.hazards, (player, hazard) => {
      if (hazard.hazardType !== 'lava') {
        this.scene.restart();
      }
    });
    
    this.physics.add.overlap(this.watergirl, this.hazards, (player, hazard) => {
      if (hazard.hazardType !== 'water') {
        this.scene.restart();
      }
    });
    
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
    
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));
  }

  update() {
    if (!this.fireboy.isAlive || !this.watergirl.isAlive) return;
    
    this.fireboy.body.setVelocityX(0);
    if (this.fireboy.keys.left.isDown) {
      this.fireboy.body.setVelocityX(-200);
    } else if (this.fireboy.keys.right.isDown) {
      this.fireboy.body.setVelocityX(200);
    }
    
    if (this.fireboy.keys.up.isDown && this.fireboy.body.touching.down) {
      this.fireboy.body.setVelocityY(-400);
    }
    
    this.watergirl.body.setVelocityX(0);
    if (this.watergirl.keys.left.isDown) {
      this.watergirl.body.setVelocityX(-200);
    } else if (this.watergirl.keys.right.isDown) {
      this.watergirl.body.setVelocityX(200);
    }
    
    if (this.watergirl.keys.up.isDown && this.watergirl.body.touching.down) {
      this.watergirl.body.setVelocityY(-400);
    }
    
    if (this.fireboy.atDoor && this.watergirl.atDoor) {
      this.add.text(400, 300, 'LEVEL COMPLETE!', {
        fontSize: '48px',
        fontStyle: 'bold',
        fill: '#00ff00',
        align: 'center'
      }).setOrigin(0.5);
      
      this.time.delayedCall(2000, () => {
        this.scene.start('MenuScene');
      });
    }
    
    this.fireboy.atDoor = false;
    this.watergirl.atDoor = false;
  }
}

class EditorScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EditorScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#1a1a1a');
    
    this.add.text(width / 2, 20, 'Level Editor (Coming Soon)', {
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
    
    const backButton = this.add.rectangle(width / 2, height - 40, 150, 40, 0xe74c3c);
    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerover', () => backButton.setFillStyle(0xc0392b));
    backButton.on('pointerout', () => backButton.setFillStyle(0xe74c3c));
    backButton.on('pointerdown', () => this.scene.start('MenuScene'));
    
    this.add.text(width / 2, height - 40, 'BACK TO MENU', {
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [MenuScene, LevelScene, EditorScene],
  parent: 'game-container',
};

console.log('Creating game...');
window.game = new Phaser.Game(config);
console.log('Game created!');
