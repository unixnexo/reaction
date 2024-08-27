/**
 * section state
 */
const main = document.getElementById('main');
const home = document.getElementById('home');
const demo = document.getElementById('demo');

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
  });
});




///////// test 
// document.querySelector('#select-effect-form').addEventListener('change', () => {
//     const selectedOption = document.querySelector('#select-effect-form select').value;

//     const demoBtns = document.querySelectorAll('#demo-btns-wrapper > *');

//     demoBtns.forEach(btn => {

//         // remove already existed effect
//         btn.classList.forEach(clsName => {
//             if (clsName.includes('-reaction-effect')) {
//                 btn.classList.remove(clsName);
//             }
//         });

//         // add new effect
//         btn.classList.add(`${selectedOption}-reaction-effect`);
//     });

//     reaction();
// });





