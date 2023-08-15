// const eliminar = document.querySelector('#eliminarForm input').value
// const formulario = document.querySelector('#formEmergenteEliminar');
const name = document.querySelector('#nombre').innerText;
const boton = document.querySelector('#btnEliminar');
const inputInstitution = document.querySelector('#nombreInstitucion');

console.log(inputInstitution);

inputInstitution.addEventListener("keyup", function() {
    if (this.value == name) {
        boton.disabled = false;
    }else{
        boton.disabled = true;
    }
});