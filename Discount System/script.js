const cart = [
  { name: "Wireless Headphones", price: 99.99, quantity: 1 },
  { name: "Smart Watch", price: 199.99, quantity: 1 },
  { name: "Laptop Stand", price: 49.99, quantity: 1 },
];
const cartItemsContainer=document.querySelector("#cart-item");
const cartTotal=document.querySelector("#cart-total");
const finalTotal=document.querySelector("#final-total");
const msg=document.querySelector("#coupon-msg");

let total=cart.reduce((acc,item)=>acc+item.price,0);
 let discount=0;
 function renderCart(){
    cartItemsContainer.innerHTML = '';
    cart.forEach(item=>{
        const div=document.createElement("div");
        div.className = "flex justify-between items-center bg-gray-50 p-3 rounded-md";
        div.innerHTML = `
            <div class="flex-1">
                <h4 class="font-medium text-gray-800">${item.name}</h4>
                <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
            </div>
            <span class="font-semibold text-gray-800">$${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(div);
    });
    cartTotal.textContent=`$${total.toFixed(2)}`;
    updateFinalTotal();
 }
 renderCart();

 const validCoupons = {
  BHARAT10: 10, // 10% off
  SAVE20: 20,   // 20% off
  SUPER50: 50   // 50% off
};

document.getElementById("apply-coupon").addEventListener("click",()=>{
    const code=document.getElementById("coupon-input").value.trim().toUpperCase();
    if(validCoupons[code]){
        discount=validCoupons[code];
        msg.textContent=`🎉 Coupon applied! You saved ${discount}% off your order.`;
        msg.className = "text-green-600 font-medium";
    }else if (code===""){
        msg.textContent="Please enter a coupon code.";
        msg.className = "text-red-600 font-medium";
        discount=0;
    }else{
        msg.textContent="Invalid coupon code. Please try again.";
        msg.className = "text-red-600 font-medium";
        discount=0;
    }

    updateFinalTotal();
});

function updateFinalTotal(){
    const discountAmount = total * (discount / 100);
    const discountedAmount = total - discountAmount;
    finalTotal.textContent = `$${discountedAmount.toFixed(2)}`;
    if(discount > 0){
        finalTotal.innerHTML += ` <span class="text-sm text-green-600 font-normal">(Saved $${discountAmount.toFixed(2)})</span>`;
    }
}
