export default class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldMapScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#34495e');
    
    this.add.text(width / 2, 40, 'Level Selection', {
      fontSize: '36px',
      fontStyle: 'bold',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);
    
    // Back button
    const backButton = this.add.rectangle(50, 40, 80, 40, 0xe74c3c);
    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerover', () => backButton.setFillStyle(0xc0392b));
    backButton.on('pointerout', () => backButton.setFillStyle(0xe74c3c));
    backButton.on('pointerdown', () => this.scene.start('MenuScene'));
    
    this.add.text(50, 40, 'BACK', {
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#fff'
    }).setOrigin(0.5);
    
    // Level buttons
    const levels = 5;
    let col = 0, row = 0;
    
    for (let i = 1; i <= levels; i++) {
      const x = 150 + col * 200;
      const y = 150 + row * 200;
      
      const levelBtn = this.add.rectangle(x, y, 120, 120, 0x3498db);
      levelBtn.setInteractive({ useHandCursor: true });
      levelBtn.on('pointerover', () => levelBtn.setFillStyle(0x2980b9));
      levelBtn.on('pointerout', () => levelBtn.setFillStyle(0x3498db));
      levelBtn.on('pointerdown', () => this.scene.start('LevelScene', { levelNumber: i }));
      
      this.add.text(x, y - 20, `Level ${i}`, {
        fontSize: '18px',
        fontStyle: 'bold',
        fill: '#fff'
      }).setOrigin(0.5);
      
      col++;
      if (col >= 3) {
        col = 0;
        row++;
      }
    }
  }
}
