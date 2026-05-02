document.addEventListener("DOMContentLoaded", () => {
  /* --- Time-based visitor greeting --- */
  const greetingElement = document.getElementById("time-greeting");
  if (greetingElement) {
    const now = new Date();
    const hour = now.getHours();
    let greetingText = "Welcome";

    if (hour >= 5 && hour < 12) {
      greetingText = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
      greetingText = "Good evening";
    } else {
      greetingText = "Working late?";
    }

    greetingElement.textContent = `${greetingText}! Thanks for visiting my portfolio.`;
    greetingElement.style.opacity = "1";
  }

  /* --- Digital Clocks --- */
  const phTimeEl = document.getElementById("ph-time");
  const localTimeEl = document.getElementById("local-time");
  const localZoneEl = document.getElementById("local-zone");
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

  if (localZoneEl) {
    localZoneEl.textContent = userTimeZone;
  }

  function formatTime(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    }).format(date);
  }

  function updateClocks() {
    const now = new Date();
    if (phTimeEl) phTimeEl.textContent = formatTime(now, "Asia/Manila");
    if (localTimeEl) localTimeEl.textContent = formatTime(now, userTimeZone);
  }

  updateClocks();
  setInterval(updateClocks, 1000);

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

  /* --- Card Shuffle --- */
  const shuffleContainers = document.querySelectorAll(".skills-grid, .previous-roles-cards");
  if (shuffleContainers.length) {
    const shuffleArray = items => {
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      return items;
    };

    shuffleContainers.forEach(container => {
      const cards = Array.from(container.children);
      const shuffled = shuffleArray(cards);
      shuffled.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
      });

      requestAnimationFrame(() => {
        shuffled.forEach((card, index) => {
          container.appendChild(card);
          card.style.transition = "transform 0.35s ease, opacity 0.35s ease";
          card.style.transitionDelay = `${index * 40}ms`;
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          setTimeout(() => {
            card.style.transition = "";
            card.style.transitionDelay = "";
          }, 500);
        });
      });
    });
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
