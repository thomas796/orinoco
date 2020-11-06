
//Ajoute le comptage des produits du panier dans le header
const numberCart = function() {
     if (localStorage.getItem("stockageCart") !== null) {
          let idProductJson = localStorage.getItem("stockageCart");
          let idProductArray = JSON.parse(idProductJson);
          document.getElementById('productInCart').textContent = idProductArray.length
     }
}()

    