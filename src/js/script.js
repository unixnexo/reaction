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




///////// test 
document.querySelector('#select-effect-form').addEventListener('change', () => {
  const selectedOption = document.querySelector('#select-effect-form select').value;

  const demoBtns = document.querySelectorAll('#demo-btns-wrapper > *');

  demoBtns.forEach(btn => {
    // Reset the element (remove event listeners and inline styles)
    resetElement(btn);

    // Add new effect class
    btn.classList.add(`${selectedOption}-reaction-effect`);
  });

  // Reapply effects
  reaction();
});




