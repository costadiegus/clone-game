/**
 * System for managing hazards and their visual effects.
 * Handles creation of hazards (lava, water, toxic) and their associated visual effects.
 */
export default class HazardSystem {
  /**
   * Creates a hazard rectangle with the specified properties.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Width of the hazard
   * @param {number} height - Height of the hazard
   * @param {number} color - Color of the hazard (hex format)
   * @param {string} hazardType - Type of hazard ('lava', 'water', 'toxic')
   * @returns {Object} The hazard object with added properties
   */
  static createHazard(scene, x, y, width, height, color, hazardType) {
    const hazard = scene.add.rectangle(x, y, width, height, color);
    scene.physics.add.existing(hazard, true);
    hazard.hazardType = hazardType;
    return hazard;
  }

  /**
   * Sets up visual effects for a hazard based on its type.
   * @param {Phaser.Scene} scene - The Phaser scene
   * @param {Object} hazard - The hazard object
   * @returns {Object} An object containing the visual effect elements
   */
  static setupHazardEffect(scene, hazard) {
    const effect = {};

    switch (hazard.hazardType) {
      case 'lava':
        // Create flame graphics for lava
        effect.graphics = scene.add.graphics();
        effect.graphics.x = hazard.x;
        effect.graphics.y = hazard.y;
        break;

      case 'water':
        // Create wave graphics for water
        effect.graphics = scene.add.graphics();
        effect.graphics.x = hazard.x;
        effect.graphics.y = hazard.y;
        effect.graphics.setDepth(10);
        break;

      case 'toxic':
        // Create slime graphics for toxic
        effect.graphics = scene.add.graphics();
        effect.graphics.x = hazard.x;
        effect.graphics.y = hazard.y;
        effect.graphics.setDepth(3);
        break;

      default:
        break;
    }

    return effect;
  }

  /**
   * Updates all hazard visual effects based on current time.
   * @param {number} time - Current game time
   * @param {Array} hazardsEffects - Array of hazard effect objects
   */
  static updateHazardEffects(time, hazardsEffects) {
    hazardsEffects.forEach(({ hazard, effect }) => {
      if (!effect || !effect.graphics) return;

      effect.graphics.clear();

      switch (hazard.hazardType) {
        case 'lava':
          this._updateLavaEffect(time, effect.graphics, hazard);
          break;

        case 'water':
          this._updateWaterEffect(time, effect.graphics, hazard);
          break;

        case 'toxic':
          this._updateToxicEffect(time, effect.graphics, hazard);
          break;

        default:
          break;
      }
    });
  }

  /**
   * Updates lava flame effect.
   * @private
   */
  static _updateLavaEffect(time, graphics, hazard) {
    const timeFactor = time * 0.01;
    const alpha = 0.7 + Math.sin(timeFactor) * 0.3;

    // Create multiple flame tongues
    for (let i = 0; i < 8; i++) {
      const x = (i - 4) * 12;
      const height = 8 + Math.sin(timeFactor + i * 0.5) * 4;
      const alphaVar = 0.6 + Math.sin(timeFactor + i * 0.3) * 0.2;

      // Base flame (red)
      graphics.fillStyle(0xff4500, alphaVar * alpha);
      graphics.fillRect(x, -height, 8, height);

      // Yellow tips
      if (height > 10) {
        graphics.fillStyle(0xffff00, alphaVar * alpha * 0.7);
        graphics.fillRect(x + 1, -height - 2, 6, 2);
      }
    }
  }

  /**
   * Updates water wave effect.
   * @private
   */
  static _updateWaterEffect(time, graphics, hazard) {
    const timeFactor = time * 0.01;
    const width = hazard.width;
    const height = hazard.height;
    const segmentCount = 5;
    const waveHeight = 2;
    const waveHeightEllipse = 8;
    const waveY = -height / 2 + waveHeightEllipse / 2 - 5;

    for (let i = 0; i < segmentCount; i++) {
      const x = -width / 2 + 16 + i * (width / segmentCount);
      const y = waveY + Math.sin(timeFactor + i * 0.9) * waveHeight;
      const waveWidth = width / 3;

      graphics.fillStyle(0x6d9be0, 0.5);
      graphics.fillEllipse(x, y, waveWidth, waveHeightEllipse);
    }

    graphics.lineStyle(2, 0x6d9be0, 0.7);
    graphics.beginPath();
    for (let i = 0; i <= segmentCount; i++) {
      const x = -width / 2 + i * (width / segmentCount);
      const y = waveY + Math.sin(timeFactor + i * 0.9) * waveHeight - waveHeightEllipse / 2 + 2;
      if (i === 0) {
        graphics.moveTo(x, y);
      } else {
        graphics.lineTo(x, y);
      }
    }
    graphics.strokePath();

    for (let i = 0; i < segmentCount; i += 2) {
      const x = -width / 2 + 16 + i * (width / segmentCount);
      const y = waveY + Math.sin(timeFactor + i * 0.9) * waveHeight - 10;
      graphics.fillStyle(0x6d9be0, 0.4);
      graphics.fillCircle(x, y, 1);
    }
  }

  /**
   * Updates toxic slime effect.
   * @private
   */
  static _updateToxicEffect(time, graphics, hazard) {
    const timeFactor = time * 0.008;
    const width = hazard.width;
    const height = hazard.height;

    // Draw base slime layer with slight pulsing
    const baseAlpha = 0.4 + Math.sin(timeFactor * 0.5) * 0.1;
    graphics.fillStyle(0x2ecc71, baseAlpha);
    graphics.fillRect(-width/2, -height/2, width, height);

    // Draw slime bubbles/oozes
    const bubbleCount = 6;
    for (let i = 0; i < bubbleCount; i++) {
      const x = -width/2 + (i + 0.5) * (width / bubbleCount) + Math.sin(timeFactor + i * 0.7) * 5;
      const y = -height/2 + Math.cos(timeFactor + i * 0.5) * 3;
      const radius = 3 + Math.sin(timeFactor * 2 + i * 0.3) * 2;
      const alpha = 0.6 + Math.sin(timeFactor + i * 0.4) * 0.2;

      graphics.fillStyle(0x27ae60, alpha);
      graphics.fillCircle(x, y, radius);

      // Add highlight
      graphics.fillStyle(0x4ecdc4, alpha * 0.7);
      graphics.fillCircle(x - 1, y - 1, radius * 0.5);
    }

    // Draw wavy top surface
    graphics.lineStyle(2, 0x1abc9c, 0.8);
    graphics.beginPath();
    const wavePoints = 10;
    for (let i = 0; i <= wavePoints; i++) {
      const x = -width/2 + i * (width / wavePoints);
      const y = -height/2 + Math.sin(timeFactor + i * 0.8) * 2;
      if (i === 0) {
        graphics.moveTo(x, y);
      } else {
        graphics.lineTo(x, y);
      }
    }
    graphics.strokePath();
  }
}