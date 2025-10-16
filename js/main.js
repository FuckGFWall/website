import "./common.js";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initGauge() {
  const gauge = document.querySelector("[data-speed-gauge]");
  if (!gauge) return;

  const pointer = gauge.querySelector("[data-gauge-pointer]");
  const label = gauge.querySelector("[data-gauge-value]");
  const target = Number(gauge.getAttribute("data-target") || "100");
  const reduceMotion = prefersReducedMotion();

  const minAngle = -100;
  const maxAngle = 100;
  const minValue = 0;
  const maxValue = 600;
  const jitterMin = 450;
  const jitterMax = 500;
  let jitterTimer = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const setGauge = (value) => {
    const clampedValue = clamp(value, minValue, maxValue);
    const progress = (clampedValue - minValue) / (maxValue - minValue);
    const angle = minAngle + progress * (maxAngle - minAngle);
    pointer.style.transform = `rotate(${angle}deg)`;
    if (label) {
      label.textContent = `${Math.round(clampedValue)} Mbps`;
    }
  };

  const startJitter = () => {
    if (reduceMotion || jitterTimer) return;
    jitterTimer = window.setInterval(() => {
      const jitterValue = jitterMin + Math.random() * (jitterMax - jitterMin);
      setGauge(jitterValue);
    }, 260);
  };

  if (reduceMotion) {
    setGauge(target);
    return;
  }

  let hasAnimated = false;
  const animate = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    const duration = 50;
    const start = performance.now();
    const startValue = 0;
    const animateFrame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (target - startValue) * eased;
      setGauge(currentValue);
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        setTimeout(startJitter, 160);
      }
    };
    requestAnimationFrame(animateFrame);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(gauge);
  } else {
    animate();
  }
}

function initWhyCards() {
  const cards = document.querySelectorAll(".why-card");
  const background = document.querySelector(".why__background");
  if (!cards.length && !background) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    background?.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
    observer.observe(card);
  });

  if (background) {
    observer.observe(background);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initGauge();
  initWhyCards();
});
