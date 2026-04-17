export class Button extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, linkedObjects = []) {
    super(scene, x, y, 'button');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isPressed = false;
    this.linkedObjects = linkedObjects; // Array of objects to activate
    this.setImmovable(true);

    // Create button graphics if texture doesn't exist
    if (!scene.textures.exists('button')) {
      this.createButtonGraphics(scene);
    }
  }

  createButtonGraphics(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x8b7355);
    graphics.fillRect(0, 0, 32, 16);
    graphics.fillStyle(0xd4a574);
    graphics.fillCircle(16, 8, 6);
    graphics.generateTexture('button', 32, 16);
    graphics.destroy();
  }

  press() {
    if (!this.isPressed) {
      this.isPressed = true;
      this.setTint(0xffff00);
      this.linkedObjects.forEach(obj => {
        if (obj.activate) obj.activate();
      });
    }
  }

  release() {
    if (this.isPressed) {
      this.isPressed = false;
      this.clearTint();
      this.linkedObjects.forEach(obj => {
        if (obj.deactivate) obj.deactivate();
      });
    }
  }
}

export class Lever extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, linkedObjects = []) {
    super(scene, x, y, 'lever');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isActivated = false;
    this.linkedObjects = linkedObjects;
    this.setImmovable(true);

    if (!scene.textures.exists('lever')) {
      this.createLeverGraphics(scene);
    }
  }

  createLeverGraphics(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x696969);
    graphics.fillRect(0, 12, 32, 8);
    graphics.fillStyle(0xffa500);
    graphics.fillRect(12, 4, 8, 20);
    graphics.generateTexture('lever', 32, 32);
    graphics.destroy();
  }

  toggle() {
    this.isActivated = !this.isActivated;
    if (this.isActivated) {
      this.setTint(0xffff00);
      this.linkedObjects.forEach(obj => {
        if (obj.activate) obj.activate();
      });
    } else {
      this.clearTint();
      this.linkedObjects.forEach(obj => {
        if (obj.deactivate) obj.deactivate();
      });
    }
  }
}

export class PushBox extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'box');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0.3);
    this.setDrag(0.95);
    this.mass = 2; // Heavier than players

    if (!scene.textures.exists('box')) {
      this.createBoxGraphics(scene);
    }
  }

  createBoxGraphics(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x8b4513);
    graphics.fillRect(0, 0, 32, 32);
    graphics.fillStyle(0xa0522d);
    graphics.lineStyle(2, 0x654321);
    graphics.strokeRect(4, 4, 24, 24);
    graphics.generateTexture('box', 32, 32);
    graphics.destroy();
  }
}

export class Diamond extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, color = 'red') {
    super(scene, x, y, 'diamond');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.color = color; // 'red' or 'blue'
    this.collected = false;
    this.setImmovable(true);

    if (!scene.textures.exists('diamond')) {
      this.createDiamondGraphics(scene);
    }
  }

  createDiamondGraphics(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff0000);
    graphics.fillTriangleShape(new Phaser.Geom.Triangle(16, 0, 32, 16, 16, 32));
    graphics.fillTriangleShape(new Phaser.Geom.Triangle(16, 0, 0, 16, 16, 32));
    graphics.generateTexture('diamond', 32, 32);
    graphics.destroy();
  }

  collect() {
    this.collected = true;
    this.setActive(false);
    this.setVisible(false);
  }
}

export class Door extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type = 'fire') {
    super(scene, x, y, 'door');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.type = type; // 'fire' or 'water'
    this.isOpen = false;
    this.setImmovable(true);

    if (!scene.textures.exists('door')) {
      this.createDoorGraphics(scene);
    }
  }

  createDoorGraphics(scene) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x4a4a4a);
    graphics.fillRect(0, 0, 32, 64);
    graphics.fillStyle(0xffd700);
    graphics.fillCircle(24, 32, 4);
    graphics.generateTexture('door', 32, 64);
    graphics.destroy();
  }

  open() {
    this.isOpen = true;
    this.setTint(0x00ff00);
  }

  close() {
    this.isOpen = false;
    this.clearTint();
  }
}
