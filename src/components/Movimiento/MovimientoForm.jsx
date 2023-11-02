import SelectComponent from '../Utils/SelectComponent';
import InputComponent from '../Utils/InputComponent';
import '../../styles/movimiento/movimientoForm.css'
 
export const MovimientoForm = ({handleCloseForm, submitMovimientoForm, handleMovimientoForm, movimientoOptions, movimiento}) => {
  return (
    <div className="movimiento-add-component">
      <button className="close-movimiento-add-form" onClick={handleCloseForm}> x </button>
      <h2>Nuevo {movimiento}</h2>
      <form className="movimiento-add-form" onSubmit={submitMovimientoForm}>
        <label htmlFor="movimiento-descripcion-name" className="movimiento-form-label"> * </label>
        <SelectComponent name="movimiento-descripcion-name" onChange={handleMovimientoForm} options={movimientoOptions} placeholder={'Concepto'} />

        <label htmlFor="movimiento-concepto-name" className="movimiento-form-label"> * </label>
        <InputComponent name="movimiento-concepto-name" onChange={handleMovimientoForm} placeholder={'Descripcion'} />

        <label htmlFor="movimiento-monto-name" className="movimiento-form-label"> * </label>
        <InputComponent name="movimiento-monto-name" onChange={handleMovimientoForm} placeholder={'Monto'} />

        <button className="movimiento-add-form-addBtn"> Aceptar </button>
      </form>
    </div>
  )
}