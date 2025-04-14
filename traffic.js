// Firebase konfiguráció
const firebaseConfig = {
      // Insert your Firebase configuration data here
      databaseURL: "https://zsombor-travelling-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Firebase inicializálása
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Hivatkozás az adatbázisban a forgalmi számlálóhoz
const counterRef = database.ref('traffic_counter');
const visitorsRef = database.ref('visitors');

// A látogatók böngészési információinak rögzítése
function logVisitorInfo() {
  const visitorInfo = {
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    referrer: document.referrer,
    url: window.location.href
  };

  visitorsRef.push(visitorInfo, error => {
    if (error) {
      console.error('Error logging visitor info:', error);
    } else {
      console.log('Visitor info logged successfully');
    }
  });
}

// Látogatási idő nyomon követése
function trackVisitDuration() {
  const startTime = Date.now();

  window.addEventListener('beforeunload', () => {
    const endTime = Date.now();
    const duration = endTime - startTime; // milliseconds
    const durationInSeconds = Math.round(duration / 1000);

    visitorsRef.push({
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      durationInSeconds: durationInSeconds
    }, error => {
      if (error) {
        console.error('Error logging visit duration:', error);
      } else {
        console.log('Visit duration logged successfully:', durationInSeconds, 'seconds');
      }
    });
  });
}

// Számláló inicializálása, ha szükséges, és növelése
function initializeCounter() {
  counterRef.once('value', snapshot => {
    if (snapshot.exists()) {
      incrementCounter();
    } else {
      counterRef.set(0, error => {
        if (error) {
          console.error('Error initializing counter:', error);
        } else {
          incrementCounter();
        }
      });
    }
  });
}

// Számláló növelése
function incrementCounter() {
  counterRef.transaction(currentValue => {
    return (currentValue || 0) + 1;
  }).then(result => {
    if (result.committed) {
      console.log('Counter incremented successfully');
    } else {
      console.log('Counter increment failed');
    }
  }).catch(error => {
    console.error('Error incrementing counter:', error);
  });
}

// A látogatók adatainak megjelenítése a konzolban (opcionális)
function displayVisitorData() {
  visitorsRef.limitToLast(10).once('value', snapshot => {
    console.log('Last 10 visitors:', snapshot.val());
  });
}

// Funkciók meghívása
initializeCounter();
logVisitorInfo();
trackVisitDuration();
displayVisitorData(); // Opcionális, csak fejlesztési célokra
