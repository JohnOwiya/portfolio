// ==========================================
// GLOBAL NAVIGATION INITIALIZATION & MOBILE DRAWER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Generate mobile navigation trigger
    const mobileToggle = document.createElement("button");
    mobileToggle.classList.add("mobile-toggle");
    mobileToggle.setAttribute("aria-label", "Toggle Navigation");
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileToggle);

    const sidebar = document.querySelector(".sidebar");
    const navLinks = document.querySelectorAll(".sidebar ul li a");

    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        const icon = mobileToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
            const icon = mobileToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
        });
    });
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================
// ACTIVE SCROLL-SPY SIDEBAR HIGHLIGHTING
// ==========================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPos >= sectionTop - 220 && scrollPos < sectionTop + sectionHeight - 220) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ==========================================
// SCROLL REVEAL FOR CARDS & LOG ENTRIES
// ==========================================
const revealElements = document.querySelectorAll(".project-card, .timeline-item");

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ==========================================
// METRIC COUNTUP
// ==========================================
const counters = document.querySelectorAll(".counter");
const speed = 200;

const startCounter = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const counterSection = document.querySelector("#stats");

if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => startCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
}

// ==========================================
// SECTION VIEWPORT FADE-IN
// ==========================================
const fadeSections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("section-show");
        }
    });
}, { threshold: 0.15 });

fadeSections.forEach(section => {
    sectionObserver.observe(section);
});

// ==========================================
// BACK TO TOP
// ==========================================
const topBtn = document.createElement("button");
topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
topBtn.classList.add("scroll-top-btn");
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================
// PAGE LOAD FLAG
// ==========================================
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});
