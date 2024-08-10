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
  const userPreferenceHoverColor = document.body.getAttribute('data-reaction-hover') || 'rgba(128, 128, 128, 0.111)';
  rippleElements.forEach(el => {

    const initialBgColor = window.getComputedStyle(el).backgroundColor;
    el.style.transition = 'background 0.2s ease-in-out';
    el.style.overflow = 'hidden';
    el.style.position = 'relative';
    el.style.display = 'inline-block';

    // mouse
    el.addEventListener('mouseover', () => {
      el.style.backgroundColor = userPreferenceHoverColor;
    });
    el.addEventListener('mouseleave', () => {
      el.style.backgroundColor = initialBgColor;
    });
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
  const userPreferenceHoverColor = document.body.getAttribute('data-reaction-hover') || 'rgba(128, 128, 128, 0.111)';
  const downScale = document.body.getAttribute('data-reaction-startPush') || '0.9';
  const upScale = document.body.getAttribute('data-reaction-endPush') || '1';
  const startScale = `scale(${downScale})`;
  const endScale = `scale(${upScale})`;

  pushedElements.forEach(el => {
    const initialBgColor = window.getComputedStyle(el).backgroundColor;
    el.style.willChange = 'transform';
    el.style.transition = 'transform .1s ease-in-out';

    const presStart = () => {
      el.style.transform = startScale;
    };
    const presEnd = () => {
      el.style.transform = endScale;
    };

    // mouse
    el.addEventListener('mousedown', presStart);
    el.addEventListener('mouseup', presEnd)
    el.addEventListener('mouseover', () => {
      el.style.backgroundColor = userPreferenceHoverColor;
    });
    el.addEventListener('mouseleave', () => {
      el.style.backgroundColor = initialBgColor;
    });

    // touch
    el.addEventListener('touchstart', () => {
      presStart();
      setTimeout(() => {
        presEnd();
      }, 200);
    });

  });
}


// bg change
const coloredElements = document.querySelectorAll('.color-reaction-effect');
if (coloredElements.length !== 0) {
  const userPreferenceBgColor = document.body.getAttribute('data-reaction-bg-color') || 'rgba(128, 128, 128, 0.533)';
  const userPreferenceHoverColor = document.body.getAttribute('data-reaction-hover') || 'rgba(128, 128, 128, 0.111)';
  
  coloredElements.forEach(el => {
    const initialBgColor = window.getComputedStyle(el).backgroundColor;
    let isMouseDown = false;
    let isMouseOver = false;

    el.style.transition = 'background 0.2s ease-in-out';

    const initBg = () => {
      if (!isMouseDown) {
        el.style.backgroundColor = initialBgColor;
      }
    };

    el.addEventListener('mouseover', () => {
      isMouseOver = true;
      if (!isMouseDown) {
        el.style.backgroundColor = userPreferenceHoverColor;
      }
    });

    el.addEventListener('mouseleave', () => {
      isMouseOver = false;
      initBg();
    });

    el.addEventListener('mousedown', () => {
      isMouseDown = true;
      el.style.backgroundColor = userPreferenceBgColor;
    });

    el.addEventListener('mouseup', () => {
      setTimeout(() => {
        isMouseDown = false;
        if (!isMouseOver) {
          initBg();
        } else {
          el.style.backgroundColor = userPreferenceHoverColor;
        }
      }, 150);
    });
  });
}

