export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    
    // Background
    this.cameras.main.setBackgroundColor('#2c3e50');
    
    // Title
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
    
    // Play Button
    const playButton = this.add.rectangle(width / 2, 250, 200, 60, 0x27ae60);
    playButton.setInteractive({ useHandCursor: true });
    playButton.on('pointerover', () => playButton.setFillStyle(0x229954));
    playButton.on('pointerout', () => playButton.setFillStyle(0x27ae60));
    playButton.on('pointerdown', () => this.scene.start('WorldMapScene'));
    
    this.add.text(width / 2, 250, 'PLAY', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    // Editor Button
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
    
    // Instructions
    this.add.text(width / 2, 480, 'Fireboy (Red) - Arrow Keys | Watergirl (Blue) - A, W, D', {
      fontSize: '14px',
      fill: '#bdc3c7',
      align: 'center'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, 510, 'Get both characters to their doors to complete the level!', {
      fontSize: '12px',
      fill: '#95a5a6',
      align: 'center'
    }).setOrigin(0.5);
  }
}
