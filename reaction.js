// ripple
function createRipple(el, X, Y) {
  const circle = document.createElement("span");
  const diameter = Math.max(el.clientWidth, el.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;

  const rect = el.getBoundingClientRect();
  const offsetX = X - rect.left;
  const offsetY = Y - rect.top;

  const style = window.getComputedStyle(el);
  const paddingLeft = parseFloat(style.paddingLeft);
  const paddingTop = parseFloat(style.paddingTop);

  circle.style.left = `${offsetX - radius - paddingLeft}px`;
  circle.style.top = `${offsetY - radius - paddingTop}px`;

  circle.classList.add("ripple");

  circle.style.backgroundColor = document.body.getAttribute('data-reaction-color');
  circle.style.animationDuration = document.body.getAttribute('data-reaction-duration');

  el.appendChild(circle);

  circle.addEventListener('animationend', () => {
    circle.remove();
  });
}

const rippleElements = document.querySelectorAll('.ripple-reaction-effect');
if (rippleElements.length !== 0) {
  rippleElements.forEach(el => {

    el.style.overflow = 'hidden';
    el.style.position = 'relative';
    el.style.display = 'inline-block';

    // mouse
    el.addEventListener('click', (e) => {
      createRipple(el, e.clientX, e.clientY);
    });

    // touch
    el.addEventListener('touchstart', (e) => {
      // Prevent multiple touches from creating multiple ripples
      if (el.querySelector('.ripple')) return;

      createRipple(el, e.touches[0].clientX, e.touches[0].clientY);
    });  

  });
}


// push
const pushedElements = document.querySelectorAll('.push-reaction-effect');
if (pushedElements.length !== 0) {
  const downScale = document.body.getAttribute('data-reaction-startPush') || '0.9';
  const upScale = document.body.getAttribute('data-reaction-endPush') || '1';
  const startScale = `scale(${downScale})`;
  const endScale = `scale(${upScale})`;

  pushedElements.forEach(el => {
    el.style.willChange = 'transform';
    el.style.transition = 'transform .1s ease-in-out';

    // mouse
    el.addEventListener('mousedown', () => {
      el.style.transform = startScale;
    });

    el.addEventListener('mouseup', () => {
      el.style.transform = endScale;
    });

    // touch
    el.addEventListener('touchstart', () => {
      el.style.transform = startScale;
      setTimeout(() => {
        el.style.transform = endScale;
      }, 200);
    });

  });
}


