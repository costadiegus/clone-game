/**
 * Utility class for managing animations in Phaser scenes.
 * Ensures animations are created only once per scene to avoid duplication.
 */
export default class AnimationManager {
  /**
   * Creates an animation if it doesn't already exist in the scene.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {string} key - The animation key
   * @param {Object} framesConfig - Configuration for generating frames (from generateFrameNumbers)
   * @param {number} frameRate - Frame rate of the animation
   * @param {number} repeat - Repeat count (-1 for infinite)
   * @returns {Phaser.Animations.Animation} The created or existing animation
   */
  static createIfMissing(scene, key, framesConfig, frameRate, repeat) {
    if (!scene.anims.exists(key)) {
      return scene.anims.create({
        key: key,
        frames: scene.anims.generateFrameNumbers(framesConfig),
        frameRate: frameRate,
        repeat: repeat
      });
    }
    return scene.anims.get(key);
  }

  /**
   * Creates an animation from a specific frame range.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {string} key - The animation key
   * @param {string} spriteKey - The sprite sheet key
   * @param {number} start - Start frame index
   * @param {number} end - End frame index
   * @param {number} frameRate - Frame rate of the animation
   * @param {number} repeat - Repeat count (-1 for infinite)
   * @returns {Phaser.Animations.Animation} The created or existing animation
   */
  static createFromRange(scene, key, spriteKey, start, end, frameRate, repeat) {
    if (!scene.anims.exists(key)) {
      return scene.anims.create({
        key: key,
        frames: scene.anims.generateFrameNumbers(spriteKey, { start: start, end: end }),
        frameRate: frameRate,
        repeat: repeat
      });
    }
    return scene.anims.get(key);
  }
}