// AURA Foods - Micro-interactions

function addToCart(productName) {
  showToast(`Added ${productName} to your reserve bag.`);
}

function handleSubscribe(e) {
  e.preventDefault();
  const input = document.getElementById('emailInput');
  const msg = document.getElementById('formMsg');
  
  if (input && input.value) {
    msg.textContent = `Thank you! An invitation has been sent to ${input.value}.`;
    input.value = '';
    setTimeout(() => {
      msg.textContent = '';
    }, 5000);
  }
}

// Minimal Toast notification
function showToast(message) {
  let toast = document.getElementById('aura-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'aura-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.background = 'rgba(255, 255, 255, 0.95)';
    toast.style.color = '#000000';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '980px';
    toast.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
    toast.style.fontSize = '0.875rem';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '10000';
    toast.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.backdropFilter = 'blur(10px)';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3000);
}

// Fade in elements on scroll
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.bento-card, .stat-item, .standards-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});
