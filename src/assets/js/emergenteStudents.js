const emergenteDiv = document.querySelector("#emergente")
const container = document.querySelector(".container")

function mostrar(e) {
    if (emergenteDiv.style.display == "none") {
        emergenteDiv.style.display = "flex";
        container.style.filter = "blur(3px)"

    } else {
        emergenteDiv.style.display = "none"
        container.style.filter = "blur(0px)"
    }
}