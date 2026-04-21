export default class AudioManager {
    constructor(game) {
        this.game = game;
        this.sound = game.sound;

        this.isUnlocked = false;

        this.music = {}; // pool
        this.sfx = {};   // pool

        this.currentMusicKey = null;
        this.lastScene = null;

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
    // 🎵 PLAY MUSIC
    // ========================
    playMusic(scene, key, { fade = 500 } = {}) {
        this.lastScene = scene;

        if (!this.isUnlocked) return;

        const newMusic = this.getMusic(key);
        const oldMusic = this.currentMusicKey
            ? this.music[this.currentMusicKey]
            : null;

        // já está tocando → não faz nada
        if (
            this.currentMusicKey === key &&
            newMusic &&
            newMusic.isPlaying
        ) {
            return;
        }

        this.currentMusicKey = key;

        // garante volume correto ao iniciar
        newMusic.setVolume(0);

        if (!newMusic.isPlaying) {
            newMusic.play();
        }

        // fade in (respeitando mute)
        scene.tweens.add({
            targets: newMusic,
            volume: this.muted ? 0 : this.musicVolume,
            duration: fade
        });

        // fade out da antiga
        if (oldMusic && oldMusic !== newMusic) {
            scene.tweens.add({
                targets: oldMusic,
                volume: 0,
                duration: fade,
                onComplete: () => {
                    oldMusic.stop();
                }
            });
        }
    }

    // ========================
    // 🔊 SFX
    // ========================
    playSfx(key, { allowOverlap = true, ...config } = {}) {
        if (!this.isUnlocked || this.muted) return;

        if (!allowOverlap) {
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

        if (!music) return;

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
            if (m && m.isPlaying) m.stop();
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
            if (m && m.isPlaying) {
                m.setVolume(this.muted ? 0 : volume);
            }
        });
    }

    setSfxVolume(volume) {
        this.sfxVolume = volume;
        this.save('sfxVolume', volume);
    }

    setMuted(muted) {
        this.muted = muted;
        this.save('muted', muted);

        // 🔥 aplica em TODAS as músicas do pool
        Object.values(this.music).forEach(m => {
            if (m && m.isPlaying) {
                m.setVolume(muted ? 0 : this.musicVolume);
            }
        });

        this.game.events.emit('audio:muteChanged', muted);
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