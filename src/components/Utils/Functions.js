export const formatDate = (date) =>{
    const mes = ("0" + (date.getMonth() + 1)).slice(-2)
    const dia = ("0" + date.getDate()).slice(-2)
    const año = (date.getFullYear());
    const fechaNacimiento = `${año}${mes}${dia}`;
    return fechaNacimiento
}

export const ordenarPorNombre = (datos) => {
  return datos.sort(function (a, b) {
    if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
      return 1;
    } else {
      return -1;
    }
  });
};