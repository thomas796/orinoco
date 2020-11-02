

	//on crée la liste de produit à vendre
	fetch("http://localhost:3000/api/furniture/") 
		.then(response => response.json()) //il renvoie une promise
		.then(produits => {
		allProductsList(produits)
	}).catch(error => {
		const textError = document.createElement('p')
		textError.textContent = "Désolé une erreur avec l'API est survenue, ou la page démandée n'existe pas ! Veuillez réessayer"
		document.getElementById('listProduct_main').append(textError)
	})

	async function allProductsList(produits) {

		const productList = document.getElementById('listProduct_main')
		
		if (produits !== null) {
			produits.forEach((produit) => { 
			
				const conteneur = document.createElement('div')
				conteneur.id = 'listProduct_conteneur'
				productList.append(conteneur)

				const image = document.createElement('img')
				image.src = produit.imageUrl
				image.id = 'listProduct_image'
				conteneur.append(image)

				const dataConteneur = document.createElement('div')
				dataConteneur.id = 'listProduct_dataConteneur'
				conteneur.append(dataConteneur)

				const name = document.createElement('h2')
				name.textContent = produit.name
				name.className = 'listProduct_label'
				dataConteneur.append(name)

				const price = document.createElement('h2')
				price.textContent = produit.price / 100 + " euros"
				price.className = 'listProduct_label'
				dataConteneur.append(price)

				const link = document.createElement('a')
				link.href = "selectedProduct.html?id=" + produit._id
				link.id = 'listProduct_link'
				conteneur.append(link)

				const linkImg = document.createElement('img')
				linkImg.id = 'linkImg'
				linkImg.src = 'img/addCart.png'
				link.append(linkImg)
			})
		}
	}



