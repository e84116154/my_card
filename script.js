const pastelPresets = [
  {
    name: "sakura",
    bg: "#fff7fb",
    overlay:
      "radial-gradient(1100px 680px at 20% 5%, rgba(255, 180, 206, 0.42), transparent 55%), radial-gradient(980px 620px at 90% 35%, rgba(176, 214, 255, 0.46), transparent 58%), radial-gradient(900px 620px at 45% 100%, rgba(205, 255, 232, 0.46), transparent 60%)",
  },
  {
    name: "peach-mint",
    bg: "#fffaf6",
    overlay:
      "radial-gradient(1100px 680px at 12% 18%, rgba(255, 209, 196, 0.55), transparent 58%), radial-gradient(980px 620px at 86% 30%, rgba(186, 255, 233, 0.46), transparent 58%), radial-gradient(900px 620px at 55% 100%, rgba(220, 210, 255, 0.46), transparent 60%)",
  },
  {
    name: "lavender",
    bg: "#fbf9ff",
    overlay:
      "radial-gradient(1100px 680px at 20% 10%, rgba(214, 197, 255, 0.52), transparent 56%), radial-gradient(980px 620px at 86% 34%, rgba(255, 205, 230, 0.46), transparent 58%), radial-gradient(900px 620px at 45% 100%, rgba(196, 231, 255, 0.46), transparent 60%)",
  },
  {
    name: "lemon-soda",
    bg: "#fbfff7",
    overlay:
      "radial-gradient(1100px 680px at 18% 12%, rgba(255, 245, 183, 0.62), transparent 56%), radial-gradient(980px 620px at 88% 35%, rgba(189, 224, 255, 0.48), transparent 58%), radial-gradient(900px 620px at 45% 100%, rgba(255, 206, 228, 0.44), transparent 60%)",
  },
  {
    name: "cotton-candy",
    bg: "#f9fbff",
    overlay:
      "radial-gradient(1100px 680px at 16% 14%, rgba(177, 216, 255, 0.55), transparent 56%), radial-gradient(980px 620px at 86% 30%, rgba(255, 190, 218, 0.50), transparent 58%), radial-gradient(900px 620px at 50% 100%, rgba(200, 255, 230, 0.42), transparent 60%)",
  },
];

function pickNextIndex(currentIndex) {
  if (pastelPresets.length <= 1) return 0;
  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * pastelPresets.length);
  }
  return next;
}

function applyPreset(preset) {
  document.body.style.background = preset.bg;
  document.body.style.setProperty("--overlay-bg", preset.overlay);
  document.body.dataset.theme = preset.name;
}

function ensureOverlayUsesVariable() {
  // If the CSS already has a fixed overlay gradient, override it via a CSS variable.
  const style = document.createElement("style");
  style.textContent = `
    body::before { background: var(--overlay-bg) !important; }
  `;
  document.head.appendChild(style);
}

let currentIndex = Math.floor(Math.random() * pastelPresets.length);
ensureOverlayUsesVariable();
applyPreset(pastelPresets[currentIndex]);

document.addEventListener("click", (event) => {
  // If user clicks a button, let it behave normally (don't also trigger surprise change).
  const target = event.target;
  if (target instanceof Element && target.closest("a, button, input, textarea, select, label")) {
    return;
  }

  currentIndex = pickNextIndex(currentIndex);
  applyPreset(pastelPresets[currentIndex]);
});

