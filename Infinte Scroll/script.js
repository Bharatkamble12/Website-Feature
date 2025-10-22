const grid=document.getElementById('grid');
const loadMoreBtn=document.getElementById('loadMore');
let items=0;
const perLoad=6; 


function loadItems(count){
    for(let i=0;i<count; i++){
        items++;
        const card=document.createElement('div');
        card.className='card';
        card.textContent="Item"+items;
        grid.appendChild(card);
    }

}
loadItems(perLoad);
loadMoreBtn.addEventListener('')