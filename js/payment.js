// WhatsApp handoff for plan inquiries. No card data is collected on this site.
var WHATSAPP_NUMBER = '918306819219';

var PLAN_DETAILS = {
    basic: { name: 'Basic Strike', duration: '30 days', amount: 8000 },
    pro: { name: 'Pro Hunter', duration: '3 months', amount: 15000 },
    'pro-discount': { name: 'Pro Hunter (30% off)', duration: '3 months', amount: 10500 },
    premium: { name: 'Elite Sniper', duration: '1 year', amount: 28000 },
    ultimate: { name: 'Inner Circle', duration: 'Lifetime', amount: 50000 }
};

function planMessage(plan, lang) {
    var amount = '₹' + plan.amount.toLocaleString('en-IN');
    if (lang === 'gu') {
        return '*VIP પ્લાન પૂછપરછ*\n\n' +
            '*પ્લાન:* ' + plan.name + '\n' +
            '*અવધિ:* ' + plan.duration + '\n' +
            '*રકમ:* ' + amount + '\n\n' +
            'નમસ્તે Jiga Bhai, હું *' + plan.name + '* પ્લાન લેવા માંગું છું. કૃપા કરીને પેમેન્ટ વિગત અને Telegram ગ્રુપ લિંક મોકલો.';
    }
    if (lang === 'hi') {
        return '*VIP प्लान पूछताछ*\n\n' +
            '*प्लान:* ' + plan.name + '\n' +
            '*अवधि:* ' + plan.duration + '\n' +
            '*राशि:* ' + amount + '\n\n' +
            'नमस्ते Jiga Bhai, मैं *' + plan.name + '* प्लान लेना चाहता/चाहती हूँ। कृपया पेमेंट डिटेल और Telegram ग्रुप लिंक भेजें।';
    }
    return '*VIP Plan Inquiry*\n\n' +
        '*Plan:* ' + plan.name + '\n' +
        '*Duration:* ' + plan.duration + '\n' +
        '*Amount:* ' + amount + '\n\n' +
        'Hi Jiga Bhai, I want the *' + plan.name + '* plan. Please share payment details and the Telegram group link.';
}

function initiatePayment(planId, planName, planAmount) {
    var plan = PLAN_DETAILS[planId] || {
        name: planName || 'Unknown Plan',
        duration: 'see website',
        amount: planAmount ? Math.floor(planAmount / 100) : 0
    };
    var lang = document.documentElement.getAttribute('data-lang') || 'en';
    var message = planMessage(plan, lang);
    var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

    var btn = document.querySelector('[data-plan-id="' + planId + '"]');
    if (btn) {
        var originalText = btn.innerHTML;
        var opening = (window.JB_I18N && window.JB_I18N.t('wa.opening', lang)) || 'Opening WhatsApp...';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + opening;
        btn.disabled = true;
        setTimeout(function () {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }

    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    var notice = (window.JB_I18N && window.JB_I18N.t('wa.notice', lang)) || 'Opening WhatsApp...';
    showNotification(notice, 'info');
}

function showNotification(message, type) {
    type = type || 'info';
    var n = document.createElement('div');
    n.setAttribute('role', 'status');
    var borderColor = type === 'error' ? '#ff3b5c' : '#00ff9d';
    var shadowColor = type === 'error' ? 'rgba(255, 59, 92, 0.3)' : 'rgba(0, 255, 157, 0.3)';
    var iconClass = type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check';
    var iconColor = type === 'error' ? '#ff3b5c' : '#00ff9d';

    n.style.cssText = 'position:fixed;top:100px;right:24px;background:rgba(10,14,26,0.95);backdrop-filter:blur(20px);border:1.5px solid ' + borderColor + ';border-radius:16px;padding:16px 24px;z-index:999;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px ' + shadowColor + ';max-width:360px;transition:all 0.5s;';
    n.innerHTML = '<i class="fas ' + iconClass + '" style="color:' + iconColor + ';font-size:1.4rem;"></i><div style="color:#fff;font-weight:600;"></div>';
    n.querySelector('div').textContent = message;
    document.body.appendChild(n);
    setTimeout(function () {
        n.style.opacity = '0';
        n.style.transform = 'translateX(120%)';
        setTimeout(function () { n.remove(); }, 500);
    }, 3000);
}

window.initiatePayment = initiatePayment;
window.showNotification = showNotification;
