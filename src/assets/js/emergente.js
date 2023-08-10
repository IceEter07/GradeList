// Inputs para aplicar focus cuando se muestre el formulario
const input = document.querySelector('#institucionesForm input');
const input2 = document.querySelector('#emergente .name');

const emergenteDiv = document.querySelector("#emergente");
const cards = document.querySelector(".cards");
const institucionForm = document.querySelector("#institucionesForm");
const eliminarForm = document.querySelector('#eliminarForm');;


function mostrar(e) {
    if (e.classList.contains('addGroup')) {
        if (emergenteDiv.style.display == "none") {
            emergenteDiv.style.display = "flex";
            cards.style.filter = "blur(3px)"
            input2.focus();
        } else {
            emergenteDiv.style.display = "none"
            cards.style.filter = "blur(0px)"
        }
    }
    if (e.classList.contains('instituciones')) {
        if (institucionForm.style.display == "none") {
            institucionForm.style.display = "flex";
            cards.style.filter = "blur(3px)"
            input.focus();
        } else {
            institucionForm.style.display = "none"
            cards.style.filter = "blur(0px)"
        }
    }
    if (e.classList.contains('eliminar')) {
        if (eliminarForm.style.display == "none") {
            eliminarForm.style.display = "flex";
            cards.style.filter = "blur(3px)"
            input2.focus();
        } else {
            eliminarForm.style.display = "none"
            cards.style.filter = "blur(0px)"
        }
    }
}

function mostrarEditForm(e){
      
}