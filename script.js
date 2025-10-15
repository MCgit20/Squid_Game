const menu_toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menu_toggle.onclick = function(){
    menu_toggle.classList.toggle('active');
    menu.classList.toggle('responsive');
}