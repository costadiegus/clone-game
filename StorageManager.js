export class StorageManager {
  static STORAGE_KEY_PROGRESS = 'fireboy_watergirl_progress';
  static STORAGE_KEY_CUSTOM_LEVELS = 'fireboy_watergirl_custom_levels';

  static saveProgress(levelNumber, completed = true) {
    const progress = this.getProgress();
    if (!progress.completedLevels) {
      progress.completedLevels = [];
    }
    if (!progress.completedLevels.includes(levelNumber)) {
      progress.completedLevels.push(levelNumber);
    }
    progress.lastLevel = levelNumber;
    localStorage.setItem(this.STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }

  static getProgress() {
    const data = localStorage.getItem(this.STORAGE_KEY_PROGRESS);
    return data ? JSON.parse(data) : { completedLevels: [], lastLevel: 0 };
  }

  static isLevelUnlocked(levelNumber) {
    const progress = this.getProgress();
    if (levelNumber === 1) return true;
    return progress.completedLevels && progress.completedLevels.includes(levelNumber - 1);
  }

  static getCompletedLevels() {
    const progress = this.getProgress();
    return progress.completedLevels || [];
  }

  static saveCustomLevel(levelName, levelData) {
    const customLevels = this.getCustomLevels();
    customLevels[levelName] = levelData;
    localStorage.setItem(this.STORAGE_KEY_CUSTOM_LEVELS, JSON.stringify(customLevels));
  }

  static getCustomLevels() {
    const data = localStorage.getItem(this.STORAGE_KEY_CUSTOM_LEVELS);
    return data ? JSON.parse(data) : {};
  }

  static getCustomLevel(levelName) {
    const customLevels = this.getCustomLevels();
    return customLevels[levelName] || null;
  }

  static deleteCustomLevel(levelName) {
    const customLevels = this.getCustomLevels();
    delete customLevels[levelName];
    localStorage.setItem(this.STORAGE_KEY_CUSTOM_LEVELS, JSON.stringify(customLevels));
  }

  static exportLevel(levelData) {
    return JSON.stringify(levelData, null, 2);
  }

  static importLevel(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Invalid JSON:', e);
      return null;
    }
  }

  static clearAllProgress() {
    localStorage.removeItem(this.STORAGE_KEY_PROGRESS);
  }

  static clearAllCustomLevels() {
    localStorage.removeItem(this.STORAGE_KEY_CUSTOM_LEVELS);
  }
}
