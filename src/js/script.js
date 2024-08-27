// const navBtns = document.querySelectorAll('#nav button');
// navBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         // hide all sections
//         const allSections = document.querySelectorAll('.section');
//         allSections.forEach(sec => {
//             sec.classList.add('hidden');
//         });
//         // show associated section
//         const section = document.querySelector(`#${btn.textContent}`);        
//         if (section !== null) {
//             section.classList.remove('hidden');
//         }
//     });
// });




///////// test 
document.querySelector('#select-effect-form').addEventListener('change', () => {
    const selectedOption = document.querySelector('#select-effect-form select').value;

    const demoBtns = document.querySelectorAll('#demo-btns-wrapper > *');

    demoBtns.forEach(btn => {

        // remove already existed effect
        btn.classList.forEach(clsName => {
            if (clsName.includes('-reaction-effect')) {
                btn.classList.remove(clsName);
            }
        });

        // add new effect
        btn.classList.add(`${selectedOption}-reaction-effect`);
    });

    reaction();
});



const navBtns = document.querySelectorAll('#nav button');
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // hide all sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(sec => {
            sec.classList.add('hidden');
        });
        // show associated section
        const section = document.querySelector(`#${btn.textContent}`);        
        if (section !== null) {
            section.classList.remove('hidden');
        }
    });
});



function router() {

  function removeSections(thisSec) {
    document.querySelectorAll('.section').forEach(sec => {
      if (sec.id !== thisSec) {
        sec.remove();
      }
    });
  }

  const home = document.getElementById('home');
  const demo = document.getElementById('demo');

  if (window.location.href.endsWith('?home') || window.location.href.endsWith('?home/') || window.location.href.endsWith('')) {
    removeSections('home');
    console.log('home');
  } else if (window.location.href.endsWith('?demo') || window.location.href.endsWith('?demo/')) {
    removeSections('demo');
    console.log('demo');
  }
}
window.addEventListener('load', () => router());
