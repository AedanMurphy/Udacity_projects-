
//Define Global Variables

const sections = Array.from(document.getElementsByTagName('section'));
const navigationBar = document.getElementById('navbar__list');

 // Start Helper Functions


/*
 * End Helper Functions
 * Begin Main Functions
*/

// build the nav  
const generateNav = ()=> {
    for(section of sections){
        let sectionList = document.createElement('li');
        let sectionID = section.getAttribute('id');
        let sectionName = section.getAttribute('data-nav');
        sectionList.innerHTML = `<a class="menu__link" href='#${sectionID}'>${sectionName}</a>`;
        navigationBar.appendChild(sectionList); 
            // Scroll to anchor ID using scrollTO event
        sectionList.addEventListener('click', event => {
            event.preventDefault();
            document.getElementById(sectionID).scrollIntoView({
                behavior:'smooth',
                block: 'start'
            });
        });
    };
};
        
// Add class 'active' to section when near top of viewport

const activeView = ()=> {
    for (let viewPoint of sections){
        let navLi = document.querySelector(`a[href='#${viewPoint.id}']`);
        let view = viewPoint.getBoundingClientRect();
        if (view.top <= 150 && view.bottom >= 150) {
            viewPoint.classList.add('your-active-class');
            navLi.classList.add('active');
        } else {
            viewPoint.classList.remove('your-active-class');
            navLi.classList.remove('active');
        };
    };
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

generateNav(); 

// Scroll to section on link click

window.addEventListener('scroll', activeView);

// Set sections as active

activeView();