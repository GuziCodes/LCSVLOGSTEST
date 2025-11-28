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
            if (currentlyPlaying === video) {
                currentlyPlaying = null;
            }
        });

        muteButton.addEventListener("click", () => {
            video.muted = !video.muted;
            muteButton.textContent = video.muted ? "Unmute" : "Mute";
        });

        speedButton.addEventListener("click", () => {
            speedIndex = (speedIndex + 1) % speeds.length;
            video.playbackRate = speeds[speedIndex];
            speedButton.textContent = `Speed: ${speeds[speedIndex]}x`;
        });

       fullscreenButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await container.requestFullscreen();

        // Try to lock orientation to landscape
        if (screen.orientation && screen.orientation.lock) {
            try {
                await screen.orientation.lock("landscape");
            } catch (e) {
                console.warn("Orientation lock not allowed:", e);
            }
        }

    } else {
        document.exitFullscreen();

        // Unlock orientation
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }
});
