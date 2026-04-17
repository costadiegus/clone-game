export default class EditorScene extends Phaser.Scene {
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
    
    this.add.text(width / 2, 100, 'Click to place tiles, hazards, and objects', {
      fontSize: '16px',
      fill: '#aaa',
      align: 'center'
    }).setOrigin(0.5);
    
    this.add.text(width / 2, 150, 'S: Save | L: Load | C: Clear | ESC: Back', {
      fontSize: '14px',
      fill: '#bbb',
      align: 'center'
    }).setOrigin(0.5);
    
    // Back button
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
