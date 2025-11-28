document.addEventListener("DOMContentLoaded", () => {
    let currentlyPlaying = null;

    document.querySelectorAll(".video-container").forEach(container => {
        const video = container.querySelector(".video");
        const playButton = container.querySelector(".play");
        const pauseButton = container.querySelector(".pause");
        const muteButton = container.querySelector(".mute");
        const speedButton = container.querySelector(".speed");
        const fullscreenButton = container.querySelector(".fullscreen");

        let speeds = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6];
        let speedIndex = 1; 
        
        // Play/Pause
        playButton.addEventListener("click", () => {
            if (currentlyPlaying && currentlyPlaying !== video) {
                currentlyPlaying.pause();
                currentlyPlaying.closest(".video-container").querySelector(".play")
                    .classList.remove("active");
            }
            video.play();
            currentlyPlaying = video;
        });

        pauseButton.addEventListener("click", () => {
            video.pause();
            if (currentlyPlaying === video) currentlyPlaying = null;
        });

        // Mute/Unmute
        muteButton.addEventListener("click", () => {
            video.muted = !video.muted;
            muteButton.textContent = video.muted ? "Unmute" : "Mute";
        });

        // Playback speed
        speedButton.addEventListener("click", () => {
            speedIndex = (speedIndex + 1) % speeds.length;
            video.playbackRate = speeds[speedIndex];
            speedButton.textContent = `Speed: ${speeds[speedIndex]}x`;
        });

        // Fullscreen with landscape lock on mobile
        fullscreenButton.addEventListener("click", async () => {
            try {
                if (!document.fullscreenElement) {
                    // Request fullscreen on the video element itself
                    await video.requestFullscreen();

                    // Lock orientation to landscape (Android Chrome)
                    if (screen.orientation && screen.orientation.lock) {
                        try {
                            await screen.orientation.lock("landscape");
                        } catch (e) {
                            console.warn("Orientation lock not allowed:", e);
                        }
                    }
                } else {
                    await document.exitFullscreen();

                    // Unlock orientation
                    if (screen.orientation && screen.orientation.unlock) {
                        screen.orientation.unlock();
                    }
                }
            } catch (err) {
                console.error("Fullscreen error:", err);
            }
        });

        // Optional: make video automatically scale when fullscreen changes
        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement === video) {
                video.style.width = "100vw";
                video.style.height = "100vh";
                video.style.objectFit = "contain";
            } else {
                video.style.width = "100%";
                video.style.height = "auto";
                video.style.objectFit = "cover";
            }
        });
    });
});
