document.addEventListener("DOMContentLoaded", () => {
    // =====================
    // SLIDER működés
    // =====================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
      });
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      current = index;
    }
  
    if (slides.length > 0) {
      document.querySelector('.next')?.addEventListener('click', () => {
        showSlide((current + 1) % slides.length);
      });
  
      document.querySelector('.prev')?.addEventListener('click', () => {
        showSlide((current - 1 + slides.length) % slides.length);
      });
  
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
      });
  
      setInterval(() => {
        showSlide((current + 1) % slides.length);
      }, 5000);
    }
  
    // =====================
    // COUNTDOWN
    // =====================
    const countdownElement = document.getElementById('countdown');
  
    if (countdownElement) {
      function startCountdown(duration) {
        let timer = duration;
        const interval = setInterval(() => {
          const hours = Math.floor(timer / 3600);
          const minutes = Math.floor((timer % 3600) / 60);
          const seconds = timer % 60;
  
          countdownElement.textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
          if (--timer < 0) {
            clearInterval(interval);
            countdownElement.textContent = "Lejárt!";
          }
        }, 1000);
      }
  
      startCountdown(86400); // 1 nap
    }
  
    // =====================
    // GYIK toggle
    // =====================
    document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        document.querySelectorAll('.faq-answer').forEach(el => el.style.display = 'none');
        answer.style.display = isOpen ? 'none' : 'block';
      });
    });
  
    // =====================
    // Ugrás a tetejére gomb
    // =====================
    const toTopBtn = document.getElementById('toTopBtn');
    if (toTopBtn) {
      window.addEventListener("scroll", () => {
        toTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
      });
  
      toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // =====================
    // Kosárba rakás (localStorage)
    // =====================
    const cartButtons = document.querySelectorAll(".btn-cart");
    cartButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const card = button.closest(".bundle") || button.closest(".card");
        const product = {
          id: index + 1,
          name: card.querySelector("h3")?.innerText || "Ismeretlen",
          price: card.querySelector("strong")?.innerText || "N/A",
          image: card.querySelector("img")?.src || ""
        };
    
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    
        button.innerHTML = "✅ Kosárban!";
        setTimeout(() => {
          button.innerHTML = "🛒 Kosárba";
        }, 2000);
      });
    });
    // =====================
    // Kapcsolat űrlap
    // =====================
    const contactForm = document.getElementById("contactForm");
    const formResponse = document.getElementById("formResponse");
  
    if (contactForm && formResponse) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        formResponse.textContent = "Köszönjük, üzenetedet megkaptuk!";
        contactForm.reset();
      });
    }
  
    // =====================
    // Termékkép váltás (thumbnail -> fő kép)
    // =====================
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    const mainImg = document.getElementById('mainImage');
  
    if (mainImg && thumbnails.length > 0) {
      thumbnails.forEach(img => {
        img.addEventListener('click', () => {
          mainImg.src = img.src;
  
          thumbnails.forEach(thumb => thumb.classList.remove('active'));
          img.classList.add('active');
        });
      });
    }
  });
  
  // =====================
  // Login panel
  // =====================
  function toggleLogin(e) {
    e.preventDefault();
    const panel = document.getElementById("loginPanel");
    panel?.classList.toggle("active");
  }
  
  function togglePassword() {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
  }
  
  // Klikken kívül bezárja a login panelt
  document.addEventListener("click", (e) => {
    const wrapper = document.querySelector(".login-wrapper");
    if (wrapper && !wrapper.contains(e.target)) {
      document.getElementById("loginPanel")?.classList.remove("active");
    }
  });
  