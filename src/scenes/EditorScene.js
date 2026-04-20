export default class EditorScene extends Phaser.Scene {
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
      this.scene.stop();
      this.scene.resume('MenuScene');
    });

  }
}