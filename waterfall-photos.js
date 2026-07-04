const WATERFALL_PHOTOS = [
  {
    matches: ["bridal veil falls"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/BridalVeilFallsMacon.jpg/250px-BridalVeilFallsMacon.jpg",
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

function getPhotoMatchForCard(card) {
  const text = (card.textContent || "").toLowerCase();
  return WATERFALL_PHOTOS.find(entry => entry.matches.some(name => text.includes(name)));
}

function installWaterfallPhotoStyles() {
  if (document.getElementById("waterfallPhotoStyles")) return;

  const style = document.createElement("style");
  style.id = "waterfallPhotoStyles";
  style.textContent = `
    .waterfall-photo-wrap {
      margin: 0 0 12px;
    }

    .waterfall-photo-link {
      display: block;
      text-decoration: none;
    }

    .waterfall-photo {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      display: block;
      border-radius: 16px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: #edf2ea;
    }

    .waterfall-photo-source {
      margin-top: 6px;
      font-size: 11px;
      color: var(--muted);
    }
  `;
  document.head.appendChild(style);
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
      card.prepend(photoWrap);
    }

    photoWrap.innerHTML = `
      <a class="waterfall-photo-link" href="${match.image}" target="_blank" rel="noopener noreferrer">
        <img
          class="waterfall-photo"
          src="${match.image}"
          alt="${match.matches[0]} photo"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
        />
      </a>
      <div class="waterfall-photo-source">${match.source}</div>
    `;
  });
}

if (typeof render === "function") {
  const originalRenderForPhotos = render;
  render = function renderWithPhotos() {
    originalRenderForPhotos();
    applyWaterfallPhotos();
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyWaterfallPhotos);
} else {
  applyWaterfallPhotos();
}
