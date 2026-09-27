/* ============================================================
   JIGA BHAI KI PHOTOS — sirf is file ki URL badlo.
   Page load hote hi ye URLs HTML wali photos ko replace kar deti hain.
   Agar imgbb link toot jaye to yahan apni site ka path daal do,
   jaise: 'assets/images/jiga-hero.jpg'
   ============================================================ */
var IMAGE_CONFIG = {
    // Home page badi photo — index.html mein bhi line ~215
    founderHero: {
        url: 'https://i.ibb.co/m5f9RZk7/Whats-App-Image-2026-09-27-at-6-43-52-AM.jpg',
        alt: 'Jiga Bhai - Founder'
    },
    // About / founder photo — index.html mein bhi line ~294
    founderAbout: {
        url: 'https://i.ibb.co/C5QGDmXR/Whats-App-Image-2026-09-27-at-6-43-51-AM.jpg',
        alt: 'Jiga Bhai - Founder'
    },
    // Neeche 3 trade screenshots — index.html ~371, ~383, ~395
    tradeProof1: {
        url: 'https://i.ibb.co/1tNcMJ8z/Whats-App-Image-2026-07-13-at-7-52-31-AM.jpg',
        alt: 'Example Nifty setup chart, 15 Jul 2025'
    },
    tradeProof2: {
        url: 'https://i.ibb.co/9kWKrqhg/Whats-App-Image-2026-07-13-at-7-52-30-AM-1.jpg',
        alt: 'Example Bank Nifty setup chart, 14 Jul 2025'
    },
    tradeProof3: {
        url: 'https://i.ibb.co/JjGTS0HZ/Whats-App-Image-2026-07-13-at-7-52-30-AM.jpg',
        alt: 'Example Tata Motors setup chart, 13 Jul 2025'
    }
};

var ImageLoader = {
    init: function () {
        this.bind('founderHero', '.founder-frame .founder-img');
        this.bind('founderAbout', '.about-image .founder-img');
        this.bind('tradeProof1', '[data-proof="1"]');
        this.bind('tradeProof2', '[data-proof="2"]');
        this.bind('tradeProof3', '[data-proof="3"]');
    },
    bind: function (key, selector) {
        var img = document.querySelector(selector);
        var config = IMAGE_CONFIG[key];
        if (!img || !config || !config.url) return;
        img.alt = config.alt;
        img.addEventListener('error', function () {
            img.classList.add('is-broken');
        });
        if (img.getAttribute('src') !== config.url) img.src = config.url;
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { ImageLoader.init(); });
} else {
    ImageLoader.init();
}
