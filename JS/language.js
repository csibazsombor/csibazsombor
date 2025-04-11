    const translations = {
        hu: {
            title_trips: "Utazások",
            title_inf: "Információk",
            rolamCim: "Rólam",
            bekezdes1: "Szia! Csiba Zsombor vagyok, Szlovákiában élek és hadd meséljek egy kicsit magamról. Számomra mindíg is vonzottak azok a dolgok, ahol egyszerre jelenik meg a logika és a kreativitás – talán ezért is találtam rá olyan hamar a programozás világára.",
            bekezdes2: "Számomra a kódolás nem csupán technikai feladat, hanem egyfajta alkotás. Szeretek új rendszereket tervezni, problémák mélyére ásni, és olyan projekteken dolgozni, amelyek az életemet könnyebbé teszik.",
            bekezdes3: "Emellett szívesen foglalkozom játékfejlesztéssel és természetfotó készítésével – ezekben is azt keresem, hogyan lehet valami belsőt külső formába önteni. A szabadidőm nagy részében ezekkel töltődöm fel.",
            bekezdes4: "Szeretek utazni és új kultúrákat megismerni. Az egyik álmom, hogy felfedezzem Ázsiát, amely teljesen új és teljesen más számomra.",
            bekezdes5: "A NetBy Travel egy személyes projektként indult, ahol szeretném megmutatni, hogyan látom a világot – azzal a reménnyel, hogy másokat is elgondolkodtathat vagy motiválhat, hogy bármely célja is van az embernek, csak is önmaga teheti elérhetővé.",
            
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
            galeria_link: "Galéria",
            trips: "Utazások",
            info: "Információk",
            currently_exploring: "JELENLEGI FELFEDEZÉS",
            currently_in: "Jelenleg itt:",
            days_on_road: "Utazási napok: ",
            countries_visited: "Látogatott helyek száma:",
            latest_adventure: "Legújabb Kalandok",
            notrip: "Jeleneg Nincsenek aktív utazások."
        },
        en: {
            title_trips: "Trips",
            title_inf: "Information",
            rolamCim: "About Me",
            bekezdes1: "Hi! I'm Zsombor Csiba, I live in Slovakia and let me tell you a little about myself. I've always been attracted to things where logic and creativity appear at the same time - maybe that's why I found the world of programming so quickly.",
            bekezdes2: "For me, coding is not just a technical task, but a form of creation. I love designing new systems, digging into problems, and working on projects that make my life easier.",
            bekezdes3: "I also enjoy game development and nature photography – in these I also look for ways to express something internal in an external form. I fill most of my free time with these.",
            bekezdes4: "I love to travel and experience new cultures. One of my dreams is to explore Asia, which is completely new and completely different for me.",
            bekezdes5: "NetBy Travel started as a personal project where I wanted to show how I see the world - with the hope that it might make others think or motivate them, that whatever goal a person has, only they can make it possible.",
            
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
            galeria_link: "Gallery",
            trips: "Trips",
            info: "Information",
            currently_exploring: "CURRENTLY EXPLORING",
            currently_in: "Currently in:",
            days_on_road: "Days on road: ",
            countries_visited: "Number of places visited",
            latest_adventure: "Latest Adventures",
            notrip: "No trips yet."
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
        
        // Header
        updateElement("title_trips", t.title_trips);
        updateElement("title_inf", t.title_inf);
        updateElement("galeria_link", t.galeria_link);
        updateElement("home-link", t.home);
        updateElement("info-link", t.info);
        updateElement("trips-link", t.trips);
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
        updateElement("currently_exploring", t.currently_exploring);
        updateElement("currently_in", t.currently_in);
        updateElement("days_on_road", t.days_on_road);
        updateElement("countries_visited", t.countries_visited);
        updateElement("latest_adventures", t.latest_adventure);
        updateElement("currently_exploring", t.currently_exploring);
        updateElement("notrip", t.notrip);
    
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
    