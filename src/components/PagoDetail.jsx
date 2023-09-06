import React from 'react'

const PagoDetail = ({ activeDetail, setActiveDetail, pagosActUser, actUser}) => {
    var clasesIndividuales = 0;
    var clasesGrupales = 0;

    const mostrarFechaDescentemente = (fecha) =>{

        const date = (fecha).split('-');
        return `${date[2]}/${date[1]}/${date[0]}`
    }

    const handleCloseForm=()=>{
        setActiveDetail(false);
    }

    const returnTipoClase = (tipoClase) =>{
        if(tipoClase== 0){

            return 'Alquiler'
        }
        else if(tipoClase == 1){

            return 'Clase Indv.'
        }
        return 'Clase Grupal'
    }
  return (

  
    <>
        {activeDetail &&
            <div id='pagos-detail'>
                <button id='close-detail-add-form' onClick={handleCloseForm}>x</button>
                <h2>{actUser.nombre}</h2>
                <div id='pagos-detail-list'>
                {pagosActUser.map((el, i) => { 
                if(el.idTipoClase === 1){
                    clasesIndividuales+= el.cantidad
                }
                if(el.idTipoClase === 2 ){
                    clasesGrupales+= el.cantidad
                }
                
                return (<div className='pagos-detail-item' key={i}> 
                            <p id='pagos-detail-fecha'>{mostrarFechaDescentemente(el.fecha)}</p>
                            <p id='pagos-detail-tipo'>Tipo: {returnTipoClase(el.idTipoClase)}</p>
                            <p id='pagos-detail-cantidad'>Cantidad: {el.cantidad}</p>
                    </div>)
                })}
                </div>
                <div id='pagos-detail-contadores'>
                    <div>Clases Individuales: {clasesIndividuales}</div>
                    <div>Clases Grupales: {clasesGrupales}</div>
                </div>
            </div>
        }
    </>

    
  )
}

export default PagoDetail