// Bridal Veil Falls image override.
// Uses a more reliable Wikimedia source for the Highlands/Macon County Bridal Veil Falls card.

const BRIDAL_VEIL_PHOTO_CANDIDATES = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f9/BridalVeilFallsMacon.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/BridalVeilFallsMacon.jpg/640px-BridalVeilFallsMacon.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/BridalVeilFallsMacon.jpg/250px-BridalVeilFallsMacon.jpg"
];

function updateBridalVeilPhotoData() {
  if (!window.WATERFALL_PHOTOS) return;

  const entry = window.WATERFALL_PHOTOS.find(photo =>
    photo.matches && photo.matches.includes("bridal veil falls")
  );

  if (!entry) return;

  entry.image = BRIDAL_VEIL_PHOTO_CANDIDATES[0];
  entry.source = "Photo source: Wikimedia Commons";
  entry.fallbacks = BRIDAL_VEIL_PHOTO_CANDIDATES.slice(1);
}

function isBridalVeilCard(card) {
  const title = (card.querySelector("h2")?.textContent || "").toLowerCase();
  return title.includes("bridal veil falls");
}

function attachBridalVeilFallbacks() {
  document.querySelectorAll(".waterfall-card").forEach(card => {
    if (!isBridalVeilCard(card)) return;

    const img = card.querySelector(".waterfall-photo");
    if (!img || img.dataset.bridalFallbackReady === "true") return;

    img.dataset.bridalFallbackReady = "true";
    img.dataset.fallbackIndex = "0";

    img.addEventListener("error", () => {
      const currentIndex = Number(img.dataset.fallbackIndex || "0");
      const nextUrl = BRIDAL_VEIL_PHOTO_CANDIDATES[currentIndex + 1];

      if (nextUrl) {
        img.dataset.fallbackIndex = String(currentIndex + 1);
        img.src = nextUrl;
        return;
      }

      const wrap = card.querySelector(".waterfall-photo-wrap");
      if (wrap) {
        wrap.innerHTML = `
          <div class="waterfall-photo-fallback">Bridal Veil Falls photo could not load.</div>
          <div class="waterfall-photo-source">Photo source: Wikimedia Commons</div>
        `;
      }
    });
  });
}

function refreshBridalVeilPhoto() {
  updateBridalVeilPhotoData();

  document.querySelectorAll(".waterfall-card").forEach(card => {
    if (!isBridalVeilCard(card)) return;

    const wrap = card.querySelector(".waterfall-photo-wrap");
    if (wrap) wrap.remove();
  });

  if (typeof applyWaterfallPhotos === "function") applyWaterfallPhotos();
  attachBridalVeilFallbacks();
}

if (typeof render === "function" && !window.__bridalVeilPhotoRenderWrapped) {
  window.__bridalVeilPhotoRenderWrapped = true;
  const originalRenderForBridalVeilPhoto = render;

  render = function renderWithBridalVeilPhoto() {
    originalRenderForBridalVeilPhoto();
    requestAnimationFrame(refreshBridalVeilPhoto);
  };
}

refreshBridalVeilPhoto();
setTimeout(refreshBridalVeilPhoto, 300);
setTimeout(refreshBridalVeilPhoto, 1200);
