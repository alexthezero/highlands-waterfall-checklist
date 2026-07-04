(() => {
  const MEMORY_KEY = "highlandsWaterfallMemoryPhotos_v1";
  const MAX_PHOTOS_PER_CARD = 6;
  const MAX_DIMENSION = 900;
  const JPEG_QUALITY = 0.72;

  function normalizeKey(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getStore() {
    try {
      return JSON.parse(localStorage.getItem(MEMORY_KEY)) || {};
    } catch (error) {
      console.warn("Could not read memory photos", error);
      return {};
    }
  }

  function setStore(data) {
    try {
      localStorage.setItem(MEMORY_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn("Could not save memory photos", error);
      alert(
        "Your browser photo storage is full. Try removing a few memory photos or adding fewer photos at once."
      );
      return false;
    }
  }

  function getCardKey(card) {
    const title = card.querySelector("h2")?.textContent || card.textContent || "waterfall";
    return normalizeKey(title) || `waterfall-${Math.random().toString(36).slice(2)}`;
  }

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function installStyles() {
    if (document.getElementById("memoryPhotoStyles")) return;

    const style = document.createElement("style");
    style.id = "memoryPhotoStyles";
    style.textContent = `
      .memory-photo-panel {
        border: 1px solid rgba(73, 107, 74, 0.22);
        background: linear-gradient(180deg, #fbfdf9, #f0f6ee);
        border-radius: 18px;
        padding: 12px;
        display: grid;
        gap: 10px;
      }

      .memory-photo-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .memory-photo-title {
        display: grid;
        gap: 2px;
      }

      .memory-photo-title strong {
        color: var(--green-dark, #314b34);
        font-size: 14px;
      }

      .memory-photo-count,
      .memory-photo-hint {
        color: var(--muted, #6d766f);
        font-size: 12px;
        line-height: 1.35;
      }

      .memory-add-btn {
        border: none;
        background: #ffffff;
        color: var(--green-dark, #314b34);
        border-radius: 999px;
        padding: 9px 12px;
        font-size: 13px;
        font-weight: 900;
        cursor: pointer;
        box-shadow: 0 5px 14px rgba(28, 44, 32, 0.08);
        white-space: nowrap;
      }

      .memory-photo-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      .memory-photo-grid:empty {
        display: none;
      }

      .memory-photo-item {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        background: #dfe9dc;
        aspect-ratio: 1 / 1;
        border: 1px solid rgba(73, 107, 74, 0.18);
      }

      .memory-photo-item a {
        display: block;
        height: 100%;
        line-height: 0;
      }

      .memory-photo-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .memory-remove-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 26px;
        height: 26px;
        border: none;
        border-radius: 999px;
        background: rgba(31, 42, 36, 0.82);
        color: white;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        z-index: 2;
      }

      .memory-photo-hint {
        margin: 0;
      }

      @media (max-width: 420px) {
        .memory-photo-head {
          align-items: flex-start;
          flex-direction: column;
        }

        .memory-add-btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function resizeImageFile(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File is not an image."));
        return;
      }

      const reader = new FileReader();

      reader.onerror = () => reject(new Error("Could not read image file."));
      reader.onload = () => {
        const img = new Image();

        img.onerror = () => {
          reject(new Error("This image format could not be loaded. Try saving it as JPG or PNG first."));
        };

        img.onload = () => {
          const largestSide = Math.max(img.width, img.height);
          const scale = Math.min(1, MAX_DIMENSION / largestSide);
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
        };

        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    });
  }

  function renderPhotoGrid(panel, key) {
    const store = getStore();
    const photos = store[key] || [];
    const count = panel.querySelector(".memory-photo-count");
    const grid = panel.querySelector(".memory-photo-grid");

    count.textContent = photos.length
      ? `${photos.length} saved on this device`
      : "No personal photos added yet";

    grid.innerHTML = photos
      .map(photo => `
        <div class="memory-photo-item">
          <button class="memory-remove-btn" type="button" data-photo-id="${escapeHTML(photo.id)}" aria-label="Remove memory photo">×</button>
          <a href="${photo.src}" target="_blank" rel="noopener" aria-label="Open memory photo">
            <img src="${photo.src}" alt="Memory photo" loading="lazy" />
          </a>
        </div>
      `)
      .join("");

    grid.querySelectorAll(".memory-remove-btn").forEach(button => {
      button.addEventListener("click", () => {
        const confirmed = confirm("Remove this memory photo from this device?");
        if (!confirmed) return;

        const updatedStore = getStore();
        updatedStore[key] = (updatedStore[key] || []).filter(photo => photo.id !== button.dataset.photoId);
        if (!updatedStore[key].length) delete updatedStore[key];

        if (setStore(updatedStore)) renderPhotoGrid(panel, key);
      });
    });
  }

  async function handleFiles(panel, key, files) {
    const incoming = Array.from(files || []).filter(file => file.type.startsWith("image/"));
    if (!incoming.length) return;

    const store = getStore();
    const current = store[key] || [];
    const availableSlots = MAX_PHOTOS_PER_CARD - current.length;

    if (availableSlots <= 0) {
      alert(`You can save up to ${MAX_PHOTOS_PER_CARD} memory photos per waterfall.`);
      return;
    }

    const selected = incoming.slice(0, availableSlots);

    try {
      for (const file of selected) {
        const src = await resizeImageFile(file);
        current.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          src,
          name: file.name || "Memory photo",
          addedAt: new Date().toISOString()
        });
      }

      store[key] = current;
      if (setStore(store)) renderPhotoGrid(panel, key);

      if (incoming.length > selected.length) {
        alert(`Added ${selected.length} photo(s). Each waterfall can hold up to ${MAX_PHOTOS_PER_CARD} memory photos.`);
      }
    } catch (error) {
      console.warn(error);
      alert(error.message || "One of the photos could not be added.");
    }
  }

  function buildMemoryPanel(card) {
    const existing = card.querySelector(".memory-photo-panel");
    const key = getCardKey(card);

    if (existing) {
      existing.dataset.memoryKey = key;
      renderPhotoGrid(existing, key);
      return;
    }

    const panel = document.createElement("section");
    panel.className = "memory-photo-panel";
    panel.dataset.memoryKey = key;
    panel.innerHTML = `
      <div class="memory-photo-head">
        <div class="memory-photo-title">
          <strong>Your Memory Photos</strong>
          <span class="memory-photo-count">No personal photos added yet</span>
        </div>
        <button class="memory-add-btn" type="button">Add Photos</button>
        <input class="memory-file-input" type="file" accept="image/*" multiple hidden />
      </div>
      <div class="memory-photo-grid" aria-label="Saved memory photos"></div>
      <p class="memory-photo-hint">Photos are saved privately on this device/browser, not uploaded to GitHub.</p>
    `;

    const actions = card.querySelector(".card-actions");
    const notes = card.querySelector(".notes-area");

    if (notes) {
      card.insertBefore(panel, notes);
    } else if (actions) {
      actions.insertAdjacentElement("afterend", panel);
    } else {
      card.appendChild(panel);
    }

    const button = panel.querySelector(".memory-add-btn");
    const input = panel.querySelector(".memory-file-input");

    button.addEventListener("click", () => input.click());
    input.addEventListener("change", async () => {
      await handleFiles(panel, key, input.files);
      input.value = "";
    });

    renderPhotoGrid(panel, key);
  }

  function applyMemoryPhotos() {
    installStyles();
    document.querySelectorAll(".waterfall-card").forEach(buildMemoryPanel);
  }

  function startMemoryPhotoWatcher() {
    const list = document.getElementById("waterfallList");
    if (!list || window.__memoryPhotoWatcherStarted) return;

    window.__memoryPhotoWatcherStarted = true;
    const observer = new MutationObserver(() => requestAnimationFrame(applyMemoryPhotos));
    observer.observe(list, { childList: true, subtree: true });
  }

  function boot() {
    applyMemoryPhotos();
    startMemoryPhotoWatcher();
    setTimeout(applyMemoryPhotos, 250);
    setTimeout(applyMemoryPhotos, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
