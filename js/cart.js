//on crée la liste de produit
fetch('http://localhost:3000/api/furniture/')
.then(response => response.json())
.then(produits => {
    setUpProductCartTable(produits)
}).catch(error => {
const textError = document.createElement('p')
textError.textContent = "Désolé une erreur avec l'API est survenue, ou la page démandée n'existe pas ! Veuillez réessayer"
document.getElementById('cart_main').append(textError)
})

//Créer le tableau des produits du panier
function setUpProductCartTable(produits) {
    const productArray = document.getElementById('cart_productArray')
    let idProductJson = localStorage.getItem("stockageCart");
    let idProductArray = JSON.parse(idProductJson);

    let array = setUpProductCartArray(idProductArray, produits)

    if (array.length !== 2) {

    array.forEach((cell, index) => {

        const conteneur = document.createElement('div')
        conteneur.className = 'cart_cell_conteneur'
        productArray.append(conteneur)

        const name = document.createElement('div')
        name.className = 'cart_cells cart_cells_text cart_cell_product'
        conteneur.append(name)

        const price = document.createElement('div')
        price.className = 'cart_cells cart_cells_text cart_cell_price'
        price.textContent = cell[2] + ' €'   
        conteneur.append(price)

        const trash = document.createElement('div')
        trash.className = 'cart_cells cart_cells_text cart_cell_delete'
        conteneur.append(trash)

        if ((index !== 0) && (index !== array.length-1)) {

            name.innerHTML = `${cell[1]} <br> <span class='option'>${cell[3]}</span>`
            name.classList.add('centerOption')
            const deleteIcon = document.createElement('img')
            deleteIcon.className = "delete_product"
            deleteIcon.src = "./img/delete.png"
            trash.append(deleteIcon)
            trash.id = index
            conteneur.id = 'conteneur' + index
            trash.addEventListener('click', function() {
     
                const optionElement = array[this.id][3]
                const idElement = array[this.id][4]
                array.splice(this.id, 1)
                let getProductJson = localStorage.getItem("stockageCart")
                let getProductArray = JSON.parse(getProductJson)
            
                var i = getProductArray.length
               
                while (i--) {

                    if ((getProductArray[i][0] === idElement) && (getProductArray[i][1] === optionElement)) {

                        localStorage.clear()

                        getProductArray.splice(i, 1)

                        let getProduct = JSON.stringify(getProductArray);
                        localStorage.setItem("stockageCart", getProduct);
        
                        // document.getElementById('productInCart').textContent = getProductArray.length
                        document.getElementById('conteneur'+this.id).remove()
                        // document.getElementById('updatePrice').textContent = updatePrice(array)
                        break;
                    }
                }

                location.reload()
            })
        }

        if (index === 0) {
            conteneur.className = 'cart_cell_conteneur bold'
            name.innerHTML = cell[1]
            price.textContent = cell[2] 
            price.style.borderTop = '2px solid lightGray'
            name.style.borderTop = '2px solid lightGray'
        } else if (index === array.length-1) {
            name.innerHTML = cell[1]
            price.style.fontWeight = 'bold'
            price.style.borderBottom = '2px solid lightGray'
            price.id = 'updatePrice'
            name.style.borderBottom = '2px solid lightGray'
        } 

        

    })

    } else {
        const emptyCart = document.createElement('p')
        emptyCart.textContent = "Votre panier est vide !"
        productArray.append(emptyCart)
    }
    productArray.style.marginBottom = '30px'
}

//Récupérer dans le storage le tableau de produit du panier
const setUpProductCartArray = (idProductArray, produits) => {
    let array = []
    array.push(['', 'Vos Produits', 'Prix', '', ''])

    idProductArray.forEach((productCart, index) => {
        produits.forEach(product => {
            if (product._id === productCart[0]) {
                const price = product.price / 100
                array.push([index, product.name, price, productCart[1], productCart[0]])
            }
        })
    })

    array.push(['', 'Total à payer', updatePrice(array), '', ''])

    return array
}

//calculer le prix total des produits
const updatePrice = (array) => {
    let totalPrice = 0
    for (let i = 1; i < array.length; i++) {
        totalPrice += parseInt(array[i][2])
    }
    return totalPrice
}

