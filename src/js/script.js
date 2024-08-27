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
