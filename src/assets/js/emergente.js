const emergenteDiv = document.querySelector("#emergente")
const cards = document.querySelector(".cards")
const institucionForm = document.querySelector("#institucionesForm")

function mostrar(e) {
    if (e.classList.contains('addGroup')) {
        if (emergenteDiv.style.display == "none") {
            emergenteDiv.style.display = "flex";
            cards.style.filter = "blur(3px)"
    
        } else {
            emergenteDiv.style.display = "none"
            cards.style.filter = "blur(0px)"
        }
    }
    if (e.classList.contains('instituciones')) {
        if (institucionForm.style.display == "none") {
            institucionForm.style.display = "flex";
            cards.style.filter = "blur(3px)"
    
        } else {
            institucionForm.style.display = "none"
            cards.style.filter = "blur(0px)"
        }
    }
}

function mostrarEditForm(e){
      
}