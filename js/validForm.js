
//Au click sur le btn de validation du formulaire
const validForm = () => {
    console.log('valid form')

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
            sendData(objet)

        } else {
            alert(inputCheck.errorMessage)
        }
    } else {
        alert(cartCheck.errorMessage)
    }

}
    
const sendData = (objetRequest) => {
    
    var data = new FormData();
    data.append( "json", JSON.stringify( objetRequest ) );
    
    fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        body: data
    })
    .then(function(res) {
        console.log(res)
        return res.json()
    })
    .then(function(data) {
        console.log( JSON.stringify( data ) ) 
    }).catch(error => {
        console.log('mon erreur' + error)
    })

}



//vérifie les inputs du formulaire
const checkInput = () => {

    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;
    let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const firstName = document.getElementById("formPrenom").value
    const lastname = document.getElementById("formNom").value
    const mail = document.getElementById("formMail").value
    const adress = document.getElementById("formAdresse").value
    const district = document.getElementById("formVille").value

    let errorMessage = null

    if ((lastname === '') || (adress === '') || (district === '') || (firstName === '') || (mail === 0)) {

        errorMessage =  "Tous les champs doivent être remplis"

    } else if ((checkSpecialCharacter.test(lastname)) || (checkSpecialCharacter.test(adress)) || (checkSpecialCharacter.test(district)) || (checkSpecialCharacter.test(firstName))) {

        errorMessage =  "Champ non valide"

    } else if (checkMail.test(mail) === false) {

        errorMessage = "Votre email est invalide"

    }

    let contact = {
        firstName : firstName,
        lastName : lastname,
        address : adress,
        district : district,
        email : mail
    }

    return {contact: contact, errorMessage: errorMessage}

}



const checkCart = () => {

    let idProductJson = localStorage.getItem("stockageCart");
    let products = []
    products = JSON.parse(idProductJson);
    console.log(products)
    let errorMessage = null

    if (idProductJson == null) {
        errorMessage = "Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger"
    } else if (products.length === 0) {
        errorMessage = "Votre panier est vide"
    }

    return {products: products , errorMessage: errorMessage}

  }


