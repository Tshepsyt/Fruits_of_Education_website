window.addEventListener("load", function () {
    const loader = document.getElementById("loader-wrapper");
    
    // The "load" event fires when all images and CSS are done.
    // We add the class that triggers the CSS fade out.
    loader.classList.add("loader-hidden");

    // Optional: Remove it from the HTML entirely after the fade finishes
    // This stops it from blocking clicks if something goes wrong
    loader.addEventListener("transitionend", function() {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    });
});