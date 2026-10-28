// Main JavaScript for IRM Fertility & Reproductive Medicine Website

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle & Responsive Menu Handling
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.add('open');
      } else {
        navMenu.classList.remove('open');
      }
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close mobile menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Appointment Modal Handling
  const modalOverlay = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const closeModalBtn = document.querySelector('.modal-close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) {
        modalOverlay.classList.add('active');
      }
    });
  });

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Auto-open Doctor Consultation Modal when opening the Home Page
  if (modalOverlay) {
    const currentPath = window.location.pathname.toLowerCase();
    const isHomePage = currentPath.endsWith('index.html') || 
                       currentPath.endsWith('/') || 
                       currentPath.endsWith('project hospit') || 
                       currentPath.endsWith('project hospit/') || 
                       !currentPath.includes('.html');

    if (isHomePage) {
      // Gracefully show modal 1.2s after page load for warm patient engagement
      setTimeout(() => {
        if (!modalOverlay.classList.contains('active')) {
          modalOverlay.classList.add('active');
        }
      }, 1200);
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Category Filter Chips (Services & Blog)
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');
      const filterableCards = document.querySelectorAll('.filterable-card');

      filterableCards.forEach(card => {
        if (!filterVal || filterVal === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category && (category === filterVal || category.includes(filterVal))) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Blog Search Filter
  const blogSearchInput = document.getElementById('blogSearchInput');
  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const blogCards = document.querySelectorAll('.blog-card');

      blogCards.forEach(card => {
        const title = card.querySelector('.blog-card-title')?.innerText.toLowerCase() || '';
        const excerpt = card.querySelector('.blog-card-excerpt')?.innerText.toLowerCase() || '';
        const tag = card.querySelector('.blog-badge-tag')?.innerText.toLowerCase() || '';

        if (title.includes(term) || excerpt.includes(term) || tag.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Form Submission Handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
      }

      setTimeout(() => {
        alert('Thank you! Your inquiry has been successfully submitted. Our senior clinical care coordinator will contact you shortly.');
        form.reset();
        if (modalOverlay) {
          modalOverlay.classList.remove('active');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 700);
    });
  });
});
