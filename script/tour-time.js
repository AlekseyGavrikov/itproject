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
            const API_KEY = 'D2OMWZNBOSOI';
            const response = await fetch(
                `https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=${timezone}`
            );
            if (!response.ok) throw new Error('Ошибка TimeZoneDB');

            const data = await response.json();
            const timeStr = data.formatted.substring(11, 16);
            document.getElementById('local-time').textContent = timeStr;
        } catch (error) {
            console.error('TimeZoneDB не ответил, использую локальное время:', error);
            const localTime = new Date().toLocaleTimeString('ru-RU', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            document.getElementById('local-time').textContent = localTime;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LocalTimeDisplay();
});