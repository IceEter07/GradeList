const emergenteDiv = document.querySelector("#emergente")
// const obscurecerBody = document.getElementById("body");
// emergenteDiv.style.display = "none";
const cards = document.querySelector(".cards")

function mostrar(e) {
    if (emergenteDiv.style.display == "none") {
        emergenteDiv.style.display = "flex";
        cards.style.filter = "blur(3px)"
        // emergenteDiv.style.filter = "blur(0px)";
        // obscurecerBody.style.filter = "blur(4px)"

    } else {
        emergenteDiv.style.display = "none"
        // obscurecerBody.style.filter = "blur(0px)"
        cards.style.filter = "blur(0px)"
    }
    
}

function mostrarEditForm(e){
      
}