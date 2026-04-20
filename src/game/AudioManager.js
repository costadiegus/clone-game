export default class AudioManager {
    constructor(game) {
        this.game = game;
        this.sound = game.sound;

        this.isUnlocked = false;

        this.music = {}; // pool de músicas
        this.sfx = {};   // pool de sfx

        this.currentMusicKey = null;

        this.musicVolume = this.load('musicVolume', 1);
        this.sfxVolume = this.load('sfxVolume', 1);
        this.muted = this.load('muted', false);
    }

    // ========================
    // 🔓 Unlock
    // ========================
    async unlock() {
        if (this.sound.context.state === 'suspended') {
            await this.sound.context.resume();
        }
        this.isUnlocked = true;
    }

    // ========================
    // 🎵 GET / CREATE MUSIC
    // ========================
    getMusic(key) {
        if (!this.music[key]) {
            this.music[key] = this.sound.add(key, {
                loop: true,
                volume: 0
            });
        }
        return this.music[key];
    }

    // ========================
    // 🎵 PLAY MUSIC (com pooling)
    // ========================
    playMusic(scene, key, { fade = 500 } = {}) {
        if (!this.isUnlocked || this.muted) return;

        const currentMusic = this.music[this.currentMusicKey];

        if (
            this.currentMusicKey === key &&
            currentMusic &&
            currentMusic.isPlaying
        ) {
            return;
        }

        if (this.currentMusicKey === key && currentMusic && !currentMusic.isPlaying) {
            currentMusic.play();
            
            scene.tweens.add({
                targets: currentMusic,
                volume: this.musicVolume,
                duration: fade
            });

            return;
        }

        const newMusic = this.getMusic(key);
        const oldMusic = this.currentMusicKey ? this.music[this.currentMusicKey] : null;

        this.currentMusicKey = key;

        if (!newMusic.isPlaying) {
            newMusic.setVolume(0);
            newMusic.play();
        }

        // fade in nova
        scene.tweens.add({
            targets: newMusic,
            volume: this.musicVolume,
            duration: fade
        });

        // fade out antiga
        if (oldMusic && oldMusic !== newMusic) {
            scene.tweens.add({
                targets: oldMusic,
                volume: 0,
                duration: fade,
                onComplete: () => {
                    oldMusic.stop(); // ❗ NÃO destruir
                }
            });
        }
    }

    // ========================
    // 🔊 SFX (pool simples)
    // ========================
    playSfx(key, { allowOverlap = true, ...config } = {}) {
        if (!this.isUnlocked || this.muted) return;

        if (!allowOverlap) {
            // pooling
            if (!this.sfx[key]) {
                this.sfx[key] = this.sound.add(key);
            }

            const sound = this.sfx[key];

            if (sound.isPlaying) sound.stop();

            sound.play({
                volume: this.sfxVolume,
                ...config
            });

        } else {
            // instância nova
            const sound = this.sound.add(key);

            sound.play({
                volume: this.sfxVolume,
                ...config
            });

            sound.once('complete', () => {
                sound.destroy();
            });
        }
    }

    // ========================
    // 🛑 STOP MUSIC
    // ========================
    stopMusic(scene, { fade = 300 } = {}) {
        if (!this.currentMusicKey) return;

        const music = this.music[this.currentMusicKey];

        scene.tweens.add({
            targets: music,
            volume: 0,
            duration: fade,
            onComplete: () => {
                music.stop();
            }
        });

        this.currentMusicKey = null;
    }

    stopAllMusicImmediate() {
        Object.values(this.music).forEach(m => {
            if (m.isPlaying) m.stop();
        });
        this.currentMusicKey = null;
    }

    // ========================
    // 🎚️ CONTROLES
    // ========================
    setMusicVolume(volume) {
        this.musicVolume = volume;
        this.save('musicVolume', volume);

        Object.values(this.music).forEach(m => {
            m.setVolume(volume);
        });
    }

    setSfxVolume(volume) {
        this.sfxVolume = volume;
        this.save('sfxVolume', volume);
    }

    setMuted(muted) {
        this.muted = muted;
        this.save('muted', muted);

        if (muted) {
            this.stopAllMusicImmediate();
        }
    }

    // ========================
    // 💾 STORAGE
    // ========================
    save(key, value) {
        localStorage.setItem(`game_${key}`, JSON.stringify(value));
    }

    load(key, defaultValue) {
        const value = localStorage.getItem(`game_${key}`);
        return value ? JSON.parse(value) : defaultValue;
    }
}