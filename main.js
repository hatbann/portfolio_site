'use strict';

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
});

//navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
})

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

//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    console.log(filter);
    if(filter == null)
    {
        return;
    }

    //Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project) => {
            if(filter === '*' || project.dataset.type.includes(filter)){
                project.classList.remove('invisible');
            }
            else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    } ,300);
});

//1.모든 섹션 요소들을 가지고 온다
//2. intersection observer를 이용해 모든 섹션 관찰
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = ['#Home', '#About', '#Skills', '#Works', '#Contact'];
const sections = sectionIds.map(id=>document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavItem = navItems[0];
let selectedNavIndex = 0;
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}
const observerOptions = {
    root:null,
    rootMargin: '0px',
    threshold : 0.3
}

const observerCallback = (entries,observer)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting && entry.intersectionRatio>0){ //빠져나갈때
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //스크롤을 아래로해서 해당 페이지가 위로 올라갈 때
            if(entry.boundingClientRect.y<0){
                selectedNavIndex = index + 1;
            }
            else{
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=>{
    if(window.scrollY === 0)
    {
        selectedNavIndex = 0;
    }
    else if(window.scrollY + window.innerHeight === document.body.clientHeight) //제일밑도달
    {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})