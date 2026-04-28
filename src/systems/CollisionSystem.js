/**
 * System for handling collisions and overlaps in the game.
 * Manages entity-platform collisions, entity-hazard overlaps, and entity-door overlaps.
 */
export default class CollisionSystem {
  /**
   * Sets up colliders between entities and platforms.
   * @param {Array} entities - Array of entities (each with a sprite/body property)
   * @param {Phaser.Physics.Arcade.StaticGroup} platforms - The platforms group
   */
  static setupEntityPlatformColliders(entities, platforms) {
    entities.forEach(entity => {
      if (entity.sprite && entity.sprite.body) {
        this.physics.add.collider(entity.sprite, platforms);
      }
    });
  }

  /**
   * Sets up overlaps between entities and hazards with hazard-type-specific logic.
   * @param {Array} entities - Array of entities (each with a sprite and type property)
   * @param {Array} hazards - Array of hazard objects (each with hazardType property)
   * @param {Phaser.Scene} scene - The current scene
   * @param {Object} audioManager - The audio manager instance
   */
  static setupEntityHazardOverlaps(entities, hazards, scene, audioManager) {
    entities.forEach(entity => {
      hazards.forEach(hazard => {
        if (!entity.sprite || !hazard) return;

        scene.physics.add.overlap(entity.sprite, hazard, () => {
          // Check if entity is alive and hazard is active
          if (!entity.isAlive) return;

          let shouldDie = false;

          // Apply hazard logic based on type and entity type
          if (hazard.hazardType === 'lava' && entity.type !== 'fireboy') {
            shouldDie = true;
          } else if (hazard.hazardType === 'water' && entity.type !== 'watergirl') {
            shouldDie = true;
          } else if (hazard.hazardType === 'toxic') {
            // Toxic kills both entities
            shouldDie = true;
          }

          if (shouldDie) {
            entity.isAlive = false;
            audioManager.playSfx('death');
            audioManager.stopAllMusicImmediate();

            // Launch game over scene with appropriate player
            scene.scene.launch('GameOverScene', { playerDied: entity.type });
            scene.scene.pause();
          }
        });
      });
    });
  }

  /**
   * Sets up overlaps between entities and doors to check win condition.
   * @param {Array} entities - Array of entities (each with a sprite and type property)
   * @param {Array} doors - Array of door objects (each with doorType property)
   * @param {Phaser.Scene} scene - The current scene
   * @returns {boolean} True if win condition is met (both entities at correct doors)
   */
  static checkEntityDoorOverlaps(entities, doors, scene) {
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