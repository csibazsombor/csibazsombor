let currentLanguage = 'id';

const translations = {
    id: {
        title: 'persahabatan dengan Toyeee dan Toyaaa',
        description: 'Pilih bahasa yang Anda inginkan untuk melanjutkan. Pengalaman yang disesuaikan menanti Anda.',
        years: 'tahun',
        months: 'bulan',
        days: 'hari',
        hours: 'jam',
        minutes: 'menit',
        seconds: 'detik',
        show_more_btn: 'Tampilkan lebih',
        show_stats_btn: 'Tampilkan statistik',
        totaldays: 'Total hari',
        totalhours: 'Total jam',
        totalweeks: 'Total minggu',
        goalprogress: 'Kemajuan tujuan',
        nextfriendiversary: 'Perayaan persahabatan berikutnya',
        toyeeesbirthday: 'Ulang tahun Toyeee',
        toyaaasbirthday: 'Ulang tahun Toyaaa',
        ourtimezone: 'Zona waktu kita',
    },  
    en: {
        title: 'Friendship with Toyeee and Toyaaa',
        description: 'Choose your preferred language to continue. A personalized experience awaits you.',
        years: 'years',
        months: 'months',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
        show_more_btn: 'Show more',
        show_stats_btn: 'Show stats',
        totaldays: 'Total days',
        totalhours: 'Total hours',
        totalweeks: 'Total weeks',
        goalprogress: 'Goal progress',
        nextfriendiversary: 'Next friendiversary',
        toyeeesbirthday: 'Toyeee\'s birthday',
        toyaaasbirthday: 'Toyaaa\'s birthday',
        ourtimezone: 'Our timezone',

    }
};


// Load saved language from localStorage if available
const savedLanguage = localStorage.getItem('selectedLanguage');
if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
    currentLanguage = savedLanguage;
}

function switchLanguage(lang, force = false) {
    // Only skip if not forced AND already in desired language
    if (!force && currentLanguage === lang) return;

    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);

    const switcher = document.getElementById('languageSwitcher');
    const title = document.getElementById('title_friendship');
    const idBtn = document.getElementById('switch-to-id');
    const enBtn = document.getElementById('switch-to-en');

    // Update switcher appearance
    if (lang === 'en') {
        switcher.classList.add('en');
        enBtn.classList.add('active');
        idBtn.classList.remove('active');
    } else {
        switcher.classList.remove('en');
        idBtn.classList.add('active');
        enBtn.classList.remove('active');
    }

    // Animate text change only if not forced
    if (!force) {
        title.style.opacity = '0';
        setTimeout(() => {
            updateContent(lang);
            title.style.opacity = '1';
        }, 200);
    } else {
        updateContent(lang);
    }

    // Add button click animation only when user clicks
    if (!force) {
        const activeBtn = lang === 'en' ? enBtn : idBtn;
        activeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            activeBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                activeBtn.style.transform = 'scale(1)';
            }, 100);
        }, 100);
    }
}

function updateContent(lang) {  
    document.getElementById('years_Y').textContent = translations[lang].years;
    document.getElementById('months_M').textContent = translations[lang].months;
    document.getElementById('days_D').textContent = translations[lang].days;
    document.getElementById('hours_H').textContent = translations[lang].hours;
    document.getElementById('minutes_M').textContent = translations[lang].minutes;
    document.getElementById('seconds_S').textContent = translations[lang].seconds;
    document.getElementById('title_friendship').textContent = translations[lang].title;
    document.getElementById('show_more_btn').textContent = translations[lang].show_more_btn;
    document.getElementById('show_stats_btn').textContent = translations[lang].show_stats_btn;
    document.getElementById('totaldays').textContent = translations[lang].totaldays;
    document.getElementById('totalhours').textContent = translations[lang].totalhours;
    document.getElementById('totalweeks').textContent = translations[lang].totalweeks;
    document.getElementById('goalprogress').textContent = translations[lang].goalprogress;
    document.getElementById('nextfriendiversary').textContent = translations[lang].nextfriendiversary;
    document.getElementById('toyeeesbirthday').textContent = translations[lang].toyeeesbirthday;
    document.getElementById('toyaaasbirthday').textContent = translations[lang].toyaaasbirthday;
    document.getElementById('ourtimezone').textContent = translations[lang].ourtimezone;
}



// Initialize language on page load
document.addEventListener('DOMContentLoaded', function () {
    switchLanguage(currentLanguage, true); // force UI update
});
