



/*Affichage des informations sur la page de confirmation
**********************************************/
const confirmationOrder = function() {

    if (localStorage.getItem("stockageOrder") != null) { 
      //Parse du session storage
      let getOrder = localStorage.getItem("stockageOrder")
      getOrder = JSON.parse(getOrder)

      document.getElementById('orderId').textContent = getOrder[0]
      document.getElementById('nameOrder').textContent = getOrder[1]

    } else {
      //avertissement et redirection vers l'accueil
      alert("Aucune commande passée, vous êtes arrivé ici par erreur")
      document.location.href = 'index.html'
    }
}()