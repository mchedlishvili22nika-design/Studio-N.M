const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const packageButtons = document.querySelectorAll(".btn-package");
const packageSelect = document.querySelector("#package");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const faqItems = document.querySelectorAll(".faq-item");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPackage = button.closest(".package-card").dataset.package;
    packageSelect.value = selectedPackage;
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    formMessage.textContent = `${selectedPackage} package selected. Add your project details below.`;
    formMessage.className = "form-message success";
  });
});

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      faqItem.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      item.setAttribute("aria-expanded", "true");
    }
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const selectedPackage = packageSelect.value;
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !selectedPackage || !message) {
      showMessage("Please fill in every field before sending.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    showMessage("Request ready. In a real project, this form would connect to backend or email service.", "success");
    contactForm.reset();
  });
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
