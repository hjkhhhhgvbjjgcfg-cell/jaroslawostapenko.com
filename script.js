// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Simple toggle icon (optional: switch to 'x' icon)
    const isHidden = mobileMenu.classList.contains('hidden');
    // You could update the icon here if desired, but default is fine
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Header Scroll Effect
const header = document.getElementById('main-header');
const logoText = document.getElementById('logo-text');
const menuIconEl = document.getElementById('menu-icon');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-4');
        header.classList.remove('bg-transparent', 'py-6');
        
        logoText.classList.remove('lg:text-white');
        logoText.classList.add('text-slate-900');

        menuIconEl.classList.remove('lg:text-white');
        
        navLinks.forEach(link => {
            link.classList.remove('text-slate-200', 'hover:text-white');
            link.classList.add('text-slate-600', 'hover:text-blue-500');
        });
    } else {
        header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-4');
        header.classList.add('bg-transparent', 'py-6');

        logoText.classList.add('lg:text-white');
        logoText.classList.remove('text-slate-900');

        menuIconEl.classList.add('lg:text-white');

        navLinks.forEach(link => {
            link.classList.add('text-slate-200', 'hover:text-white');
            link.classList.remove('text-slate-600', 'hover:text-blue-500');
        });
    }
});

// Form Submission Simulation
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Change button state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Wysyłanie...
    `;
    submitBtn.disabled = true;

    // Simulate network request
    setTimeout(() => {
        submitBtn.innerHTML = "Wysłano!";
        submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            submitBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
        }, 3000);
    }, 1500);
});