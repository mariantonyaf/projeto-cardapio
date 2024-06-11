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

        cartItemsElement.innerHTML = `
        <div>
            <div>
                <p>${item.name}</p>
                <p>${item.quantify}</p>
                <p>R$ ${item.price}</p>
            </div>

            <div>
                <button>
                    Remover
                </button>
            </div>
        </div>
        `

        cartItemsContainer.appendChild(cartItemsElement)
    })
}
