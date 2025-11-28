document.querySelectorAll(".controls button").forEach(button => {
    button.addEventListener("click", function() {
        if (this.classList.contains("active")) {
            this.classList.remove("active");
        } else {
            if (this.classList.contains("play")) {
                this.closest(".controls").querySelector(".pause").classList.remove("active");
            } else if (this.classList.contains("pause")) {
                this.closest(".controls").querySelector(".play").classList.remove("active");
            }
            this.classList.add("active");
        }
    });
});
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved mode
let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    body.classList.add(savedTheme);
    updateToggleText();
} else {
    body.classList.add("dark"); // default
}

toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
    }
    updateToggleText();
});

function updateToggleText() {
    if (body.classList.contains("light")) {
        toggleBtn.textContent = "☀️ Light Mode";
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
    }
}

