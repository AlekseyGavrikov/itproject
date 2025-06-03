class LocalTimeDisplay {
    constructor() {
        this.timeZones = {
            'nepal': 'Asia/Kathmandu',
            'bali': 'Asia/Makassar',
            'bora-bora': 'Pacific/Tahiti',
            'france': 'Europe/Paris',
            'grece': 'Europe/Athens',
            'holand': 'Europe/Amsterdam',
            'island': 'Atlantic/Reykjavik',
            'italy': 'Europe/Rome',
            'japan': 'Asia/Tokyo',
            'kosta-rika': 'America/Costa_Rica',
            'maldivi': 'Indian/Maldives',
            'namibia': 'Africa/Windhoek',
            'newzeland': 'Pacific/Auckland',
            'peru': 'America/Lima',
            'portug': 'Europe/Lisbon',
            'seisheli': 'Indian/Mahe',
            'spain': 'Europe/Madrid',
            'turkey': 'Europe/Istanbul',
            'vietnam': 'Asia/Ho_Chi_Minh',
            'abu-dabi': 'Asia/Dubai'
            // остальные временные зоны
        };
        this.pageName = this.getPageName();
        this.init();
    }

    getPageName() {
        return window.location.pathname.split('/').pop().replace('.html', '');
    }

    async init() {
        const timezone = this.timeZones[this.pageName];
        if (timezone) {
            await this.updateTime(timezone);
            setInterval(() => this.updateTime(timezone), 60000);
        }
    }

    async updateTime(timezone) {
        try {
            const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            this.displayTime(data.datetime, timezone);
        } catch (error) {
            console.error('Ошибка получения времени:', error);
            this.displayFallbackTime(timezone);
        }
    }

    displayTime(datetime, timezone) {
        const date = new Date(datetime);
        const timeString = date.toLocaleTimeString('ru-RU', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        document.getElementById('local-time').textContent = timeString;
    }

    displayFallbackTime(timezone) {
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const timeString = new Date().toLocaleTimeString('ru-RU', options);
        document.getElementById('local-time').textContent = `~ ${timeString}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LocalTimeDisplay();
});