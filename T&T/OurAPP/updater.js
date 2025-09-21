// Remote version URL
const versionUrl = "https://csibazsombor.github.io/csibazsombor/T&T/OurAPP/version.json"; 

let localVersion = getLocalVersion();
let serverVersion = null;
let galleryImages = [];

// --- Get local version from localStorage ---
function getLocalVersion() {
  let lv = localStorage.getItem('appVersion');
  if (!lv) {
    lv = '0.1.0'; // Default version
    localStorage.setItem('appVersion', lv);
  }
  return lv;
}

// --- Compare versions ---
function compareVersions(v1, v2) {
  const v1parts = v1.split('.').map(Number);
  const v2parts = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const p1 = v1parts[i] || 0;
    const p2 = v2parts[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

// Links
function togetherSince() {
  window.open(
    "https://csibazsombor.github.io/csibazsombor/T&T/counter/counter.html",
    "_blank"
  );
}

function ourStory() {
  window.open(
    "https://csibazsombor.github.io/csibazsombor/T&T/ourstory.html",
    "_blank"
  );
}


// --- Fetch remote version and gallery ---
async function fetchRemoteData() {
  try {
    document.getElementById('currentVersion').textContent = 'Fetching...';
    const response = await fetch(versionUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    serverVersion = data.version.trim();
    galleryImages = data.galleryImages || [];
    localStorage.setItem("serverVersion", serverVersion);

    document.getElementById('currentVersion').textContent = serverVersion;
    return data;
  } catch (err) {
    console.error('Error fetching remote data:', err);
    document.getElementById('currentVersion').textContent = 'Error';
    serverVersion = "0.1.0"; // Fallback version
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
  const currentLocal = localStorage.getItem("appVersion") || "0.0.0";
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
  document.getElementById('newVersionSpan').textContent = serverVersion;
  document.getElementById('currentVersionSpan').textContent = localVersion;
  document.getElementById('updateModal').classList.add('show');
}

function closeUpdateModal() {
  const modal = document.getElementById('updateModal');
  modal.classList.add('hide');
  modal.classList.remove('show');
}

// --- Check for updates ---
async function checkForUpdates() {
  if (!serverVersion) {
    document.getElementById('status').textContent = 'Loading version...';
    return;
  }

  const statusDiv = document.getElementById('status');
  const updateBtn = document.getElementById('updateBtn');

  if (compareVersions(serverVersion, localVersion) > 0) {
    localStorage.setItem("newVersionAvailable", "true");
    statusDiv.textContent = `Update available: ${localVersion} → ${serverVersion}`;
    statusDiv.className = 'status update-available fade-in show';
    updateBtn.style.display = 'inline-block';
    showUpdateModal();
  } else {
    updateBtn.style.display = 'none';
    statusDiv.textContent = 'Your application is up to date!';
    statusDiv.className = 'status up-to-date fade-in show';

    closeversioninfo();
    closeUpdateModal();

    // Wait 2s then fade out
    setTimeout(() => {
      statusDiv.classList.remove("fade-in", "show");
      statusDiv.classList.add("fade-out", "hide");

      // After fade-out, hide completely
      setTimeout(() => {
        statusDiv.style.display = "none";
        statusDiv.classList.remove("fade-out", "hide");
      }, 500); // match transition duration
    }, 2000);
  }
}

function closeversioninfo(){
  document.getElementById('versionInfo').style.display = 'none';
}


// --- Perform update with progress ---
async function performUpdate() {
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const updateStatus = document.getElementById('updateStatus');
  const updateButtons = document.getElementById('updateButtons');

  progressBar.style.display = 'block';
  updateButtons.style.display = 'none';
  updateStatus.textContent = 'Downloading update...';

  let progress = 0;
  const updateInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) progress = 100;
    progressFill.style.width = progress + '%';
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

  updateStatus.textContent = 'Installing update...';
  await new Promise(r => setTimeout(r, 1000));

  await updateLocalVersion(serverVersion);

  updateStatus.textContent = 'Update completed successfully!';
  await new Promise(r => setTimeout(r, 500));
  updateApp()
  window.location.reload();
}
// Trigger manual update (e.g. from update button)
function updateApp() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "MANUAL_UPDATE" });
  }
}

// --- Close gallery modal ---
function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

// --- Initialize app ---
async function init() {
  document.getElementById('localVersion').textContent = localVersion;
  await fetchRemoteData();
  await checkForUpdates();
}

init();
