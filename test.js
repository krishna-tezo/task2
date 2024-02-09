const ellipsis=document.querySelectorAll('.ellipsis');
ellipsis.forEach((elp)=>{
    elp.addEventListener('click',showEllipsisMenu)
})
function showEllipsisMenu(){
    this.children[1].classList.toggle("active");
}