const analyticsLog = (eventName, details = {}) => {
  const payload = {
    event: eventName,
    page: "zeros-lab-notes-v0.1",
    ...details,
  };

  console.info("[analytics:event]", payload);

  if (window.plausible) {
    window.plausible(eventName, { props: details });
  }

  if (window.umami && typeof window.umami.track === "function") {
    window.umami.track(eventName, details);
  }
};

const scrollToForm = (event) => {
  const link = event.currentTarget;
  const targetId = link.getAttribute("href");

  if (!targetId || !targetId.startsWith("#")) {
    return;
  }

  const target = document.querySelector(targetId);
  if (!target) {
    return;
  }

  event.preventDefault();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
};

document.querySelectorAll("[data-analytics-event]").forEach((element) => {
  element.addEventListener("click", () => {
    analyticsLog(element.dataset.analyticsEvent, {
      label: element.dataset.analyticsLabel || element.textContent.trim(),
      href: element.getAttribute("href") || "",
    });
  });
});

document.querySelectorAll('a[href="#signal-form"]').forEach((link) => {
  link.addEventListener("click", scrollToForm);
});

document.querySelectorAll("[data-analytics-form-intent]").forEach((element) => {
  element.addEventListener("click", () => {
    analyticsLog("form_intent", {
      label: element.dataset.analyticsFormIntent,
      form_provider: "tally",
      form_mode: "popup",
    });
  });
});
