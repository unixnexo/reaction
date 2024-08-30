function reaction() {

  // ripple
  function createRipple(el, X, Y) {
    const circle = document.createElement("span");
    const diameter = Math.max(el.clientWidth, el.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
  
    const rect = el.getBoundingClientRect();
    const offsetX = X - rect.left;
    const offsetY = Y - rect.top;
  
    circle.style.left = `${offsetX - radius}px`;
    circle.style.top = `${offsetY - radius}px`;
  
    circle.classList.add("ripple");
  
    circle.style.backgroundColor = document.body.getAttribute('data-reaction-color');
    circle.style.animationDuration = document.body.getAttribute('data-reaction-duration');
  
    el.appendChild(circle);
  
    circle.addEventListener('animationend', () => {
      circle.remove();
    }, { once: true });
  }
  
  const rippleElements = document.querySelectorAll('.ripple-reaction-effect');
  if (rippleElements.length !== 0) {
    rippleElements.forEach(el => {
  
      el.style.transition = 'background 0.2s ease-in-out';
      el.style.overflow = 'clip';
      el.style.position = 'relative';
      el.style.display = 'inline-grid';
      el.style.boxSizing = 'border-box';
  
  
      if ("ontouchstart" in document.documentElement) {
        // touch
        el.addEventListener('touchstart', (e) => {
          // Prevent multiple touches from creating multiple ripples
          if (el.querySelector('.ripple')) return;
          createRipple(el, e.touches[0].clientX, e.touches[0].clientY);
        });  
      } else {
        // mouse
        el.addEventListener('click', (e) => {
          createRipple(el, e.clientX, e.clientY);
        });
      }
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
      el.style.transition = 'transform .1s ease-in-out, background .2s ease-in-out';
  
      const presStart = () => {
        el.style.transform = startScale;
      };
      const presEnd = () => {
        el.style.transform = endScale;
      };
  
      // mouse
      el.addEventListener('mousedown', presStart);
      el.addEventListener('mouseup', presEnd)
  
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
  let mouseOver = false;
  const coloredElements = document.querySelectorAll('.color-reaction-effect');
  if (coloredElements.length !== 0) {
    const userPreferenceBgColor = document.body.getAttribute('data-reaction-bg-color') || 'rgba(128, 128, 128, 0.533)';
    const userPreferenceHoverColor = document.body.getAttribute('data-reaction-hover') || 'rgba(128, 128, 128, 0.111)';
    
    coloredElements.forEach(el => {
      const initialBgColor = window.getComputedStyle(el).backgroundColor;
      el.style.transition = 'background 0.2s ease-in-out';
  
      el.addEventListener('mousedown', () => {
        el.style.backgroundColor = userPreferenceBgColor;
      });
  
      el.addEventListener('mouseup', () => {
        setTimeout(() => {
          if (!mouseOver) {
            el.style.backgroundColor = initialBgColor;
          } else {
            el.style.backgroundColor = userPreferenceHoverColor;
          }
        }, 150);
        
      });
    });
  }
  
  
  // enable hover effect - only supported devices
  if (document.body.hasAttribute('enable-hover-reaction') && window.matchMedia('(hover: hover)').matches) {
    function hoverEffect(el) {
      const userPreferenceHoverColor = document.body.getAttribute('data-reaction-hover') || 'rgba(128, 128, 128, 0.111)';
      const initialBgColor = window.getComputedStyle(el).backgroundColor;
  
      el.addEventListener('mouseover', () => {
        el.style.backgroundColor = userPreferenceHoverColor;
        mouseOver = true;
      });
      el.addEventListener('mouseleave', () => {
        el.style.backgroundColor = initialBgColor;
        mouseOver = false;
      });
    }
  
    rippleElements.forEach(el => {
      hoverEffect(el);
    });
    pushedElements.forEach(el => {
      hoverEffect(el);
    });
    coloredElements.forEach(el => {
      hoverEffect(el);
    });
  
  }

}
reaction();


