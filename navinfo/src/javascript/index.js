// Show and Hide menubar as clicking logo image
const navbarLogo = document.getElementById('navbar-logo');
const menuWrapper = document.getElementById('menubar-wrapper');

navbarLogo.addEventListener("click", () => {
    if (window.innerWidth <= 1000)
        menuWrapper.classList.toggle('active');
})

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1000)
        menuWrapper.classList.remove('active');
})

// Function to toggle the submenu visibility and icon on click
function toggleSubMenu(menu, submenu, icon) {
    if (submenu.classList.contains("d-none")) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
        submenu.classList.remove("d-none");
    } else {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
        submenu.classList.add("d-none");
    }
}

// Get references to DOM elements
const helpMenu = document.getElementById("help-menu");
const helpSubMenu = document.getElementById("help-sub-menu");
const helpArrow = helpMenu.querySelector("i");

const upgradeMenu = document.getElementById("upgrade-menu");
const upgradeSubMenu = document.getElementById("upgrade-sub-menu");
const upgradeArrow = upgradeMenu.querySelector("i");

// Add a click event listener to the help menu
helpMenu.addEventListener("click", () => {
    toggleSubMenu(helpMenu, helpSubMenu, helpArrow);
});

upgradeMenu.addEventListener("click", () => {
    toggleSubMenu(upgradeMenu, upgradeSubMenu, upgradeArrow);
});

const accountMenuBtn = document.getElementById("account-menu-button");
const accountMenu = document.getElementById("account-menu");

// Menu
const menuBar = document.getElementById("menubar-wrapper");

// Add a click event listener to the account menu button
accountMenuBtn.addEventListener("click", () => {
    accountMenu.classList.toggle("d-none");

    // Hide mobile menu
    menuBar.classList.remove("active");
});

// Check if the upButton exists before attaching event listeners
const upButton = document.getElementById("up-button");
if (upButton != null && upButton != undefined) {
    const downButton = document.getElementById("down-button");
    const uploadWrapper = document.getElementById("upload-wrapper");
    const downloadWrapper = document.getElementById("download-wrapper");

    // Add click event listeners for the upload and download buttons
    upButton.addEventListener("click", () => {
        upButton.classList.add("selected");
        downButton.classList.remove("selected");
        uploadWrapper.classList.remove("d-none");
        downloadWrapper.classList.add("d-none");
    });
    downButton.addEventListener("click", () => {
        upButton.classList.remove("selected");
        downButton.classList.add("selected");
        uploadWrapper.classList.add("d-none");
        downloadWrapper.classList.remove("d-none");
    });
}

const faqWrapper = document.getElementById("faq-wrapper");

// Check if the faqWrapper exists before attaching event listeners
if (faqWrapper != null && faqWrapper != undefined) {
    const faqQuestions = faqWrapper.querySelectorAll(".question");

    // Add click event listeners for the FAQ question buttons
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const arrow = question.querySelector("i");
            if (answer.classList.contains("d-none")) {
                answer.classList.remove("d-none");
                arrow.classList.remove("fa-chevron-down");
                arrow.classList.add("fa-chevron-up");
            } else {
                answer.classList.add("d-none");
                arrow.classList.add("fa-chevron-down");
                arrow.classList.remove("fa-chevron-up");
            }
        });
    });
}

// Toggle mobile menu
const menuBtn = document.getElementById("toggleNav");

menuBtn.addEventListener("click", () => {
    menuBar.classList.toggle("active");
});