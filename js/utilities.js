
	const numberCart = function() {
        if (localStorage.getItem("stockageCart") !== null) {
            let idProductJson = localStorage.getItem("stockageCart");
            let idProductArray = JSON.parse(idProductJson);
            document.getElementById('productInCart').textContent = idProductArray.length
        }
    }()

    