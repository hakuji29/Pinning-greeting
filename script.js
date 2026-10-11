// 1. Create Floating Stargazer Lily Petals
function createPetals() {
  const container = document.getElementById('petalsContainer');
  const petalCount = 18;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    const size = Math.random() * 15 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.6}px`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.animationDuration = `${Math.random() * 5 + 6}s`;

    container.appendChild(petal);
  }
}
createPetals();

// 2. Initialize Scratch Canvas properly proportioned
function initScratch() {
  const canvas = document.getElementById('scratchCanvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('scratchContainer');

  // Exact bounding box dimensions
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width || container.offsetWidth || 340;
  canvas.height = rect.height || container.offsetHeight || 75;

  // Solid Scratch Cover
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text on top of scratch overlay
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ SCRATCH HERE ✨', canvas.width / 2, canvas.height / 2 + 5);

  let isScratching = false;

  function getPos(e) {
    const canvasRect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - canvasRect.left,
        y: e.touches[0].clientY - canvasRect.top
      };
    }
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top
    };
  }

  function scratch(e) {
    if (!isScratching) return;
    e.preventDefault();

    const pos = getPos(e);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  function startScratch(e) {
    isScratching = true;
    scratch(e);
  }

  function stopScratch() {
    isScratching = false;
  }

  // Mouse Listeners
  canvas.addEventListener('mousedown', startScratch);
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', stopScratch);

  // Touch Listeners (Mobile Phones)
  canvas.addEventListener('touchstart', startScratch);
  canvas.addEventListener('touchmove', scratch);
  window.addEventListener('touchend', stopScratch);
}

// 3. Envelope Click Handler
const envelopeWrapper = document.getElementById('envelopeWrapper');
let isOpen = false;

envelopeWrapper.addEventListener('click', function() {
  if (!isOpen) {
    isOpen = true;
    envelopeWrapper.classList.add('open');
    // Initialize scratch coating after card has fully slid open
    setTimeout(initScratch, 500); 
  }
});