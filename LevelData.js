export const TILE_SIZE = 32;

export const LEVELS = {
  1: {
    name: 'Tutorial',
    width: 800,
    height: 600,
    tiles: [
      // Floor
      { x: 0, y: 568, width: 800, height: 32, type: 'solid' },
      // Left wall
      { x: 0, y: 0, width: 32, height: 600, type: 'solid' },
      // Right wall
      { x: 768, y: 0, width: 32, height: 600, type: 'solid' },
      // Platform
      { x: 200, y: 450, width: 150, height: 32, type: 'solid' },
      { x: 450, y: 350, width: 150, height: 32, type: 'solid' },
    ],
    hazards: [
      { x: 100, y: 500, width: 80, height: 32, type: 'lava' },
      { x: 600, y: 400, width: 80, height: 32, type: 'water' },
    ],
    fireboy: { x: 100, y: 400 },
    watergirl: { x: 700, y: 400 },
    doors: [
      { x: 50, y: 480, type: 'fire' },
      { x: 750, y: 480, type: 'water' },
    ],
    diamonds: [
      { x: 250, y: 400, color: 'red' },
      { x: 500, y: 300, color: 'blue' },
    ],
  },
  2: {
    name: 'Button Puzzle',
    width: 800,
    height: 600,
    tiles: [
      { x: 0, y: 568, width: 800, height: 32, type: 'solid' },
      { x: 0, y: 0, width: 32, height: 600, type: 'solid' },
      { x: 768, y: 0, width: 32, height: 600, type: 'solid' },
      { x: 150, y: 450, width: 100, height: 32, type: 'solid' },
      { x: 550, y: 450, width: 100, height: 32, type: 'solid' },
      { x: 300, y: 350, width: 200, height: 32, type: 'solid', id: 'platform1' },
    ],
    hazards: [
      { x: 100, y: 500, width: 100, height: 32, type: 'lava' },
      { x: 600, y: 500, width: 100, height: 32, type: 'water' },
    ],
    buttons: [
      { x: 200, y: 400, linkedTo: ['platform1'] },
      { x: 600, y: 400, linkedTo: ['platform1'] },
    ],
    fireboy: { x: 100, y: 350 },
    watergirl: { x: 700, y: 350 },
    doors: [
      { x: 50, y: 480, type: 'fire' },
      { x: 750, y: 480, type: 'water' },
    ],
    diamonds: [
      { x: 400, y: 300, color: 'red' },
      { x: 400, y: 280, color: 'blue' },
    ],
  },
  3: {
    name: 'Lever Challenge',
    width: 800,
    height: 600,
    tiles: [
      { x: 0, y: 568, width: 800, height: 32, type: 'solid' },
      { x: 0, y: 0, width: 32, height: 600, type: 'solid' },
      { x: 768, y: 0, width: 32, height: 600, type: 'solid' },
      { x: 100, y: 450, width: 150, height: 32, type: 'solid' },
      { x: 550, y: 450, width: 150, height: 32, type: 'solid' },
      { x: 300, y: 300, width: 200, height: 32, type: 'solid', id: 'platform1' },
    ],
    hazards: [
      { x: 200, y: 500, width: 100, height: 32, type: 'lava' },
      { x: 500, y: 500, width: 100, height: 32, type: 'water' },
      { x: 350, y: 400, width: 100, height: 32, type: 'toxic' },
    ],
    levers: [
      { x: 150, y: 400, linkedTo: ['platform1'] },
      { x: 650, y: 400, linkedTo: ['platform1'] },
    ],
    fireboy: { x: 100, y: 350 },
    watergirl: { x: 700, y: 350 },
    doors: [
      { x: 50, y: 480, type: 'fire' },
      { x: 750, y: 480, type: 'water' },
    ],
    diamonds: [
      { x: 400, y: 250, color: 'red' },
      { x: 400, y: 230, color: 'blue' },
    ],
  },
};

export function getLevelData(levelNumber) {
  return LEVELS[levelNumber] || null;
}

export function getLevelCount() {
  return Object.keys(LEVELS).length;
}
