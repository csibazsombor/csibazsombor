// Remote version URL
const versionUrl = "https://csibazsombor.github.io/csibazsombor/T&T/OurAPP/version.json"; 

let localVersion = getLocalVersion();
let serverVersion = null;
let galleryImages = [];
let updateInfo = ''; // new: details about the update, normalized to a string

// --- Get local version from localStorage ---
function getLocalVersion() {
  let lv = localStorage.getItem('appVersion');
  if (!lv) {
    lv = '0.1.5'; // Default version
    localStorage.setItem('appVersion', lv);
  }
  return lv;
}

// --- Compare versions ---
function compareVersions(v1, v2) {
  const v1parts = (v1 || '').toString().split('.').map(Number);
  const v2parts = (v2 || '').toString().split('.').map(Number);
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const p1 = v1parts[i] || 0;
    const p2 = v2parts[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

// normalize update info to a safe string (handles arrays and objects)
function normalizeUpdateInfo(raw) {
  if (!raw && raw !== 0) return '';
  if (Array.isArray(raw)) return raw.join('\n');
  if (typeof raw === 'object') {
    try {
      // prefer common fields if present
      if (Array.isArray(raw.changes)) return raw.changes.join('\n');
      if (raw.notes && Array.isArray(raw.notes)) return raw.notes.join('\n');
      // otherwise stringify values
      return Object.values(raw).map(v => (Array.isArray(v) ? v.join('\n') : String(v))).join('\n');
    } catch (e) {
      return String(raw);
    }
  }
  return String(raw);
}

// --- Fetch remote version and gallery ---
async function fetchRemoteData() {
  try {
    const currentVersionEl = document.getElementById('currentVersion');
    if (currentVersionEl) currentVersionEl.textContent = 'Fetching...';
    const response = await fetch(versionUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    serverVersion = (data.version || '').toString().trim();
    galleryImages = data.galleryImages || [];

    // Read update info from known fields (flexible) and normalize to string
    const rawInfo = data.updateInfo || data.changelog || data.notes || data;
    updateInfo = normalizeUpdateInfo(rawInfo);

    localStorage.setItem("serverVersion", serverVersion);
    localStorage.setItem("updateInfo", updateInfo);

    if (currentVersionEl) currentVersionEl.textContent = serverVersion;

    // If there's a versionInfo element, populate a brief "what's new" preview
    const versionInfoEl = document.getElementById('versionInfo');
    if (versionInfoEl) {
      if (updateInfo) {
        // sanitize minimal by escaping HTML-sensitive chars
        const escaped = updateInfo.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
        versionInfoEl.innerHTML = `<strong>What's new in ${serverVersion}:</strong><div id="updateNotes">${escaped}</div>`;
        versionInfoEl.style.display = 'block';
      } else {
        versionInfoEl.innerHTML = `<strong>What's new in ${serverVersion}:</strong><div id="updateNotes">No details provided.</div>`;
        versionInfoEl.style.display = 'block';
      }
    }

    return data;
  } catch (err) {
    console.error('Error fetching remote data:', err);
    const currentVersionEl = document.getElementById('currentVersion');
    if (currentVersionEl) currentVersionEl.textContent = 'Error';
    serverVersion = "0.1.4"; // Fallback version
    updateInfo = '';
    return null;
  }
}

// --- Clear gallery ---
function clearGallery() {
  const galleryContent = document.getElementById('galleryContent');
  if (galleryContent) galleryContent.innerHTML = '';
}

// --- Refresh gallery with new images ---
function refreshGallery(newImages) {
  clearGallery();
  galleryImages = newImages;
  const galleryContent = document.getElementById('galleryContent');
  galleryImages.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Gallery ${idx + 1}`;
    galleryContent.appendChild(img);
  });
}

// --- Update local version ---
async function updateLocalVersion(newVersion) {
  const currentLocal = (localStorage.getItem("appVersion") || "0.0.0").toString();
  if (compareVersions(currentLocal, newVersion) < 0) {
    console.log(`Updating local version ${currentLocal} → ${newVersion}`);
    localStorage.setItem("appVersion", newVersion);
    localVersion = newVersion;

    // Refresh gallery
    refreshGallery(galleryImages);

    // Clear caches if any
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
  } else {
    console.log("Already up-to-date:", currentLocal);
  }
}

// --- Show / Close update modal ---
function showUpdateModal() {
  const newVersionSpan = document.getElementById('newVersionSpan');
  const currentVersionSpan = document.getElementById('currentVersionSpan');
  if (newVersionSpan) newVersionSpan.textContent = serverVersion;
  if (currentVersionSpan) currentVersionSpan.textContent = localVersion;

  // populate update details inside modal if element exists
  const updateNotesEl = document.getElementById('updateNotesModal'); // prefer a modal-specific element
  const notesContent = updateInfo || '';
  // sanitize and convert newlines to <br> for display
  const escaped = notesContent.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  if (updateNotesEl) {
    updateNotesEl.innerHTML = escaped || 'No details provided for this update.';
  } else {
    // fallback: try to update a generic updateNotes element
    const fallback = document.getElementById('updateNotes');
    if (fallback) fallback.innerHTML = escaped || 'No details provided for this update.';
  }

  const modal = document.getElementById('updateModal');
  if (modal) modal.classList.add('show');
}

function closeUpdateModal() {
  const modal = document.getElementById('updateModal');
  if (!modal) return;
  modal.classList.add('hide');
  modal.classList.remove('show');
}

// --- Check for updates ---
async function checkForUpdates() {
  if (!serverVersion) {
    const statusEl = document.getElementById('status');
    if (statusEl) statusEl.textContent = 'Loading version...';
    return;
  }

  const statusDiv = document.getElementById('status');
  const updateBtn = document.getElementById('updateBtn');
  const versionInfoEl = document.getElementById('versionInfo');

  if (compareVersions(serverVersion, localVersion) > 0) {
    localStorage.setItem("newVersionAvailable", "true");
    if (statusDiv) {
      statusDiv.textContent = `Update available: ${localVersion} → ${serverVersion}`;
      statusDiv.className = 'status update-available fade-in show';
      statusDiv.style.display = 'block';
    }
    if (updateBtn) updateBtn.style.display = 'inline-block';

    // Show more details in versionInfo if available
    if (versionInfoEl) {
      if (updateInfo) {
        const escaped = updateInfo.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
        versionInfoEl.innerHTML = `<strong>What's new in ${serverVersion}:</strong><div id="updateNotes">${escaped}</div>`;
      } else {
        versionInfoEl.innerHTML = `<strong>What's new in ${serverVersion}:</strong><div id="updateNotes">No details provided.</div>`;
      }
      versionInfoEl.style.display = 'block';
    }

    showUpdateModal();
  } else {
    if (updateBtn) updateBtn.style.display = 'none';
    if (statusDiv) {
      statusDiv.textContent = 'Your application is up to date!';
      statusDiv.className = 'status up-to-date fade-in show';
    }

    closeVersionInfo();
    closeUpdateModal();

    // Wait 2s then fade out
    setTimeout(() => {
      if (statusDiv) {
        statusDiv.classList.remove("fade-in", "show");
        statusDiv.classList.add("fade-out", "hide");
      }

      // After fade-out, hide completely
      setTimeout(() => {
        if (statusDiv) {
          statusDiv.style.display = "none";
          statusDiv.classList.remove("fade-out", "hide");
        }
      }, 500); // match transition duration
    }, 2000);
  }
}

function closeVersionInfo(){
  const el = document.getElementById('versionInfo');
  if (el) el.style.display = 'none';
}


// --- Perform update with progress ---
async function performUpdate() {
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const updateStatus = document.getElementById('updateStatus');
  const updateButtons = document.getElementById('updateButtons');

  if (progressBar) progressBar.style.display = 'block';
  if (updateButtons) updateButtons.style.display = 'none';
  if (updateStatus) updateStatus.textContent = 'Downloading update...';

  let progress = 0;
  const updateInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) progress = 100;
    if (progressFill) progressFill.style.width = progress + '%';
  }, 200);

  await new Promise(resolve => {
    const intervalCheck = setInterval(() => {
      if (progress >= 100) {
        clearInterval(intervalCheck);
        clearInterval(updateInterval);
        resolve();
      }
    }, 100);
  });

  if (updateStatus) updateStatus.textContent = 'Installing update...';
  await new Promise(r => setTimeout(r, 1000));

  await updateLocalVersion(serverVersion);

  if (updateStatus) updateStatus.textContent = 'Update completed successfully!';
  await new Promise(r => setTimeout(r, 500));
  updateApp();
  window.location.reload();
}
// Trigger manual update (e.g. from update button)
function updateApp() {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "MANUAL_UPDATE" });
  }
}

// --- Close gallery modal ---
function closeGallery() {
  const gm = document.getElementById('galleryModal');
  if (gm) gm.style.display = 'none';
}

// --- Initialize app ---
async function init() {
  const localVersionEl = document.getElementById('localVersion');
  if (localVersionEl) localVersionEl.textContent = localVersion;
  await fetchRemoteData();
  await checkForUpdates();
}

init();
