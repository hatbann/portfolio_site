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

//show arrow-up btn when scrolling down
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    }
    else{
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the "arrow up" button
arrowUp.addEventListener('click', ()=>{
    scrollIntoView('#Home');
})