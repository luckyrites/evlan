// ==========================================================================
// EVLAN Bar Pro — Apple Micro-Interactions & Experience Logic
// ==========================================================================

const FINISHES = {
  obsidian: {
    name: 'Obsidian Cocoa',
    title: 'OBSIDIAN COCOA',
    sub: '72% Dark Cacao Truffle • 21g Protein',
    notes: 'Single-origin 72% dark cacao with sea salt crystals and cold-whipped isolate.'
  },
  titanium: {
    name: 'Natural Titanium Caramel',
    title: 'TITANIUM CARAMEL',
    sub: 'Gourmet Salted Caramel & Almond • 21g Protein',
    notes: 'Slow-caramelized organic lucuma fruit, roasted almonds, and Madagascar vanilla.'
  },
  glacial: {
    name: 'Glacial Alpine Vanilla',
    title: 'GLACIAL VANILLA',
    sub: 'Bourbon Vanilla Bean & White Cacao • 21g Protein',
    notes: 'Cold-milled organic cashew butter with double-fold Bourbon vanilla bean.'
  },
  berry: {
    name: 'Cosmic Berry Acai',
    title: 'COSMIC BERRY',
    sub: 'Wild Bilberry & Amazonian Acai • 20g Protein',
    notes: 'Freeze-dried Scandinavian bilberries and raw organic chia seed crunch.'
  },
  matcha: {
    name: 'Ceremonial Kyoto Matcha',
    title: 'KYOTO MATCHA',
    sub: 'Stone-Ground Uji Matcha & Pistachio • 21g Protein',
    notes: 'First-harvest Tencha green tea leaves with roasted Sicilian pistachio nibs.'
  }
};

let currentFinish = 'obsidian';

// Active Customizer State
let configState = {
  flavor: 'Obsidian Dark Cocoa',
  count: 12,
  basePrice: 38,
  isSubscription: false
};

// Bag State
let bag = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  init3DParallax();
  initSubNavScrollSpy();
  loadBagFromStorage();
});

// Switch Finishes (Apple Watch / iPhone style)
function setFinish(finishKey) {
  if (!FINISHES[finishKey]) return;
  currentFinish = finishKey;
  const config = FINISHES[finishKey];

  document.body.dataset.finish = finishKey;

  // Update DOM labels
  const nameEl = document.getElementById('finishName');
  const titleEl = document.getElementById('wrapperTitle');
  const subEl = document.getElementById('wrapperSub');
  const notesEl = document.getElementById('finishNotes');

  if (nameEl) nameEl.textContent = config.name;
  if (titleEl) titleEl.textContent = config.title;
  if (subEl) subEl.textContent = config.sub;
  if (notesEl) notesEl.textContent = config.notes;

  // Update active swatch button
  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.finish === finishKey);
  });

  // Micro vibration/bounce on mockup
  const mockup = document.getElementById('barMockup');
  if (mockup) {
    mockup.style.transform = 'scale(0.97)';
    setTimeout(() => {
      mockup.style.transform = '';
    }, 180);
  }
}

// 3D Mouse Parallax on Bar Stage
function init3DParallax() {
  const stage = document.getElementById('barStage');
  const bar = document.getElementById('barMockup');
  if (!stage || !bar) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 18;
    const rotY = (x / rect.width) * 22;

    bar.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  stage.addEventListener('mouseleave', () => {
    bar.style.transform = '';
  });
}

// Sub-nav ScrollSpy
function initSubNavScrollSpy() {
  const links = document.querySelectorAll('.sub-nav-links .sub-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Shopping Bag Logic
function openBag() {
  document.getElementById('bagBackdrop')?.classList.add('active');
  document.getElementById('bagDrawer')?.classList.add('active');
}

function closeBag() {
  document.getElementById('bagBackdrop')?.classList.remove('active');
  document.getElementById('bagDrawer')?.classList.remove('active');
}

function quickAdd(flavorName, price) {
  addToBag({
    flavor: flavorName,
    count: 12,
    price: price,
    isSub: false
  });
}

function addToBag(item) {
  bag.push(item);
  saveBagToStorage();
  updateBagUI();
  openBag();
  showToast(`Added ${item.flavor} (${item.count} Bars) to your bag.`);
}

function updateBagUI() {
  const bagCountEl = document.getElementById('bagCount');
  const drawerBagCountEl = document.getElementById('drawerBagCount');
  const bagItemsEl = document.getElementById('bagItems');
  const drawerSubtotalEl = document.getElementById('drawerSubtotal');

  const totalCount = bag.length;
  if (bagCountEl) bagCountEl.textContent = totalCount;
  if (drawerBagCountEl) drawerBagCountEl.textContent = totalCount;

  if (!bagItemsEl) return;

  if (bag.length === 0) {
    bagItemsEl.innerHTML = '<div class="empty-bag-msg">Your bag is empty. Choose your flavor above.</div>';
    if (drawerSubtotalEl) drawerSubtotalEl.textContent = '$0.00';
    return;
  }

  let subtotal = 0;
  bagItemsEl.innerHTML = bag.map((item, index) => {
    subtotal += item.price;
    return `
      <div class="bag-item-card">
        <div>
          <div class="bag-item-name">${item.flavor}</div>
          <div class="bag-item-desc">${item.count} Bars &bull; ${item.isSub ? 'Auto-ship (-15%)' : 'One-time'}</div>
          <button style="background:none;border:none;color:#ff453a;font-size:0.75rem;cursor:pointer;padding-top:4px;" onclick="removeItem(${index})">Remove</button>
        </div>
        <div class="bag-item-price">$${item.price.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  if (drawerSubtotalEl) drawerSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

function removeItem(index) {
  bag.splice(index, 1);
  saveBagToStorage();
  updateBagUI();
}

function saveBagToStorage() {
  try {
    sessionStorage.setItem('evlan_bag', JSON.stringify(bag));
  } catch (e) {}
}

function loadBagFromStorage() {
  try {
    const saved = sessionStorage.getItem('evlan_bag');
    if (saved) {
      bag = JSON.parse(saved);
      updateBagUI();
    }
  } catch (e) {}
}

function handleCheckout() {
  if (bag.length === 0) {
    showToast('Your bag is empty!');
    return;
  }
  showToast('Initiating Apple Pay secure checkout...');
  setTimeout(() => {
    alert('Thank you for choosing EVLAN Bar Pro! Pre-order confirmed. Confirmation email dispatched.');
    bag = [];
    saveBagToStorage();
    updateBagUI();
    closeBag();
  }, 1200);
}

// Nutrition Facts Modal
function openNutritionModal() {
  document.getElementById('nutritionModal')?.classList.add('active');
}

function closeNutritionModal(e) {
  if (!e || e.target.id === 'nutritionModal' || e.target.classList.contains('modal-close')) {
    document.getElementById('nutritionModal')?.classList.remove('active');
  }
}

// Buy Customizer Modal
function openBuyModal(initialFlavor) {
  if (initialFlavor === 'variety') {
    configState.flavor = 'Variety Pack (All 4 Flavors)';
  }
  updateModalConfigView();
  document.getElementById('buyModal')?.classList.add('active');
}

function closeBuyModal(e) {
  if (!e || e.target.id === 'buyModal' || e.target.classList.contains('modal-close')) {
    document.getElementById('buyModal')?.classList.remove('active');
  }
}

function selectModalFlavor(flavor, btn) {
  configState.flavor = flavor;
  document.querySelectorAll('#modalFlavorChips .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
}

function selectModalSize(count, price, el) {
  configState.count = count;
  configState.basePrice = price;
  document.querySelectorAll('.size-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  recalculateModalPrice();
}

function toggleSubscription(isSub) {
  configState.isSubscription = isSub;
  document.querySelectorAll('.radio-card').forEach(rc => rc.classList.remove('active'));
  const checked = document.querySelector('input[name="orderType"]:checked');
  if (checked) checked.closest('.radio-card').classList.add('active');
  recalculateModalPrice();
}

function recalculateModalPrice() {
  let finalPrice = configState.basePrice;
  if (configState.isSubscription) {
    finalPrice = finalPrice * 0.85; // 15% discount
  }
  const totalEl = document.getElementById('modalTotalPrice');
  if (totalEl) totalEl.textContent = `$${finalPrice.toFixed(2)}`;
}

function updateModalConfigView() {
  recalculateModalPrice();
}

function confirmModalAdd() {
  let finalPrice = configState.basePrice;
  if (configState.isSubscription) finalPrice = finalPrice * 0.85;

  addToBag({
    flavor: configState.flavor,
    count: configState.count,
    price: finalPrice,
    isSub: configState.isSubscription
  });

  closeBuyModal();
}

// Minimalist Toast Notification
function showToast(message) {
  let toast = document.getElementById('apple-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'apple-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.background = 'rgba(255, 255, 255, 0.95)';
    toast.style.color = '#000000';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '980px';
    toast.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.6)';
    toast.style.fontSize = '0.875rem';
    toast.style.fontWeight = '600';
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
  }, 3200);
}
