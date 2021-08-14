/*
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


//Define Global Variables

const sections = Array.from(document.getElementsByTagName('section'));
const navigationBar = document.getElementById("navbar__list");

 // Start Helper Functions


/*
 * End Helper Functions
 * Begin Main Functions
*/

// build the nav  

const generateNav = ()=> {
        for(section of sections){
            let sectionList = document.createElement("li");
            let sectionID = section.getAttribute("id");
            let sectionName = section.getAttribute("data-nav");
            sectionList.innerHTML = `<a class="menu__link" href='#${sectionID}'>${sectionName}</a>`;
            navigationBar.appendChild(sectionList); 
// Scroll to anchor ID using scrollTO event
            sectionList.addEventListener('click', event => {
                event.preventDefault();
                section.scrollIntoView({
                  behavior:"smooth",
                  block: "start"
                });
              });

          };
        };
        
    
// Add class 'active' to section when near top of viewport

const activeView = ()=> {
    for (let viewPoint of sections){
        
        let view = viewPoint.getBoundingClientRect();
        if (view.top <= 150 && view.bottom >= 150) {
            viewPoint.classList.add('your-active-class');
        } else {
            viewPoint.classList.remove('your-active-class');
        
        };
    };
};

window.addEventListener("scroll", activeView);


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

generateNav(); 

// Scroll to section on link click

// Set sections as active

activeView();