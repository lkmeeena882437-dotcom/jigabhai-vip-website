(function () {
    'use strict';

    function istParts(date) {
        var fmt = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Kolkata',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
            day: '2-digit',
            month: 'short'
        });
        var parts = {};
        fmt.formatToParts(date || new Date()).forEach(function (p) {
            if (p.type !== 'literal') parts[p.type] = p.value;
        });
        return parts;
    }

    function sessionState(parts) {
        var weekend = parts.weekday === 'Sat' || parts.weekday === 'Sun';
        var minutes = (parseInt(parts.hour, 10) * 60) + parseInt(parts.minute, 10);
        if (weekend) return 'weekend';
        if (minutes >= 9 * 60 && minutes < 9 * 60 + 15) return 'pre';
        if (minutes >= 9 * 60 + 15 && minutes < 15 * 60 + 30) return 'open';
        return 'closed';
    }

    function label(key, fallback) {
        var lang = document.documentElement.getAttribute('data-lang') || 'en';
        if (window.JB_I18N && lang !== 'en') {
            var value = window.JB_I18N.t('market.' + key, lang);
            if (value) return value;
        }
        return fallback;
    }

    function render() {
        var parts = istParts(new Date());
        var state = sessionState(parts);
        var badge = document.getElementById('marketStatus');
        var clock = document.getElementById('sessionClock');
        var phase = document.getElementById('sessionPhase');
        var note = document.getElementById('tickerNote');

        var text = {
            open: label('open', 'OPEN'),
            closed: label('closed', 'CLOSED'),
            pre: label('pre', 'PRE-OPEN'),
            weekend: label('weekend', 'WEEKEND')
        }[state];

        if (badge) {
            badge.textContent = text;
            badge.classList.toggle('is-open', state === 'open');
            badge.classList.toggle('is-pre', state === 'pre');
            badge.title = 'NSE cash session 09:15–15:30 IST, Monday to Friday. Not a live price feed.';
        }
        if (phase) phase.textContent = text;
        if (clock) {
            clock.textContent = parts.weekday + ' ' + parts.day + ' ' + parts.month + ' · ' + parts.hour + ':' + parts.minute + ' IST';
        }
        if (note) {
            var lang = document.documentElement.getAttribute('data-lang') || 'en';
            var translated = window.JB_I18N && lang !== 'en' ? window.JB_I18N.t('ticker.note', lang) : null;
            note.textContent = translated || 'Not live prices';
        }
    }

    function boot() {
        render();
        setInterval(render, 30000);
        document.addEventListener('jb:lang', render);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
