// Apple Maps override for waterfall checklist map buttons.
// Loaded after app.js so it can update every rendered waterfall card.

function appleMapsUrlForWaterfall(waterfall) {
  const query = `${waterfall.name} ${waterfall.area} Highlands NC`;
  return `https://maps.apple.com/?daddr=${encodeURIComponent(query)}`;
}

function updateAppleMapButtons() {
  if (typeof getAllWaterfalls !== "function") return;

  const visibleWaterfalls = getAllWaterfalls()
    .filter(matchesFilter)
    .filter(matchesSearch);

  document.querySelectorAll(".waterfall-card").forEach((card, index) => {
    const waterfall = visibleWaterfalls[index];
    const link = card.querySelector(".action-link");

    if (!waterfall || !link) return;

    link.href = appleMapsUrlForWaterfall(waterfall);
    link.textContent = "Apple Maps";
    link.setAttribute("aria-label", `Open ${waterfall.name} in Apple Maps`);
  });
}

// Wrap render so map buttons stay Apple Maps after searching, filtering, checking, or adding custom stops.
if (typeof render === "function") {
  const originalRenderForAppleMaps = render;

  render = function renderWithAppleMaps() {
    originalRenderForAppleMaps();
    updateAppleMapButtons();
  };
}

updateAppleMapButtons();
