/* IMAGE CONFIGURATION - JIGA BHAI TRADING */
const IMAGE_CONFIG = {
    founderHero: {
        url: 'assets/images/founder-lifestyle.jpg',
        alt: 'Jiga Bhai - Founder'
    },
    founderAbout: {
        url: 'assets/images/founder-formal.jpg',
        alt: 'Jiga Bhai - Founder'
    },
    tradeProof1: {
        url: 'https://i.ibb.co/PLACEHOLDER/nifty-trade.jpg',
        alt: 'NIFTY 50 Trade - 15 Jul 2025'
    },
    tradeProof2: {
        url: 'https://i.ibb.co/PLACEHOLDER/banknifty-trade.jpg',
        alt: 'BANKNIFTY Trade - 14 Jul 2025'
    },
    tradeProof3: {
        url: 'https://i.ibb.co/PLACEHOLDER/tatamotors-trade.jpg',
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
