let idCart = ''
let defaultOptions = ''

//on crée la liste de produit à vendre
fetch('http://localhost:3000/api/furniture/'+location.search.substring(4))
	.then(response => response.json())
	.then(produit => {
				detailProduit(produit)
}).catch(error => {
	const textError = document.createElement('p')
	textError.textContent = "Désolé une erreur avec l'API est survenue, ou la page démandée n'existe pas ! Veuillez réessayer"
	document.getElementById('product_main').append(textError)
})

//on créé la vue présentant le produit
async function detailProduit(produitSelected) {

	idCart = produitSelected._id

	const name = document.getElementById('product_name')
	name.textContent = produitSelected.name

	const image = document.getElementById('product_img')
	image.src = produitSelected.imageUrl

	const description = document.getElementById('product_description')
	description.textContent = produitSelected.description

	const price = document.getElementById('product_price')
	price.textContent = 'Prix : ' + produitSelected.price / 100 + " euros"

	produitSelected.varnish.forEach((varnish)=>{
		defaultOptions = varnish
		let optionProduit = document.createElement("option")
		optionProduit.innerText = varnish
		document.getElementById('product_optionSelect').append(optionProduit)
	})

}

//On ajoute le produit dans le panier lorsque l'utilisateur appui sur le bouton ajouter
function addInCart() {
	let value = document.getElementById('product_optionSelect').value
	if (value === '') {
		value = defaultOptions
	}

	if (localStorage.getItem("stockageCart") !== null) {

		let idProductJson = localStorage.getItem("stockageCart");
		let idProductArray = JSON.parse(idProductJson);
		idProductArray.push([idCart, value])

		idProductJson = JSON.stringify(idProductArray);
		localStorage.setItem("stockageCart",idProductJson);
		document.getElementById('productInCart').textContent = idProductArray.length

		const animationAdd = document.getElementById('product_add_animation')
		animationAdd.style.transitionDuration = '1s'
		animationAdd.style.color = 'red'

		setTimeout(function() {
			animationAdd.style.color = 'transparent'
		}, 1000)
		
	} else {
		let idProductArray = [[idCart, value]]
		let idProductJson = JSON.stringify(idProductArray)
		localStorage.setItem("stockageCart",idProductJson)
		document.getElementById('productInCart').textContent = 1
	}
}





