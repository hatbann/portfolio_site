'use strict';

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    scrollIntoView(link);
});

//Handle Contactme Btn scrolling
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', () =>{
    scrollIntoView('#Contact');
})

//Transparent Home when scrolling
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll' , ()=>
{
    home.style.opacity = 1-window.scrollY/ homeHeight;

})


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
}


