import '../../styles/buttons/genericLargeButton.css';

export const GenericLargeButton = ({ doSomething, movimiento }) => {
  return(
    <button className='generic-large-add-btn' onClick={doSomething}>
      <h1 className='generic-large-add-btn-text'>Crear nuevo {movimiento}</h1>
    </button>
  )
}