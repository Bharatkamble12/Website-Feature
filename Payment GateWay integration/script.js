const cart = [
  {name:"Wireless Headphones", price:99.99, quantity:1},
  {name:"Smart Watch", price:199.99, quantity:1},
  {name:"Laptop Stand", price:49.99, quantity:1}
];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const finalTotal = document.getElementById("final-total");
const msg = document.getElementById("coupon-msg");

let total = cart.reduce((sum,item)=>sum+item.price,0);
let discount = 0;

function renderCart(){
  cartItemsContainer.innerHTML = "";
  cart.forEach(item=>{
    const div=document.createElement("div");
    div.className = "flex justify-between items-center bg-gray-50 p-4 rounded-lg";
    div.innerHTML = `
      <div class="flex-1">
        <h4 class="font-medium text-gray-800">${item.name}</h4>
        <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
      </div>
      <span class="font-semibold text-gray-800">$${item.price.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartTotal.textContent = `$${total.toFixed(2)}`;
  updateFinalTotal();
}
renderCart();

// ======= COUPON =======
const validCoupons = { BHARAT10:10, SAVE20:20, SUPER50:50 };
document.getElementById("apply-coupon").addEventListener("click",()=>{
  const selectElement = document.getElementById("coupon-select");
  const selectedOptions = Array.from(selectElement.selectedOptions);
  const codes = selectedOptions.map(option => option.value);

  let totalDiscount = 0;
  let appliedCoupons = [];

  codes.forEach(code => {
    if(validCoupons[code]){
      totalDiscount += validCoupons[code];
      appliedCoupons.push(code);
    }
  });

  discount = totalDiscount;

  if(appliedCoupons.length > 0){
    msg.textContent=`🎉 ${appliedCoupons.length} coupon(s) applied! You saved ${totalDiscount}% off your order.`;
    msg.className = "text-green-600 font-medium";
  } else if(codes.length === 0){
    msg.textContent="Please select coupon codes.";
    msg.className = "text-yellow-600 font-medium";
    discount=0;
  } else {
    msg.textContent="No valid coupons selected.";
    msg.className = "text-red-600 font-medium";
    discount=0;
  }
  updateFinalTotal();
});

function updateFinalTotal(){
  const discountAmount = total * (discount / 100);
  const discounted = total - discountAmount;
  finalTotal.textContent = `$${discounted.toFixed(2)}`;
  if(discount > 0){
    finalTotal.innerHTML += ` <span class="text-sm text-green-600 font-normal">(Saved $${discountAmount.toFixed(2)})</span>`;
  }
}
const payBtn=document.getElementById("pay-btn");
const method=document.getElementById("payment-method");
payBtn.addEventListener("click",()=>{
    const selected=method.value;
    if(!selected) return alert("Please select a payment method.");
    const amountToPay=finalTotal.textContent;
    alert(`Proceeding to pay ₹${amountToPay} via ${selected}.`);
    setTimeout(()=>{
        if(Math.random()<0.9){
            alert("Payment Successful! Thank you for your purchase.");
        }else{
            alert("Payment Failed! Please try again.");
        }
    },1500);
})