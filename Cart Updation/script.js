const cartItemsContainer =document.getElementById("cart-items");
const cartCount=document.getElementById("cart-count");
const cartTotal=document.getElementById("cart-total");

let cart=[];


document.querySelectorAll(".add-btn").forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const product=e.target.closest(".product");
        const id=product.dataset.id;
        const name=product.dataset.name;
        const price=parseFloat(product.dataset.price);

        const existing=cart.find((item)=>item.id===id);

        if(!existing){
            cart.push({id,name,price});
            e.target.textContent="Added ✅";
            e.target.disabled=true;
        }
        updateCartUi();
    });
});

function removeFromCart(id){
    cart=cart.filter((item)=>item.id!==id);

    const productBtn=document.querySelector(`.product[data-id="${id}"] .add-btn`);
    if(productBtn){
        productBtn.textContent="Add to Cart";
        productBtn.disabled=false;
    }
    updateCartUi();
}
function updateCartUi(){
    cartItemsContainer.innerHTML="";
    cart.forEach((item)=>{
        const div=document.createElement("div");
        div.classList.add("cart-item", "flex", "justify-between", "items-center", "bg-gray-100", "p-3", "rounded-lg");
        div.innerHTML=  `<span class="font-medium">${item.name} - ₹${item.price}   </span>
        <button onclick="removeFromCart('${item.id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Remove</button>`;
        cartItemsContainer.appendChild(div);
    });
    cartCount.textContent=cart.length;
    cartTotal.textContent=cart.reduce((sum,item)=>sum+item.price,0).toFixed(2);
}
