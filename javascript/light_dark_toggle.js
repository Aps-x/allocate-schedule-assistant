// Constants
const button_light_dark_toggle = document.getElementById("light_dark_toggle");
const button_image = button_light_dark_toggle.querySelector("img");
const button_text = button_light_dark_toggle.querySelector("span");

const body = document.body;

// On page load
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    button_image.src = "images/sun.svg";
    body.classList.replace('light', 'dark')
}

// Toggle button clicked
button_light_dark_toggle.addEventListener("click", (event) => {
    // Toggle the light / dark theme
    if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        button_image.setAttribute("src", "images/sun.svg")
    } 
    else if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light');
        button_image.setAttribute("src", "images/moon.svg")
    }
    // Toggle the aria-pressed attribute
    if (button_light_dark_toggle.ariaPressed === 'true') {
        button_light_dark_toggle.ariaPressed = 'false';
    } 
    else {
        button_light_dark_toggle.ariaPressed = 'true';
    }
});