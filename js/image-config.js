/* IMAGE CONFIGURATION - JIGA BHAI TRADING */
const IMAGE_CONFIG = {
    founderHero: {
        url: 'https://i.ibb.co/cS27F7Lh/711588402-17957409570166539-8584741019897070950-n.jpg',
        alt: 'Jiga Bhai - Founder'
    },
    founderAbout: {
        url: 'https://i.ibb.co/yFC8BrCq/Whats-App-Image-2026-07-13-at-7-09-53-AM-1.jpg',
        alt: 'Jiga Bhai - Founder'
    },
    tradeProof1: {
        url: 'https://i.ibb.co/1tNcMJ8z/Whats-App-Image-2026-07-13-at-7-52-31-AM.jpg',
        alt: 'NIFTY 50 Trade - 15 Jul 2025'
    },
    tradeProof2: {
        url: 'https://i.ibb.co/9kWKrqhg/Whats-App-Image-2026-07-13-at-7-52-30-AM-1.jpg',
        alt: 'BANKNIFTY Trade - 14 Jul 2025'
    },
    tradeProof3: {
        url: 'https://i.ibb.co/JjGTS0HZ/Whats-App-Image-2026-07-13-at-7-52-30-AM.jpg',
        alt: 'TATAMOTORS Trade - 13 Jul 2025'
    }
};

const ImageLoader = {
    init: function() {
        this.loadImage('founderHero', '.founder-frame .founder-img');
        this.loadImage('founderAbout', '.about-image .founder-img');
        this.loadTradeProof('tradeProof1', 0);
        this.loadTradeProof('tradeProof2', 1);
        this.loadTradeProof('tradeProof3', 2);
    },
    loadImage: function(key, selector) {
        var img = document.querySelector(selector);
        var config = IMAGE_CONFIG[key];
        if (img && config) {
            img.src = config.url;
            img.alt = config.alt;
        }
    },
    loadTradeProof: function(key, index) {
        var placeholders = document.querySelectorAll('.proof-image-placeholder');
        if (placeholders[index]) {
            var placeholder = placeholders[index];
            var config = IMAGE_CONFIG[key];
            if (config && config.url && config.url.indexOf('PLACEHOLDER') === -1) {
                var img = document.createElement('img');
                img.src = config.url;
                img.alt = config.alt;
                img.className = 'proof-screenshot';
                img.onerror = function() {
                    placeholder.innerHTML = '<i class="fas fa-chart-line"></i><span>Trade Screenshot</span>';
                };
                placeholder.innerHTML = '';
                placeholder.appendChild(img);
                placeholder.classList.add('has-image');
            }
        }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ImageLoader.init();
    });
} else {
    ImageLoader.init();
}
