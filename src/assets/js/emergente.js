const emergenteDiv = document.querySelector("#emergente")
const cards = document.querySelector(".cards")

function mostrar(e) {
    if (emergenteDiv.style.display == "none") {
        emergenteDiv.style.display = "flex";
        cards.style.filter = "blur(3px)"

    } else {
        emergenteDiv.style.display = "none"
        cards.style.filter = "blur(0px)"
    }
    
}

function mostrarEditForm(e){
      
}