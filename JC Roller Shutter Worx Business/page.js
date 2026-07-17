const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setMissingState(img, missingClassTarget) {
    if (!img || !missingClassTarget) {
        return;
    }

    const markMissing = () => missingClassTarget.classList.add("is-missing");
    const markPresent = () => missingClassTarget.classList.remove("is-missing");

    img.addEventListener("error", markMissing);
    img.addEventListener("load", markPresent);

    if (img.complete) {
        if (img.naturalWidth > 0) {
            markPresent();
        } else {
            markMissing();
        }
    }
}

setMissingState(document.querySelector(".brand-logo"), document.querySelector(".brand-logo-wrap"));
document.querySelectorAll(".project-item").forEach((item) => {
    setMissingState(item.querySelector("img"), item);
});
