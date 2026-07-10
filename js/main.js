(function() {
    'use strict';

    // ===== ANIMATED BACKGROUND =====
    var canvas = document.getElementById('bgCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var W, H, candles = [], trendPoints = [], particles = [];

        function resize() {
            var dpr = window.devicePixelRatio || 1;
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            init();
        }

        function init() {
            candles = [];
            trendPoints = [];
            particles = [];
            var lastClose = H * 0.5;
            var cw = (W / 70) * 1.2;
            for (var i = 0; i < 70; i++) {
                var open = lastClose;
                var change = (Math.random() - 0.48) * 30;
                var close = open + change;
                var high = Math.min(open, close) - Math.random() * 20;
                var low = Math.max(open, close) + Math.random() * 20;
                candles.push({ open: open, close: close, high: high, low: low, x: i * (W / 70) + (W / 70) / 2, w: cw * 0.7, isGreen: close < open });
                lastClose = close;
            }
            for (var j = 0; j < 50; j++) {
                var x = (j / 49) * W;
                var y = H * 0.5 + Math.sin(j * 0.3) * 80 + Math.cos(j * 0.15) * 100 + (Math.random() - 0.5) * 40;
                trendPoints.push({ x: x, y: y });
            }
            for (var k = 0; k < 25; k++) {
                particles.push({ x: Math.random() * W, y: Math.random() * H, size: Math.random() * 2 + 1, sx: (Math.random() - 0.5) * 0.3, sy: -Math.random() * 0.5 - 0.1, op: Math.random() * 0.5 + 0.2 });
            }
        }

        function drawGrid() {
            ctx.strokeStyle = 'rgba(255, 200, 61, 0.05)';
            ctx.lineWidth = 1;
            for (var i = 0; i <= 10; i++) {
                ctx.beginPath();
                ctx.moveTo(0, (i / 10) * H);
                ctx.lineTo(W, (i / 10) * H);
                ctx.stroke();
            }
            for (var j = 0; j <= 20; j++) {
                ctx.beginPath();
                ctx.moveTo((j / 20) * W, 0);
                ctx.lineTo((j / 20) * W, H);
                ctx.stroke();
            }
        }

        function drawCandles() {
            for (var i = 0; i < candles.length; i++) {
                var c = candles[i];
                var color = c.isGreen ? '#00ff9d' : '#ff3b5c';
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(c.x, c.high);
                ctx.lineTo(c.x, c.low);
                ctx.stroke();
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 6;
                ctx.fillRect(c.x - c.w / 2, Math.min(c.open, c.close), c.w, Math.max(Math.abs(c.open - c.close), 1));
                ctx.shadowBlur = 0;
            }
        }

        function drawTrend() {
            if (trendPoints.length < 2) return;
            var grad = ctx.createLinearGradient(0, 0, W, 0);
            grad.addColorStop(0, 'rgba(255, 200, 61, 0)');
            grad.addColorStop(0.5, 'rgba(255, 200, 61, 0.5)');
            grad.addColorStop(1, 'rgba(255, 200, 61, 0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ffc83d';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.moveTo(trendPoints[0].x, trendPoints[0].y);
            for (var i = 1; i < trendPoints.length - 1; i++) {
                var xc = (trendPoints[i].x + trendPoints[i + 1].x) / 2;
                var yc = (trendPoints[i].y + trendPoints[i + 1].y) / 2;
                ctx.quadraticCurveTo(trendPoints[i].x, trendPoints[i].y, xc, yc);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        function drawParticles() {
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.sx;
                p.y += p.sy;
                if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                ctx.fillStyle = 'rgba(255, 200, 61, ' + p.op + ')';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function render() {
            ctx.clearRect(0, 0, W, H);
            drawGrid();
            drawCandles();
            drawTrend();
            drawParticles();
            requestAnimationFrame(render);
        }

        window.addEventListener('resize', resize);
        resize();
        render();
    }

    // ===== MOBILE MENU =====
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        var links = document.querySelectorAll('.nav-link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        }
    }

    // ===== YEAR =====
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== SMOOTH SCROLL =====
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    }

    // ===== COUNTER =====
    if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var counter = entries[i].target;
                    var target = parseInt(counter.dataset.target, 10);
                    if (isNaN(target)) continue;
                    var duration = 2000;
                    var start = performance.now();
                    function update(now) {
                        var elapsed = now - start;
                        var progress = Math.min(elapsed / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(target * eased).toLocaleString('en-IN');
                        if (progress < 1) requestAnimationFrame(update);
                        else counter.textContent = target.toLocaleString('en-IN');
                    }
                    requestAnimationFrame(update);
                    counterObserver.unobserve(counter);
                }
            }
        }, { threshold: 0.3 });
        var counters = document.querySelectorAll('.counter');
        for (var j = 0; j < counters.length; j++) {
            counterObserver.observe(counters[j]);
        }
    }

    // ===== MODAL =====
    window.openModal = function(id) {
        var modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    window.closeModal = function(id) {
        var modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    var modalLinks = document.querySelectorAll('[data-modal]');
    for (var k = 0; k < modalLinks.length; k++) {
        modalLinks[k].addEventListener('click', function(e) {
            e.preventDefault();
            window.openModal(this.dataset.modal);
        });
    }
    var closeBtns = document.querySelectorAll('[data-close]');
    for (var m = 0; m < closeBtns.length; m++) {
        closeBtns[m].addEventListener('click', function(e) {
            e.preventDefault();
            window.closeModal(this.dataset.close);
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var activeModals = document.querySelectorAll('.modal.active');
            for (var n = 0; n < activeModals.length; n++) {
                window.closeModal(activeModals[n].id);
            }
        }
    });

    // ===== RECOVERY TIMER =====
    window.startRecoveryTimer = function() {
        var timerEl = document.getElementById('recoveryTimer');
        if (!timerEl) return;
        var time = 600;
        if (window._recoveryInterval) clearInterval(window._recoveryInterval);
        window._recoveryInterval = setInterval(function() {
            if (time <= 0) {
                clearInterval(window._recoveryInterval);
                timerEl.innerHTML = '<b>OFFER EXPIRED</b>';
                return;
            }
            var m = Math.floor(time / 60);
            var s = time % 60;
            timerEl.innerHTML = 'Offer expires in: <b>' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '</b>';
            time--;
        }, 1000);
    };

    // ===== EXIT INTENT =====
    var exitShown = false;
    var userActive = false;
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(function(evt) {
        document.addEventListener(evt, function() { userActive = true; }, { once: true, passive: true });
    });
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && userActive && !exitShown) {
            setTimeout(function() {
                if (userActive && !exitShown) {
                    exitShown = true;
                    window.openModal('recoveryModal');
                    window.startRecoveryTimer();
                }
            }, 300);
        }
    });

    // ===== PLAN BUTTONS =====
    var planBtns = document.querySelectorAll('[data-plan-id]');
    for (var p = 0; p < planBtns.length; p++) {
        planBtns[p].addEventListener('click', function(e) {
            e.preventDefault();
            if (this.disabled) return;
            var id = this.dataset.planId;
            var name = this.dataset.planName;
            var amount = parseInt(this.dataset.planAmount, 10);
            if (typeof window.initiatePayment === 'function') {
                window.initiatePayment(id, name, amount);
            } else {
                console.error('Payment module not loaded');
            }
        });
    }
})();
