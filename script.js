/* ==========================================================================
   Atlantis Charter - Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Menu Toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Header scroll behaviour ---------- */
  const header = document.querySelector('.site-header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Intersection Observer - Scroll Animations ---------- */
  var animatedElements = document.querySelectorAll('.fade-up, .fade-in, .stagger');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Lazy Loading Images ---------- */
  var lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window && lazyImages.length > 0) {
    var imgObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imgObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    lazyImages.forEach(function (img) {
      imgObserver.observe(img);
    });
  } else {
    // Fallback
    lazyImages.forEach(function (img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  /* ---------- Booking Form Handling ---------- */
  var bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(bookingForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // Show success message
      var btn = bookingForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Request Sent!';
      btn.style.background = '#27ae60';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        bookingForm.reset();
      }, 3000);
    });
  }

  /* ---------- Active nav link highlighting ---------- */
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    if (link.getAttribute('href') === currentPath || link.getAttribute('href') === currentPath.replace(/\/$/, '')) {
      link.classList.add('active');
    }
  });

})();
