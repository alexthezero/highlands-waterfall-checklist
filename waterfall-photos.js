window.WATERFALL_PHOTOS = [
  {
    matches: ["bridal veil falls"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/BridalVeilFallsMacon.jpg/640px-BridalVeilFallsMacon.jpg",
    source: "Photo source: Wikimedia Commons"
  },
  {
    matches: ["bust your butt falls", "quarry falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_6875_3_1_c9e66b19-cf77-4225-8214-ede49bb9133d.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["dry falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_878,q_65,w_599/v1/clients/highlandsnc-redesign/WaterfallGuide_500b0021-1da2-4699-8a22-a4abe6cdaddb.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["glen falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_2740SL_ec6aeb0c-b3de-4eea-b0ea-bad624fe091f.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["cullasaja falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_6853e2_2d3c4282-1bfb-4099-a55b-cd3c02bbbb91.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["hidden falls trail to upper middle creek falls", "upper middle creek falls", "hidden falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/20210217_151509_4b97a301-4c3f-4c6c-9664-57ecd50f52c4.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["lake sequoyah", "kalakaleskies falls", "sequoyah dam falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_6334e2_9acf0c73-b0b9-40f9-85e1-d61318eb11fd.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["picklesimer rockhouse falls", "picklesimer rock house falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/IMG_7703_64aec2b6-4083-4cec-8516-1bdf23f72093.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["secret falls", "big shoals falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_3883e31_a445769a-b3e1-406d-aa1d-7257069708a0.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["silver run falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_0719eSilverWEB_0010fbea-e1a3-404e-a108-59c11dea909d.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["sliding rock"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc/GN8_1647e1WEB_748067f6-3139-448b-9a64-31d75f27b955.jpg",
    source: "Photo source: Visit Highlands, NC"
  },
  {
    matches: ["whitewater falls"],
    image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_jpg,h_340,q_75,w_630/v1/clients/highlandsnc-redesign/WhitewaterFalls_7f09bdc4-e28f-4bc1-a574-ead151efe1aa.jpg",
    source: "Photo source: Visit Highlands, NC"
  }
];

function normalizeWaterfallText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function getPhotoMatchForCard(card) {
  const title = normalizeWaterfallText(card.querySelector("h2")?.textContent || card.textContent);
  return window.WATERFALL_PHOTOS.find(entry => entry.matches.some(name => title.includes(name)));
}

function installWaterfallPhotoStyles() {
  if (document.getElementById("waterfallPhotoStyles")) return;

  const style = document.createElement("style");
  style.id = "waterfallPhotoStyles";
  style.textContent = `
    .waterfall-photo-wrap {
      margin: 0 0 14px;
      border-radius: 18px;
      overflow: hidden;
      background: #e8efe6;
      border: 1px solid rgba(73, 107, 74, 0.18);
    }

    .waterfall-photo-link {
      display: block;
      text-decoration: none;
      line-height: 0;
    }

    .waterfall-photo {
      width: 100%;
      min-height: 170px;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      display: block;
      background: linear-gradient(135deg, #dfe9dc, #f7faf5);
    }

    .waterfall-photo-source {
      padding: 7px 10px 8px;
      font-size: 11px;
      line-height: 1.25;
      color: var(--muted);
      background: rgba(255, 255, 255, 0.86);
    }

    .waterfall-photo-fallback {
      min-height: 150px;
      display: grid;
      place-items: center;
      padding: 18px;
      text-align: center;
      color: var(--muted);
      font-weight: 800;
      background: linear-gradient(135deg, #dfe9dc, #f7faf5);
    }
  `;
  document.head.appendChild(style);
}

function buildWaterfallPhotoHTML(match) {
  return `
    <a class="waterfall-photo-link" href="${match.image}" target="_blank" rel="noopener noreferrer">
      <img
        class="waterfall-photo"
        src="${match.image}"
        alt="${match.matches[0]} photo"
        loading="eager"
        decoding="async"
        referrerpolicy="no-referrer"
      />
    </a>
    <div class="waterfall-photo-source">${match.source}</div>
  `;
}

function applyWaterfallPhotos() {
  installWaterfallPhotoStyles();

  document.querySelectorAll(".waterfall-card").forEach(card => {
    const match = getPhotoMatchForCard(card);
    if (!match) return;

    let photoWrap = card.querySelector(".waterfall-photo-wrap");
    if (!photoWrap) {
      photoWrap = document.createElement("div");
      photoWrap.className = "waterfall-photo-wrap";
      card.insertBefore(photoWrap, card.firstElementChild);
    }

    if (photoWrap.dataset.image === match.image) return;

    photoWrap.dataset.image = match.image;
    photoWrap.innerHTML = buildWaterfallPhotoHTML(match);

    const img = photoWrap.querySelector("img");
    img.addEventListener("error", () => {
      photoWrap.innerHTML = `
        <div class="waterfall-photo-fallback">Photo could not load from the source site.</div>
        <div class="waterfall-photo-source">${match.source}</div>
      `;
    }, { once: true });
  });
}

if (typeof render === "function" && !window.__waterfallPhotoRenderWrapped) {
  window.__waterfallPhotoRenderWrapped = true;
  const originalRenderForPhotos = render;
  render = function renderWithPhotos() {
    originalRenderForPhotos();
    requestAnimationFrame(applyWaterfallPhotos);
  };
}

function startWaterfallPhotoWatcher() {
  const list = document.getElementById("waterfallList");
  if (!list || window.__waterfallPhotoWatcherStarted) return;

  window.__waterfallPhotoWatcherStarted = true;
  const observer = new MutationObserver(() => requestAnimationFrame(applyWaterfallPhotos));
  observer.observe(list, { childList: true, subtree: true });
}

function bootWaterfallPhotos() {
  applyWaterfallPhotos();
  startWaterfallPhotoWatcher();
  setTimeout(applyWaterfallPhotos, 250);
  setTimeout(applyWaterfallPhotos, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootWaterfallPhotos);
} else {
  bootWaterfallPhotos();
}
