//window.addEventListener("load", function () {
    // --- 1. LOADER LOGIC ---
//    const loader = document.getElementById("loader-wrapper");
//    if(loader) {
//        loader.classList.add("loader-hidden");
        // Remove from DOM to stop it blocking clicks
//        loader.addEventListener("transitionend", () => {
//            if (loader.parentNode) loader.parentNode.removeChild(loader);
//        });
//    }

// Define the removal logic separately so we can call it from multiple places
function removeLoader() {
    const loader = document.getElementById("loader-wrapper");
    
    // If loader is already gone, stop.
    if (!loader || loader.classList.contains("loader-hidden")) return;

    loader.classList.add("loader-hidden");
    
    // Wait for the CSS transition (0.5s) to finish, then delete from HTML
    loader.addEventListener("transitionend", () => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(removeLoader, 300);
});

// --- THEME LOGIC ---
// This runs immediately to handle the toggle button
document.addEventListener("DOMContentLoaded", function() {

    // --- 2. THEME LOGIC (The Hierarchy) ---
    const toggleBtn = document.getElementById("theme-toggle");
    const html = document.documentElement;
    
    // Check the Universe variables:
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    // Helper Function to set visual state
    function applyTheme(theme) {
        if (theme === "light") {
            html.setAttribute("data-theme", "light");
            if(toggleBtn) toggleBtn.textContent = "🌙 Dark Mode";
        } else {
            // Dark is default (remove attribute)
            html.removeAttribute("data-theme");
            if(toggleBtn) toggleBtn.textContent = "☀️ Light Mode";
        }
    }

    // DECISION TREE:
    if (savedTheme) {
        // Priority 1: User has visited before and chose a side.
        applyTheme(savedTheme);
    } else if (systemPrefersLight) {
        // Priority 2: New user, but their OS demands Light Mode.
        applyTheme("light");
    } else {
        // Priority 3: Default to Dark.
        applyTheme("dark");
    }

    // --- 3. TOGGLE BUTTON CLICK ---
    if(toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isLight = html.getAttribute("data-theme") === "light";
            
            if (isLight) {
                // Switch to Dark
                applyTheme("dark");
                localStorage.setItem("theme", "dark");
            } else {
                // Switch to Light
                applyTheme("light");
                localStorage.setItem("theme", "light");
            }
        });
    }
});