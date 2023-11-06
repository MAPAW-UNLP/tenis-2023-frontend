import InputReComponent from '../Utils/InputReComponent';
import SelectReComponent from '../Utils/SelectReComponent';
import '../../styles/movimiento/movimientoForm.css'

export const MovimientoForm = ({ handleCloseForm, submitMovimientoForm, personas, handleChangeFormData, movivimientoAddForm,
  movimientoOptions, movimiento }) => {
  return (
    <div className="movimiento-add-component">
      <button className="close-movimiento-add-form" onClick={handleCloseForm}> x </button>
      <h2>Nuevo {movimiento}</h2>
      <form className="movimiento-add-form" onSubmit={submitMovimientoForm}>
        <label htmlFor="concepto" className="movimiento-form-label"> * </label>
        <SelectReComponent name={'concepto'} onChange={handleChangeFormData} options={movimientoOptions} placeholder={'Concepto'} />

        {/* Si es un alumno/profesor muestro desplegable con la lista de usuarios correspondiente.
            Al seleccionar otra opcion reseteamos personaID del formulario para no enviarlo en el endpoint */}
        {movivimientoAddForm.concepto === '1' ?
          <>
            <label htmlFor="concepto" className="movimiento-form-label"> * </label>
            <SelectReComponent name={'personaId'} onChange={handleChangeFormData} options={personas} placeholder={'Seleccionar alumno'} />
          </>
          : movivimientoAddForm.personaId = ''
        }

        <label htmlFor="descripcion" className="movimiento-form-label"> * </label>
        <InputReComponent name={'descripcion'} onChangeFuncion={handleChangeFormData} placeholder={'Descripcion'} />

        <label htmlFor="monto" className="movimiento-form-label"> * </label>
        <InputReComponent name={'monto'} onChangeFuncion={handleChangeFormData} placeholder={'Monto'} />

        <button className="movimiento-add-form-addBtn" onClick={submitMovimientoForm}> Aceptar </button>
      </form>
    </div>
  )
}