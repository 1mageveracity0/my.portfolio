
/* =====================================
   1. INTERACTIVE NAVIGATION MENU
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the mobile menu
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});


/* =====================================
   2. DYNAMIC CONTENT BUTTON
===================================== */

const changeTextBtn = document.getElementById("change-text-btn");
const extraInfo = document.getElementById("extra-info");

let factIndex = 0;

const facts = [
    "I enjoy learning how websites are designed and developed.",
    "I am building my skills in HTML, CSS, and JavaScript.",
    "My goal is to create useful solutions through technology."
];

changeTextBtn.addEventListener("click", function () {
    // Conditional statement checks which fact to display
    if (factIndex < facts.length) {
        extraInfo.textContent = facts[factIndex];
        factIndex++;
    } else {
        // Restart when all facts have been displayed
        factIndex = 0;
        extraInfo.textContent = facts[factIndex];
        factIndex++;
    }

    changeTextBtn.textContent = "Show Another Fact";
});


/* =====================================
   3. DYNAMIC PROJECT CARDS
===================================== */

// Project information is stored in an array
const projects = [
    {
        title: "Personal Portfolio",
        description: "A responsive website showcasing my skills and work.",
        technologies: "HTML • CSS • JavaScript"
    },
    {
        title: "Student Planner",
        description: "A planned system for organising academic tasks and deadlines.",
        technologies: "HTML • CSS • JavaScript"
    },
    {
        title: "Future Project",
        description: "A space for another project as I develop my skills.",
        technologies: "More technologies to come"
    }
];

const projectContainer = document.getElementById("project-container");

// Generate a card for each project
function displayProjects() {
    projects.forEach(function (project, index) {
        const card = document.createElement("article");
        card.classList.add("card", "project-card");

        const number = document.createElement("p");
        number.classList.add("project-number");
        number.textContent = "PROJECT " + String(index + 1).padStart(2, "0");

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technologies = document.createElement("p");
        technologies.classList.add("tech");
        technologies.textContent = project.technologies;

        card.append(number, title, description, technologies);
        projectContainer.appendChild(card);
    });
}

// Call the function to display projects on page load
displayProjects();


/* =====================================
   4. CONTACT FORM VALIDATION
===================================== */

const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");

    error.textContent = message;
    field.classList.add("input-invalid");
    field.classList.remove("input-valid");
    field.setAttribute("aria-invalid", "true");
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");

    error.textContent = "";
    field.classList.remove("input-invalid");
    field.classList.add("input-valid");
    field.setAttribute("aria-invalid", "false");
}

// Validate individual fields and the whole form
contactForm.addEventListener("submit", function (event) {
    // Prevent the browser from submitting or refreshing the page
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    formFeedback.textContent = "";
    formFeedback.className = "";

    // Check the name
    if (name === "") {
        showError("name", "Please enter your name.");
        isValid = false;
    } else {
        clearError("name");
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("email", "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    } else {
        clearError("email");
    }

    // Check the message
    if (message === "") {
        showError("message", "Please enter a message.");
        isValid = false;
    } else {
        clearError("message");
    }

    // Conditional statement determines the result
    if (isValid) {
        formFeedback.textContent =
            "Thank you, " + name + "! All fields are valid.";
        formFeedback.classList.add("success");

        // Reset the form after successful validation
        contactForm.reset();

        // Remove the green validation styling
        document.querySelectorAll(".input-valid").forEach(function (field) {
            field.classList.remove("input-valid");
            field.setAttribute("aria-invalid", "false");
        });
    } else {
        formFeedback.textContent =
            "Please correct the errors above and try again.";
        formFeedback.classList.add("failure");
    }
});

// Clear a field's error as the user edits it
["name", "email", "message"].forEach(function (fieldId) {
    document.getElementById(fieldId).addEventListener("input", function () {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + "-error");

        if (field.value.trim() !== "") {
            error.textContent = "";
            field.classList.remove("input-invalid");
            field.setAttribute("aria-invalid", "false");
        }

        formFeedback.textContent = "";
        formFeedback.className = "";
    });
});
