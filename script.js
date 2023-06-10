//! variables
const cartBtn=document.querySelector(".cart-btn");
const clearCartBtn=document.querySelector(".cart-clear");
const cartItems=document.querySelector(".cart-items");
const cartTotal=document.querySelector(".cart-value");
const cartContent=document.querySelector(".cart-list");
const productsDOM=document.querySelector("#products-dom");


let buttonsDOM=[];
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
        console.log(products);
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
        console.log(result);
    }
    getBagButtons(){
        const buttons=[...document.querySelectorAll(".btn-add-to-cart")];
        buttonsDOM=buttons;
        buttons.forEach(button=>{
            let id =button.dataset.id;
            console.log(id);
        })
    }
}

class Storage{

}
document.addEventListener("DOMContentLoaded",()=>{
    const ui=new UI();
    const products=new Products();
    products.getProducts().then(products=>{
        ui.displayProducts(products);
    }).then(()=>{
        ui.getBagButtons();
    })
});