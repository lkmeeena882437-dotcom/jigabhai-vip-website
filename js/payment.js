var PAYMENT_CONFIG = {
    RAZORPAY_KEY_ID: 'rzp_test_XXXXXXXXXXXXXXX',
    TELEGRAM_LINKS: {
        basic: 'https://t.me/+YOUR_BASIC_VIP_GROUP_LINK',
        pro: 'https://t.me/+YOUR_PRO_VIP_GROUP_LINK',
        premium: 'https://t.me/+YOUR_PREMIUM_VIP_GROUP_LINK',
        ultimate: 'https://t.me/+YOUR_ULTIMATE_VIP_GROUP_LINK',
        'pro-discount': 'https://t.me/+YOUR_PRO_VIP_GROUP_LINK'
    }
};

function initiatePayment(planId, planName, planAmount) {
    if (typeof Razorpay === 'undefined') {
        loadRazorpay(function() {
            if (typeof Razorpay !== 'undefined') {
                openCheckout(planId, planName, planAmount);
            } else {
                showNotification('Payment gateway not available. Contact us on WhatsApp.', 'error');
            }
        });
    } else {
        openCheckout(planId, planName, planAmount);
    }
}

function openCheckout(planId, planName, planAmount) {
    var btn = document.querySelector('[data-plan-id="' + planId + '"]');
    var originalText = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'; btn.disabled = true; }

    try {
        var options = {
            key: PAYMENT_CONFIG.RAZORPAY_KEY_ID,
            amount: planAmount,
            currency: 'INR',
            name: 'Jiga Bhai | Gujrati Trader',
            description: planName + ' - 30 Days VIP',
            image: 'assets/images/founder-formal.jpg',
            prefill: { name: '', email: '', contact: '' },
            notes: { plan_id: planId, plan_name: planName },
            theme: { color: '#ffc83d', backdrop_color: 'rgba(5, 8, 16, 0.9)' },
            modal: {
                ondismiss: function() {
                    if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
                    setTimeout(function() {
                        window.openModal('recoveryModal');
                        if (typeof window.startRecoveryTimer === 'function') window.startRecoveryTimer();
                    }, 500);
                },
                escape: true
            },
            handler: function(response) {
                if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
                window.openModal('successModal');
                var link = PAYMENT_CONFIG.TELEGRAM_LINKS[planId] || PAYMENT_CONFIG.TELEGRAM_LINKS.basic;
                setTimeout(function() {
                    window.open(link, '_blank', 'noopener,noreferrer');
                    setTimeout(function() { window.closeModal('successModal'); }, 500);
                }, 2500);
            }
        };

        var rzp = new Razorpay(options);
        rzp.on('payment.failed', function(response) {
            if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
            showNotification('Payment failed: ' + (response.error.description || 'Please try again'), 'error');
            setTimeout(function() { window.openModal('recoveryModal'); }, 1500);
        });
        rzp.open();
    } catch (err) {
        if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
        showNotification('Payment error. Please try again.', 'error');
    }
}

function loadRazorpay(callback) {
    if (typeof Razorpay !== 'undefined') { callback(); return; }
    var s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = callback;
    s.onerror = callback;
    document.head.appendChild(s);
    setTimeout(callback, 5000);
}

function showNotification(message, type) {
    type = type || 'info';
    var n = document.createElement('div');
    var borderColor = type === 'error' ? '#ff3b5c' : '#00ff9d';
    var shadowColor = type === 'error' ? 'rgba(255, 59, 92, 0.3)' : 'rgba(0, 255, 157, 0.3)';
    var iconClass = type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check';
    var iconColor = type === 'error' ? '#ff3b5c' : '#00ff9d';

    n.style.cssText = 'position:fixed;top:100px;right:24px;background:rgba(10,14,26,0.95);backdrop-filter:blur(20px);border:1.5px solid ' + borderColor + ';border-radius:16px;padding:16px 24px;z-index:999;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px ' + shadowColor + ';max-width:360px;transition:all 0.5s;';
    n.innerHTML = '<i class="fas ' + iconClass + '" style="color:' + iconColor + ';font-size:1.4rem;"></i><div style="color:#fff;font-weight:600;">' + message + '</div>';
    document.body.appendChild(n);
    setTimeout(function() {
        n.style.opacity = '0';
        n.style.transform = 'translateX(120%)';
        setTimeout(function() { n.remove(); }, 500);
    }, 5000);
}

window.initiatePayment = initiatePayment;
window.showNotification = showNotification;
