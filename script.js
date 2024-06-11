const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCount = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = []

// ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function(){
    updateCartModal()
    cartModal.style.display = "flex"
})

// FECHAR O MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// FECHAR O MODAL NO BOTÃO 'FECHAR'
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

// PEGANDO DADOS DOS ITENS
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name,price)
    }
    // ADICIONAR NO CARRINHO    
})

// FUNÇÃO PARA ADICIONAR NO CARRINHO
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        // SE O ITEM JA EXISTE, AUMENTA APENAS A QUANTIDADE
        existingItem.quantify += 1
    } else{
        cart.push({
            name, price, quantify: 1,
        })
    }

    updateCartModal()
}

// ATUALIZA O CARRINHO
function updateCartModal(){
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemsElement = document.createElement("div")
        cartItemsElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemsElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantify}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
        `
        total += item.price * item.quantify

        cartItemsContainer.appendChild(cartItemsElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    })

    cartCount.innerHTML = cart.length
}

// FUNÇÃO PARA REMOVER O ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index]
    }
}
