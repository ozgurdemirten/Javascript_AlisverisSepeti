//! variables
const cartBtn=document.querySelector(".cart-btn");
const clearCartBtn=document.querySelector(".cart-clear");
const cartItems=document.querySelector(".cart-items");
const cartTotal=document.querySelector(".total-value");
const cartContent=document.querySelector(".cart-list");
const productsDOM=document.querySelector("#products-dom");


let buttonsDOM=[];
let cart=[];
class Products{
    async getProducts()
{
    try {
        let result=await fetch("https://64844b49ee799e3216267d03.mockapi.io/products");
        let data=await result.json();
        let products=data;
        return products;
    } catch (error) {
        console.log(error);
    }

}

}

class UI{
    displayProducts(products){
       // console.log(products);
        let result="";
        products.forEach(item => {
            result+=` <div class="col-lg-4 col-md-6">
            <div class="product">
                <div class="product-image">
                    <img src="${item.image}" alt="product">
                </div>
                <div class="product-hover">
                    <span class="product-title">${item.title}</span>
                    <span class="product-price">TL${item.price}</span>
                    <button class="btn-add-to-cart" data-id=${item.id}>
                        <i class="fas fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
        </div> `
        });
        productsDOM.innerHTML=result;
    }
    getBagButtons(){
        const buttons=[...document.querySelectorAll(".btn-add-to-cart")];
        buttonsDOM=buttons;
        buttons.forEach(button=>{
            let id =button.dataset.id;
            let inCart=cart.find(item=>item.id===id);
            if(inCart){
                button.setAttribute("disabled","disabled");
                button.opacity=".3";
            }
            else{
                button.addEventListener("click",event=>{
                    event.target.disabled=true;
                    event.target.style.opacity=".3";
                    //* get product from products
                    let cartItem={...Storage.getProduct(id),amount:1};
                    //* add product to the cart
                    cart = [...cart, cartItem];
                    //*sae cart in local storage
                    Storage.saveCart(cart);
                    //* save cart values
                    this.saveCartValues(cart);
                    //* display cart item
                    this.addCardItem(cartItem);
                })
            }
        })
    }
    saveCartValues(cart){
        let tempTotal=0;
        let itemsTotal=0;
        cart.map(item=>{
            tempTotal+= item.price*item.amount;
            itemsTotal+=item.amount;
        });
        console.log(cartTotal);
        cartTotal.innerText=parseFloat(tempTotal.toFixed(2));
        cartItems.innerText=itemsTotal;
    }
    addCardItem(item){
        const li =document.createElement("li");
        li.classList.add("cart-list-item");
        li.innerHTML=`
        
        `
    }
}

class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProduct(id){
        let products=JSON.parse(localStorage.getItem("products"));
         return products.find(product=>product.id===id);

    }
    static saveCart(cart){
        localStorage.setItem("cart",JSON.stringify(cart));
    }


}
document.addEventListener("DOMContentLoaded",()=>{
    const ui=new UI();
    const products=new Products();
    products.getProducts().then(products=>{
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(()=>{
        ui.getBagButtons();
    })
});