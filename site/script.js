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
  element.addEventListener("click", (event) => {
    analyticsLog(element.dataset.analyticsEvent, {
      label: element.dataset.analyticsLabel || element.textContent.trim(),
      href: element.getAttribute("href") || "",
    });
  });
});

document.querySelectorAll('a[href="#signal-form"]').forEach((link) => {
  link.addEventListener("click", scrollToForm);
});

const previewForm = document.querySelector(".lead-form-preview");
const submitNote = document.querySelector(".submit-note");

if (previewForm) {
  let formStarted = false;

  previewForm.addEventListener("input", (event) => {
    if (!formStarted) {
      formStarted = true;
      analyticsLog("form_start", {
        label: "lead_preview",
        firstField: event.target.name || event.target.id || "unknown",
      });
    }
  });

  previewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    analyticsLog("form_intent", { label: "preview_submit_no_backend" });

    if (submitNote) {
      submitNote.textContent =
        "아직 제출 백엔드는 연결되지 않았습니다. Tally 또는 Google Form URL 연결 후 실제 제출이 가능합니다.";
    }
  });
}
