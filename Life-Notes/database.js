  // Your Firebase config — replace with your actual Firebase config
  const firebaseConfig = {
  apiKey: "AIzaSyCmfBilSi1wB566wWPEJFiSptdtmVY4ZTo",
  authDomain: "memory-keeper-daefe.firebaseapp.com",
  databaseURL: "https://memory-keeper-daefe-default-rtdb.firebaseio.com",
  projectId: "memory-keeper-daefe",
  storageBucket: "memory-keeper-daefe.firebasestorage.app",
  messagingSenderId: "957376229693",
  appId: "1:957376229693:web:df9734fb49a7c82ed29554",
  measurementId: "G-Q9RZ1HNNC6"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  let data = {
    memories: [],
    travel: [],
    friends: [],
    notes: []
  };

  let currentSection = 'dashboard';

  async function init() {
    await loadData();
    updateStats();
    updateDashboard();
  }

  // Load all data from Firebase
  async function loadData() {
  const snapshot = await db.ref('/').get();
  if (snapshot.exists()) {
    const dbData = snapshot.val();
    data.memories = dbData.memories ? Object.values(dbData.memories) : [];
    data.travel = dbData.travel ? Object.values(dbData.travel) : [];
    data.friends = dbData.friends ? Object.values(dbData.friends) : [];
    data.notes = dbData.notes ? Object.values(dbData.notes) : [];
  } else {
    data = {
      memories: [],
      travel: [],
      friends: [],
      notes: []
    };
  }
}

  function showSection(section, event) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    currentSection = section;
    renderSection(section);
  }

  function renderSection(section) {
    if (section === 'dashboard') {
      updateDashboard();
      return;
    }


    const grid = document.getElementById(section + '-grid');
    const items = data[section];

    if (!items || items.length === 0) {
      grid.innerHTML = `<p>No items yet in ${section}.</p>`;
      return;
    }

      const typeMap = {
        memories: 'memory',
        travel: 'travel',
        friends: 'friend',
        notes: 'note'
        };

        grid.innerHTML = items.map(item => createCard(item, typeMap[section])).join('');
  }

  function createCard(item, type) {
   console.log('createCard called with type:', type, 'title:', item.title);
    const typeIcons = {
      memory: '💭',
      travel: '✈️',
      friend: '👤',
      note: '📝'
    };

    let extraContent = '';
    if (type === 'travel' && item.location) {
      extraContent = `<p><strong>📍 ${item.location}</strong></p>`;
    } else if (type === 'friend' && item.contact) {
      extraContent = `<p><strong>📞 ${item.contact}</strong></p>`;
    }

return `
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">${typeIcons[type]} ${item.title}</h3>
            <span class="card-date">${item.date}</span>
        </div>
        <div class="card-content">
          ${extraContent}
          <p>${item.description}</p>
        </div>
        ${item.tags && item.tags.length ? `<div class="card-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
      </div>
    `;
  }

  function updateStats() {
    document.getElementById('total-memories').textContent = data.memories.length;
    document.getElementById('total-travels').textContent = data.travel.length;
    document.getElementById('total-friends').textContent = data.friends.length;
    document.getElementById('total-notes').textContent = data.notes.length;
  }

  function updateDashboard() {
    const recentItems = document.getElementById('recent-items');
    const allItems = [
      ...data.memories.map(item => ({...item, type: 'memory'})),
      ...data.travel.map(item => ({...item, type: 'travel'})),
      ...data.friends.map(item => ({...item, type: 'friend'})),
      ...data.notes.map(item => ({...item, type: 'note'}))
    ].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).slice(0, 6);

    if (allItems.length === 0) {
      recentItems.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>Start Your Journey</h3>
          <p>Begin by adding your first memory, travel experience, or note using the + button below.</p>
        </div>
      `;
      return;
    }

    recentItems.innerHTML = allItems.map(item => createCard(item, item.type)).join('');
  }

  function openModal() {
    document.getElementById('modal').classList.add('active');
    updateFormFields();
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('entry-form').reset();
  }

  function updateFormFields() {
    const type = document.getElementById('entry-type').value;
    const locationGroup = document.getElementById('location-group');
    const contactGroup = document.getElementById('contact-group');

    locationGroup.style.display = (type === 'travel' || type === 'memory') ? 'block' : 'none';
    contactGroup.style.display = type === 'friend' ? 'block' : 'none';
  }

  document.getElementById('entry-type').addEventListener('change', updateFormFields);

  document.getElementById('entry-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const type = document.getElementById('entry-type').value;
    const title = document.getElementById('entry-title').value.trim();
    const description = document.getElementById('entry-description').value.trim();
    const location = document.getElementById('entry-location').value.trim();
    const contact = document.getElementById('entry-contact').value.trim();
    const tags = document.getElementById('entry-tags').value.trim();

    if (!title) {
      alert('Please enter a title');
      return;
    }

    const newEntry = {
      id: Date.now(),
      title,
      description,
      date: new Date().toLocaleDateString(),
      dateCreated: new Date().toISOString(),
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };

    if (location) newEntry.location = location;
    if (contact) newEntry.contact = contact;

    const sectionKey = type === 'memory' ? 'memories' : type;

    // Push to Firebase
    const sectionRef = db.ref(sectionKey);
    const newItemRef = sectionRef.push();
    await newItemRef.set(newEntry);

    // Reload data from Firebase
    await loadData();

    updateStats();
    renderSection(currentSection);
    updateDashboard();
    closeModal();
  });

  // Close modal on outside click
  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // Initialize app on load
  window.onload = () => {
    init();
  };