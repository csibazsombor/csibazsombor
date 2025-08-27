// Remote version URL
var version = null;
var galleryImages = [];
var versionUrl = "https://csibazsombor.github.io/csibazsombor/T&T/OurAPP/version.json"; 

var localVersion = getLocalVersion();

// Get local version from localStorage
function getLocalVersion() {
  let loversion = localStorage.getItem('appVersion');
  if (!loversion) {
    loversion = '0.0.5';
    localStorage.setItem('appVersion', loversion);
  }
  return loversion;
}

// Compare two versions
function compareVersions(version1, version2) {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    if (v1part > v2part) return 1;
    if (v1part < v2part) return -1;
  }
  return 0;
}

// Fetch version and gallery images from remote JSON
async function fetchVersionFromUrl() {
  try {
    document.getElementById('currentVersion').textContent = 'Fetching...';

    const response = await fetch(versionUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    version = data.version.trim();
    galleryImages = data.galleryImages || [];
    localStorage.setItem("serverVersion", version);

    document.getElementById('currentVersion').textContent = version;
    return version;

  } catch (error) {
    console.error('Error fetching version:', error);
    document.getElementById('currentVersion').textContent = 'Error loading version';
    version = "0.0.5"; // fallback
    return version;
  }
}

// Update local version and gallery images
async function updateLocalVersion(newVersion) {
  const currentLocalVersion = localStorage.getItem("appVersion") || "0.0.0";

  if (compareVersions(currentLocalVersion, newVersion) < 0) {
    console.log(`Updating from ${currentLocalVersion} → ${newVersion}`);
    localStorage.setItem("appVersion", newVersion);

    // Inject gallery images
    const galleryContent = document.getElementById('galleryContent');
    if (galleryContent && galleryImages && galleryImages.length > 0) {
      // Append new images without removing old ones
      galleryImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Gallery ${index + 1}`;
        galleryContent.appendChild(img);
      });
    }

    // Clear caches if any
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }

  } else {
    console.log("Already up-to-date:", currentLocalVersion);
  }
}


// Check if updates are available
function checkForUpdates() {
  if (typeof version === 'undefined' || !version) {
    document.getElementById('status').textContent = 'Loading version...';
    return;
  }

  const currentLocalVersion = localStorage.getItem("appVersion") || "0.0.0";
  const statusDiv = document.getElementById('status');
  const updateBtn = document.getElementById('updateBtn');

  if (compareVersions(version, currentLocalVersion) > 0) {
    // New version available
    localStorage.setItem("newVersionAvailable", "true");
    statusDiv.textContent = `Update available: ${currentLocalVersion} → ${version}`;
    statusDiv.className = 'status update-available';
  
    showUpdateModal();
  } else {
    // Already up-to-date
    updateBtn.style.display = 'none';
    statusDiv.textContent = 'Your application is up to date!';
    statusDiv.className = 'status up-to-date';
    closeUpdateModal();
    closeVersionInfo();
  }
}


// Modal functions
function showUpdateModal() {
  document.getElementById('newVersionSpan').textContent = version;
  document.getElementById('currentVersionSpan').textContent = localStorage.getItem("appVersion");
  document.getElementById('updateModal').classList.add('show');
}

function closeUpdateModal() {
  const modal = document.getElementById('updateModal');
  modal.classList.add('hide');
  modal.classList.remove('show');
}

function closeVersionInfo() {
  document.getElementById('versionInfo').style.display = 'none';
}

// Fake progress update
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
    if (progress >= 100) {
      progress = 100;
      clearInterval(updateInterval);

      setTimeout(async () => {
        updateStatus.textContent = 'Installing update...';
        setTimeout(async () => {
          updateStatus.textContent = 'Update completed successfully!';
          await updateLocalVersion(version); // ensure async finishes
          window.location.reload();          // reload after storage updated
        }, 1000);
      }, 500);
    }
    progressFill.style.width = progress + '%';
  }, 200);
}


// Close gallery modal
function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

// Init
async function init() {
  document.getElementById('localVersion').textContent = localVersion;
  await fetchVersionFromUrl();
  setTimeout(checkForUpdates, 500);
}

init();
