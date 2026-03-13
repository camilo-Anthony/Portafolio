/**
 * Simple Audio System for micro-interactions
 */

const AUDIO_URLS = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Subtle mechanical click
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Subtle whoosh
};

class AudioSystem {
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private enabled: boolean = true;

    constructor() {
        if (typeof window !== 'undefined') {
            Object.entries(AUDIO_URLS).forEach(([key, url]) => {
                const audio = new Audio(url);
                audio.volume = 0.05; // Extremely low volume for premium feel
                this.sounds.set(key, audio);
            });
        }
    }

    play(soundName: keyof typeof AUDIO_URLS) {
        if (!this.enabled) return;
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {
                // Ignore errors (like user hasn't interacted with page yet)
            });
        }
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }
}

export const audioSystem = new AudioSystem();
