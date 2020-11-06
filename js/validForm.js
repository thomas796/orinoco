
//Au click sur le btn de validation du formulaire
const validForm = () => {

    const cartCheck = checkCart()
    const inputCheck = checkInput()
  
    if (cartCheck.errorMessage === null) {
        if (inputCheck.errorMessage === null) {
            
            //Création de l'objet à envoyer
            const contact = inputCheck.contact
            const products = cartCheck.products
        
            let objet = {
                contact,
                products
            }
           let objetRequest = JSON.stringify(objet);
           const name = contact.firstName + ' ' + contact.lastName
        
           const order = sendData(objetRequest, name)

        } else {
            alert(inputCheck.errorMessage)
        }
    } else {
        alert(cartCheck.errorMessage)
    }
}


//requete post pour envoyer la commande et recevoir le numéro de commande
const sendData = (objetRequest, firstName) => {
    
    fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: objetRequest
    })
    .then(function(res) {
        console.log(res.orderId)
        return res.json()
    })
    .then(function(data) {
        goToConfirmOrder(data.orderId, firstName)
    }).catch(error => {
        console.log('mon erreur' + error)
    })

}

//lancer la page confirm order et mettre la commande dans le localStorage
const goToConfirmOrder = (order, firstName) => {

    let idProductArray = []
    let idProductJson = JSON.stringify(idProductArray)
    localStorage.setItem("stockageCart",idProductJson)

    let setOrder = JSON.stringify([order, firstName])
    localStorage.setItem("stockageOrder",setOrder)

   document.location.href = 'confirmation.html'
}

//vérifie les inputs du formulaire
const checkInput = () => {

    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
    let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const firstName = document.getElementById("formPrenom").value
    const lastname = document.getElementById("formNom").value
    const mail = document.getElementById("formMail").value
    const adress = document.getElementById("formAdresse").value
    const city = document.getElementById("formVille").value

    let errorMessage = null

    if ((lastname === '') || (adress === '') || (city === '') || (firstName === '') || (mail === 0)) {

        errorMessage =  "Tous les champs doivent être remplis"

    } else if ((checkSpecialCharacter.test(lastname)) || (checkSpecialCharacter.test(adress)) || (checkSpecialCharacter.test(city)) || (checkSpecialCharacter.test(firstName))) {

        errorMessage =  "Champ non valide"

    } else if (checkMail.test(mail) === false) {

        errorMessage = "Votre email est invalide"

    }

    let contact = {
        firstName : firstName,
        lastName : lastname,
        address : adress,
        city : city,
        email : mail
    }

    return {contact: contact, errorMessage: errorMessage}

}


//Vérifier que le panier ne soit pas vide et renvoyer le tableau d'id des produits du panier
const checkCart = () => {

    let idProductJson = localStorage.getItem("stockageCart");
    let products = []
    products = JSON.parse(idProductJson);
    let errorMessage = null

    if (idProductJson == null) {
        errorMessage = "Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger"
    } else if (products.length === 0) {
        errorMessage = "Votre panier est vide"
    }

    let products_id = []
    if (products_id.length) {
        products.forEach(product => {
            products_id.push(product[0])
        })
    }

    return {products: products_id , errorMessage: errorMessage}

  }


