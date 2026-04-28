/**
 * System for managing doors and win conditions.
 * Handles creation of doors and checking if entities have reached their correct doors.
 */
export default class DoorSystem {
  /**
   * Creates a door sprite with the specified properties.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {string} key - The texture key for the door sprite
   * @param {string} doorType - Type of door ('fire' or 'water')
   * @returns {Phaser.GameObjects.Sprite} The door sprite
   */
  static createDoor(scene, x, y, key, doorType) {
    const door = scene.add.sprite(x, y, key).setOrigin(0.5, 1);
    scene.physics.add.existing(door, true);
    door.doorType = doorType;
    return door;
  }

  /**
   * Checks if entities have reached their correct doors for win condition.
   * @param {Array} entities - Array of entities (each with a sprite and type property)
   * @param {Array} doors - Array of door objects (each with doorType property)
   * @param {Phaser.Scene} scene - The current scene
   * @returns {boolean} True if win condition is met (both entities at correct doors)
   */
  static checkWinCondition(entities, doors, scene) {
    let fireboyAtFireDoor = false;
    let watergirlAtWaterDoor = false;

    entities.forEach(entity => {
      doors.forEach(door => {
        if (!entity.sprite || !door) return;

        if (scene.physics.overlap(entity.sprite, door)) {
          if (entity.type === 'fireboy' && door.doorType === 'fire') {
            fireboyAtFireDoor = true;
          } else if (entity.type === 'watergirl' && door.doorType === 'water') {
            watergirlAtWaterDoor = true;
          }
        }
      });
    });

    return fireboyAtFireDoor && watergirlAtWaterDoor;
  }
}