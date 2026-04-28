document.addEventListener("DOMContentLoaded", () => {
  /* --- Soft Skills Scroller --- */
  const skillsList = document.querySelector(".soft-skills-list");
  if (skillsList) {
    const clone = skillsList.cloneNode(true);
    document.getElementById("soft-skills").appendChild(clone);

    let offset = 0;
    const speed = 1;

    function animate() {
      offset += speed;
      skillsList.style.transform = `translateX(${offset}px)`;
      clone.style.transform = `translateX(${offset - skillsList.offsetWidth}px)`;
      if (offset > skillsList.offsetWidth) offset = 0;
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* --- Skill Cards Flip --- */
  document.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });

  /* --- Carousel --- */
  const track = document.querySelector(".carousel-track");
  if (track) {
    const cards = Array.from(track.children);
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;

    function updateCarousel() {
      const cardWidth = cards[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }, 5000);
  }

  /* --- Contact Explosions --- */
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const paragraphs = contactSection.querySelectorAll("p");
    setTimeout(() => {
      paragraphs.forEach((p, i) => {
        setTimeout(() => {
          p.style.opacity = "1";
          p.style.transform = "scale(1)";
          explode(contactSection.offsetWidth/2, contactSection.offsetHeight/2, "particle", contactSection);
        }, i * 500);
      });
    }, 1000);

    contactSection.querySelectorAll(".contact-info a").forEach(link => {
      link.addEventListener("click", e => {
        explode(e.pageX, e.pageY, "particle", contactSection);
      });
    });
  }

  /* --- Footer Explosions --- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.querySelectorAll("a").forEach(link => {
      link.addEventListener("mouseenter", e => {
        explode(e.pageX, e.pageY, "footer-particle", footer);
      });
    });
  }

  /* --- Shared Explosion Function --- */
  function explode(x, y, className, container) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = className;
      container.appendChild(particle);

      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 120;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = "1";

      particle.animate([
        { transform: `translate(0,0)`, opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 400,
        easing: "ease-out"
      });

      setTimeout(() => particle.remove(), 1200);
    }
  }
});
