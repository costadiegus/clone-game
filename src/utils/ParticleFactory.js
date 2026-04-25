/**
 * Utility factory for creating particle emitters in Phaser.
 * Provides pre-configured emitters for common effects like fire, water, etc.
 */
export default class ParticleFactory {
  /**
   * Creates a fire particle emitter.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {string} textureKey - The texture key for the particle (should be pre-loaded)
   * @returns {Phaser.GameObjects.Particles.ParticleEmitter} The configured emitter
   */
  static createFireEmitter(scene, textureKey = 'fireParticleTex') {
    const particles = scene.add.particles(textureKey);
    return particles.createEmitter({
      speed: { min: -200, max: 200 },
      angle: { min: 240, max: 300 },
      scale: { start: 1, end: 0 },
      lifespan: 600,
      gravityY: -300
    });
  }

  /**
   * Creates a water particle emitter.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {string} textureKey - The texture key for the particle (should be pre-loaded)
   * @returns {Phaser.GameObjects.Particles.ParticleEmitter} The configured emitter
   */
  static createWaterEmitter(scene, textureKey = 'waterParticleTex') {
    const particles = scene.add.particles(textureKey);
    return particles.createEmitter({
      speed: { min: -200, max: 200 },
      angle: { min: 240, max: 300 },
      scale: { start: 1, end: 0 },
      lifespan: 600,
      gravityY: -300
    });
  }

  /**
   * Creates a generic particle emitter with given configuration.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {string} textureKey - The texture key for the particle
   * @param {Object} config - The emitter configuration (speed, angle, scale, lifespan, etc.)
   * @returns {Phaser.GameObjects.Particles.ParticleEmitter} The configured emitter
   */
  static createEmitter(scene, textureKey, config) {
    const particles = scene.add.particles(textureKey);
    return particles.createEmitter(config);
  }
}