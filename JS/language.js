    const translations = {
        hu: {
            title_trips: "Utazások",
            title_inf: "Információk",
            rolamCim: "Rólam",
            bekezdes1: "Szia! Csiba Zsombor vagyok, Szlovákiában élek, és hadd meséljek egy kicsit magamról. Mostanában egyre fontosabbá vált számomra az, hogy kiegyensúlyozott életet éljek, és valódi, mély baráti kapcsolatokat ápoljak. Hiszem, hogy az emberekkel való őszinte kapcsolódás és egymás segítése az, ami igazán értékessé teszi az életet.",
            bekezdes2: "Korábban a programozás világában találtam meg az alkotás örömét, de most inkább az emberekkel való törődés, a kapcsolatok építése és az élet apró örömei foglalkoztatnak. Szeretem, ha jelen lehetek mások életében, ha támogathatom őket, vagy egyszerűen csak meghallgathatok valakit, akinek szüksége van rá.",
            bekezdes3: "Szívesen töltöm az időmet a természetben, fotózással, beszélgetésekkel vagy akár egy jó séta során. Ezek a pillanatok töltenek fel, és segítenek abban, hogy megtartsam a belső egyensúlyomat. Egyre inkább keresem azokat a tevékenységeket, ahol önazonos lehetek, és másokat is inspirálhatok a lassabb, tudatosabb életre.",
            bekezdes4: 'Szeretek utazni, de már nem egy konkrét ország vonz, hanem maga a felfedezés élménye. Nem hiszem, hogy lenne "kedvenc országom" – inkább minden helyet szeretnék megismerni a maga egyediségében, és mindenhol tanulni valami újat az emberektől, kultúráktól, történetektől.',
            bekezdes5: "A Zsombor Travel egy személyes projektként indult, amelyben szeretném megmutatni, hogyan látom a világot – nemcsak tájakon, hanem kapcsolatokon és tapasztalatokon keresztül. Remélem, hogy amit megosztok, másokat is arra ösztönözhet, hogy nyitottabbak legyenek, és merjenek kapcsolódni – önmagukhoz és egymáshoz egyaránt.",
            
            // New translations for header, footer, and main content
            verzio: "V4.2",
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
            copyright: "&copy; 2025 Zsombor Travel - Minden jog fenntartva.",
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
            bekezdes1: "Hi! I'm Zsombor Csiba, I live in Slovakia, and let me tell you a little about myself. Recently, it has become more and more important for me to live a balanced life and to cultivate real, deep friendships. I believe that sincerely connecting with people and helping each other is what makes life truly valuable.",
            bekezdes2: "I used to find joy in the world of programming, but now I'm more interested in caring for people, building relationships, and the little joys of life. I love being present in other people's lives, supporting them, or simply listening to someone who needs it.",
            bekezdes3: "I enjoy spending time in nature, taking photos, having conversations, or even taking a nice walk. These moments recharge me and help me maintain my inner balance. I am increasingly looking for activities where I can be myself and inspire others to live a slower, more conscious life.",
            bekezdes4: "I love to travel, but I'm no longer drawn to a specific country, but to the experience of discovery itself. I don't think I have a 'favorite country' - I'd rather experience each place in its own unique way, and learn something new from the people, cultures, and stories everywhere.",
            bekezdes5: "Zsombor Travel started as a personal project in which I wanted to show how I see the world – not just through landscapes, but through relationships and experiences. I hope that what I share can inspire others to be more open and dare to connect – both with themselves and with each other.",
            
            // New translations for header, footer, and main content
            verzio: "V4.2",
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
            copyright: "&copy; 2025 Zsombor Travel - All rights reserved.",
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
    document.getElementById("switch-to-jp")?.addEventListener('click', function() {
        switchLanguage('jp');
    });
    