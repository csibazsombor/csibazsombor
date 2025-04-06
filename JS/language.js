    const translations = {
        hu: {
            title: "Információk",
            rolamCim: "Rólam",
            bekezdes1: "Üdvözöllek! Csiba Zsombor vagyok, 2007. július 13-án születtem, és Szlovákiában élek. 17 éves vagyok, és már fiatal korom óta szenvedélyesen érdeklődöm a technológia, a kreativitás és az önkifejezés iránt.",
            bekezdes2: "Az egyik legnagyobb hobbim a programozás. Imádok új dolgokat tanulni, rendszereket építeni, problémákat megoldani, és olyan projekteken dolgozni, amelyekben megvalósíthatom a saját ötleteimet.",
            bekezdes3: "Emellett jelentős tapasztalattal rendelkezem játékfejlesztésben és képszerkesztésben is – ezekkel gyakran foglalkozom szabadidőmben.",
            bekezdes4: "Szeretek utazni és új kultúrákat megismerni. Az egyik álmom, hogy eljussak Japánba – lenyűgöz a kultúrájuk és az emberek mentalitása.",
            bekezdes5: "Ez az oldal, a NetBy Travel, egy személyes projektként indult, amellyel másokat is inspirálni szeretnék.",
            
            // New translations for header, footer, and main content
            verzio: "V4.1",
            update: "2025 Frissítés",
            udvozles: "Üdvözöljük az oldalán!",
            udvozlesText: "Fedezze fel a világ csodáit velünk!",
            galeria: "Úti élmények galériája",
            galeriaText: "Hamarosan feltöltjük legújabb utazási képeinket!",
            kapcsolat: "Kapcsolat",
            elerhetosegek: "Elérhetőségek",
            irjon: "Írjon nekünk",
            kovess: "Kövessen minket",
            youtube: "YouTube",
            instagram: "Instagram",
            copyright: "&copy; 2025 NetBy Travel - Minden jog fenntartva.",
            keszitette: "Készítette: Csiba Zsombor",
            comingSoon: "Hamarosan",
            home: "Főoldal",
            info: "Információk"
        },
        en: {
            title: "Information",
            rolamCim: "About Me",
            bekezdes1: "Welcome! I'm Zsombor Csiba, born on July 13, 2007, living in Slovakia. I'm 17 years old and have been passionate about technology, creativity, and self-expression since I was young.",
            bekezdes2: "One of my biggest hobbies is programming. I love learning new things, building systems, solving problems, and working on projects where I can bring my ideas to life.",
            bekezdes3: "I also have solid experience in game development and image editing – I often engage in these as a hobby or for creative goals.",
            bekezdes4: "Traveling is something I enjoy, and I love exploring new cultures. One of my dreams is to visit Japan – I'm fascinated by their culture and the respectful mindset of their people.",
            bekezdes5: "This site, NetBy Travel, started as a personal project through which I hope to inspire others as well.",
            
            // New translations for header, footer, and main content
            verzio: "V4.1",
            update: "2025 Update",
            udvozles: "Welcome!",
            udvozlesText: "Discover the wonders of the world with us!",
            galeria: "Gallery",
            galeriaText: "New travel photos will be uploaded soon!",
            kapcsolat: "Contact",
            elerhetosegek: "Contact Information",
            irjon: "Write to us",
            kovess: "Follow us",
            youtube: "YouTube",
            instagram: "Instagram",
            copyright: "&copy; 2025 NetBy Travel - All rights reserved.",
            keszitette: "Created by: Csiba Zsombor",
            comingSoon: "Coming Soon",
            home: "Home",
            info: "Information"
        }
    };
    function updateElement(id, value, isHTML = false) {
        const element = document.getElementById(id);
        if (element) {
            element[isHTML ? 'innerHTML' : 'textContent'] = value;
        }
    }
    
    function switchLanguage(lang) {
        const t = translations[lang];
        
        // Update document title
        document.title = t.title;
        
        // Header
        updateElement("home-link", t.home);
        updateElement("info-link", t.info);
        updateElement("coming-soon", t.comingSoon);
    
        // Version info
        updateElement("verzio", t.verzio);
        updateElement("update-info", t.update);
    
        // Main content
        updateElement("rolamCim", t.rolamCim);
        updateElement("p1", t.bekezdes1);
        updateElement("p2", t.bekezdes2);
        updateElement("p3", t.bekezdes3);
        updateElement("p4", t.bekezdes4);
        updateElement("p5", t.bekezdes5);
        updateElement("udvozles", t.udvozles);
        updateElement("udvozles-text", t.udvozlesText);
        updateElement("galeria-title", t.galeria);
        updateElement("galeria-text", t.galeriaText);
    
        // Footer
        updateElement("kapcsolat", t.kapcsolat);
        updateElement("elerhetosegek", t.elerhetosegek);
        updateElement("irjon", t.irjon);
        updateElement("kovess", t.kovess);
        updateElement("youtube", t.youtube);
        updateElement("instagram", t.instagram);
        updateElement("copyright", t.copyright, true); // For HTML content
        updateElement("keszitette", t.keszitette);
    
        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', lang);
    }
    
    function loadLanguage() {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            switchLanguage(savedLang);
        } else {
            switchLanguage('en'); // Default language
        }
    }
    
    window.onload = loadLanguage;
    
    // Example of switching language
    document.getElementById("switch-to-hu")?.addEventListener('click', function() {
        switchLanguage('hu');
    });
    
    document.getElementById("switch-to-en")?.addEventListener('click', function() {
        switchLanguage('en');
    });
    