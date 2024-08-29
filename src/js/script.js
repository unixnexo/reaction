/**
 * section state
 */
const main = document.getElementById('main');
const home = document.getElementById('home');
const demo = document.getElementById('demo');
const use = document.getElementById('use');

function router() {
  // remove all sections
  function removeSections() {
    document.querySelectorAll('.section').forEach(sec => {
      sec.remove();
    });
  }

  // check which section should be up
  if (window.location.href.endsWith('?home') || window.location.href.endsWith('?home/')) {
    removeSections();
    main.insertBefore(home, main.firstChild);
  } else if (window.location.href.endsWith('?demo') || window.location.href.endsWith('?demo/')) {
    removeSections();
    main.insertBefore(demo, main.firstChild);
    document.querySelector(`#demo`).classList.remove('hidden');
  } else if (window.location.href.endsWith('?use') || window.location.href.endsWith('?use/')) {
    removeSections();
    main.insertBefore(use, main.firstChild);
    document.querySelector(`#use`).classList.remove('hidden');
  }
}
window.addEventListener('load', () => router());

// change state to show specific section
const navBtns = document.querySelectorAll('#nav button');
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const newUrl = `${window.location.pathname}?${btn.textContent}/`;
    window.history.pushState({}, '', newUrl);
    router();

    document.querySelector(`#${btn.textContent}`).classList.remove('hidden');
  });
});


/**
 * create demo btns specific to effect
 */
function createDemoBtns(effectCls) {
  const htmlContent = `
    <div class="*:p-3 *:inline-block *:select-none *:touch-none">
      <button class="${effectCls} bg-black text-white rounded-lg">I'm a btn</button>
      <a href="" onclick="return false;" class="${effectCls} bg-purple-600">I'm a link</a>
      <div class="${effectCls} border border-blue-600 rounded-full">I'm a div</div>
    </div>
  `;

  const demoBtnsWrapper = document.getElementById('demo-btns-wrapper');
  demoBtnsWrapper.innerHTML = htmlContent;
}
createDemoBtns('nothing');

// show associated demo btns based on effect selected
document.querySelector('#select-effect-form').addEventListener('change', () => {
  const selectedOption = document.querySelector('#select-effect-form select').value;
  createDemoBtns(`${selectedOption}-reaction-effect`);
  reaction();
});







///////// test 





