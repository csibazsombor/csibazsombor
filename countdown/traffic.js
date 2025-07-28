// Firebase konfiguráció
const firebaseConfig = {
  // Insert your Firebase configuration data here
  databaseURL: "https://friendship-with-toyeee-toyaaa-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Firebase inicializálása
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Adatbázis hivatkozások
const counterRef = database.ref('traffic_counter');
const visitorsRef = database.ref('visitors');
const pageViewsRef = database.ref('page_views');
const userInteractionsRef = database.ref('user_interactions');
const performanceRef = database.ref('performance_metrics');
const sessionsRef = database.ref('sessions');

// Egyedi munkamenet azonosító generálása
function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const sessionId = generateSessionId();
let sessionStartTime = Date.now();
let pageLoadTime = performance.now();

// Kibővített látogató információk rögzítése
function logVisitorInfo() {
  const visitorInfo = {
    sessionId: sessionId,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages || [navigator.language],
    referrer: document.referrer,
    url: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
    deviceMemory: navigator.deviceMemory || 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
  };

  visitorsRef.push(visitorInfo, error => {
    if (error) {
      console.error('Error logging visitor info:', error);
    } else {
      console.log('Visitor info logged successfully');
    }
  });
}

// Teljesítmény metrikák rögzítése
function logPerformanceMetrics() {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const performanceMetrics = {
      sessionId: sessionId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      loadTime: Math.round(pageLoadTime),
      domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart) : null,
      pageLoadComplete: navigation ? Math.round(navigation.loadEventEnd - navigation.navigationStart) : null,
      timeToFirstByte: navigation ? Math.round(navigation.responseStart - navigation.navigationStart) : null,
      dnsLookup: navigation ? Math.round(navigation.domainLookupEnd - navigation.domainLookupStart) : null,
      tcpConnection: navigation ? Math.round(navigation.connectEnd - navigation.connectStart) : null,
      serverResponse: navigation ? Math.round(navigation.responseEnd - navigation.responseStart) : null,
      domProcessing: navigation ? Math.round(navigation.domComplete - navigation.domLoading) : null
    };

    performanceRef.push(performanceMetrics, error => {
      if (error) {
        console.error('Error logging performance metrics:', error);
      } else {
        console.log('Performance metrics logged successfully');
      }
    });
  }
}

// Oldal nézetek nyomon követése
function logPageView() {
  const pageViewInfo = {
    sessionId: sessionId,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    url: window.location.href,
    pathname: window.location.pathname,
    title: document.title,
    referrer: document.referrer
  };

  pageViewsRef.push(pageViewInfo, error => {
    if (error) {
      console.error('Error logging page view:', error);
    } else {
      console.log('Page view logged successfully');
    }
  });
}

// Felhasználói interakciók nyomon követése
function trackUserInteractions() {
  // Kattintások nyomon követése
  document.addEventListener('click', event => {
    const interactionData = {
      sessionId: sessionId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      type: 'click',
      elementTag: event.target.tagName.toLowerCase(),
      elementId: event.target.id || null,
      elementClass: event.target.className || null,
      elementText: event.target.textContent ? event.target.textContent.substring(0, 100) : null,
      pageX: event.pageX,
      pageY: event.pageY,
      url: window.location.href
    };

    userInteractionsRef.push(interactionData);
  });

  // Görgetés nyomon követése
  let scrollTimeout;
  let maxScrollDepth = 0;
  
  window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollData = {
        sessionId: sessionId,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        type: 'scroll',
        scrollDepth: scrollDepth,
        maxScrollDepth: maxScrollDepth,
        url: window.location.href
      };

      userInteractionsRef.push(scrollData);
    }, 1000);
  });

  // Billentyűzet interakciók (form mezők)
  document.addEventListener('keydown', event => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      const keyboardData = {
        sessionId: sessionId,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        type: 'keyboard',
        elementTag: event.target.tagName.toLowerCase(),
        elementType: event.target.type || null,
        elementId: event.target.id || null,
        url: window.location.href
      };

      userInteractionsRef.push(keyboardData);
    }
  });
}

// Munkamenet adatok nyomon követése
function trackSession() {
  const sessionData = {
    sessionId: sessionId,
    startTime: firebase.database.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    landingPage: window.location.href
  };

  sessionsRef.child(sessionId).set(sessionData);
}

// Látogatási idő és munkamenet lezárása
function trackVisitDuration() {
  const startTime = Date.now();

  // Oldal elhagyásakor
  window.addEventListener('beforeunload', () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const sessionDuration = endTime - sessionStartTime;
    const durationInSeconds = Math.round(duration / 1000);
    const sessionDurationInSeconds = Math.round(sessionDuration / 1000);

    // Munkamenet frissítése
    sessionsRef.child(sessionId).update({
      endTime: firebase.database.ServerValue.TIMESTAMP,
      sessionDurationInSeconds: sessionDurationInSeconds,
      maxScrollDepth: maxScrollDepth
    });

    // Látogatási idő rögzítése
    visitorsRef.push({
      sessionId: sessionId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      durationInSeconds: durationInSeconds,
      url: window.location.href
    });
  });

  // Láthatóság változás nyomon követése
  document.addEventListener('visibilitychange', () => {
    const visibilityData = {
      sessionId: sessionId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      type: 'visibility_change',
      hidden: document.hidden,
      url: window.location.href
    };

    userInteractionsRef.push(visibilityData);
  });
}

// Hibák nyomon követése
function trackErrors() {
  window.addEventListener('error', event => {
    const errorData = {
      sessionId: sessionId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      type: 'javascript_error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      url: window.location.href
    };

    database.ref('errors').push(errorData);
  });

  window.addEventListener('unhandledrejection', event => {
    const errorData = {
      sessionId: sessionId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      type: 'unhandled_promise_rejection',
      reason: event.reason.toString(),
      url: window.location.href
    };

    database.ref('errors').push(errorData);
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

// Analitikai összesítések
function logDailyStats() {
  const today = new Date().toISOString().split('T')[0];
  const dailyStatsRef = database.ref(`daily_stats/${today}`);
  
  dailyStatsRef.transaction(currentStats => {
    const stats = currentStats || {
      date: today,
      visitors: 0,
      pageViews: 0,
      sessions: 0
    };
    
    stats.visitors += 1;
    stats.pageViews += 1;
    stats.sessions += 1;
    
    return stats;
  });
}

// A látogatók adatainak megjelenítése a konzolban (opcionális)
function displayVisitorData() {
  visitorsRef.limitToLast(10).once('value', snapshot => {
    console.log('Last 10 visitors:', snapshot.val());
  });
}

// UTM paraméterek nyomon követése
function trackUTMParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (urlParams.has(param)) {
      utmParams[param] = urlParams.get(param);
    }
  });

  if (Object.keys(utmParams).length > 0) {
    utmParams.sessionId = sessionId;
    utmParams.timestamp = firebase.database.ServerValue.TIMESTAMP;
    utmParams.url = window.location.href;
    
    database.ref('utm_tracking').push(utmParams);
  }
}

// Összes funkció inicializálása
function initializeAnalytics() {
  try {
    initializeCounter();
    trackSession();
    logVisitorInfo();
    logPageView();
    logPerformanceMetrics();
    trackVisitDuration();
    trackUserInteractions();
    trackErrors();
    trackUTMParameters();
    logDailyStats();
    displayVisitorData(); // Opcionális, csak fejlesztési célokra
    
    console.log('Enhanced analytics initialized successfully');
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
}

// Teljesítmény metrikák betöltés után
window.addEventListener('load', () => {
  setTimeout(logPerformanceMetrics, 1000);
});

// Analitikai rendszer inicializálása
initializeAnalytics();