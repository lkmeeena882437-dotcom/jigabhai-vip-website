/* ============================================
   WHATSAPP PAYMENT REDIRECT
   (Razorpay ki jagah seedha WhatsApp pe redirect)
   ============================================ */

// ⚠️ APNA WHATSAPP NUMBER DAALO (no + sign, no spaces, country code ke saath)
// Example India: 919876543210
const WHATSAPP_NUMBER = '918306819219';

// Plan details
const PLAN_DETAILS = {
    basic: {
        name: 'Basic Strike',
        duration: '15 days',
        amount: 8000
    },
    pro: {
        name: 'Pro Hunter',
        duration: '30 days',
        amount: 15000
    },
    'pro-discount': {
        name: 'Pro Hunter (30% Discount)',
        duration: '30 days',
        amount: 10500
    },
    premium: {
        name: 'Elite Sniper',
        duration: '30 days',
        amount: 28000
    },
    ultimate: {
        name: 'Inner Circle',
        duration: '30 days',
        amount: 50000
    }
};

// Function: User clicks ACTIVATE → Redirect to WhatsApp with pre-filled message
function initiatePayment(planId, planName, planAmount) {
    // Get plan details
    var plan = PLAN_DETAILS[planId] || {
        name: planName || 'Unknown Plan',
        duration: '30 days',
        amount: planAmount ? Math.floor(planAmount / 100) : 0
    };

    // Build WhatsApp message
    var message = '*VIP Plan Inquiry* 🎯\n\n';
    message += '*Plan:* ' + plan.name + '\n';
    message += '*Duration:* ' + plan.duration + '\n';
    message += '*Amount:* ₹' + plan.amount.toLocaleString('en-IN') + '\n\n';
    message += 'Hi Jiga Bhai, I want to subscribe to the *' + plan.name + '* plan. Please share payment details and Telegram group link. 🙏';

    // Build WhatsApp URL
    var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

    // Show brief loading state
    var btn = document.querySelector('[data-plan-id="' + planId + '"]');
    if (btn) {
        var originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');

    // Show success notification
    showNotification('Redirecting to WhatsApp...', 'info');
}

// Notification helper (same as before)
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
    }, 3000);
}

// Razorpay loader stub (kept for backward compatibility)
function loadRazorpay(callback) {
    if (typeof callback === 'function') callback();
    return;
}

// Expose to window
window.initiatePayment = initiatePayment;
window.showNotification = showNotification;
