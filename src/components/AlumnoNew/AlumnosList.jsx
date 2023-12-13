export const AlumnosList = ({ alumnos }) => {
  return (
    <div className='container-table-alumnos'>
      {alumnos.map((alumno) => (
        <div
          key={`alumno-${alumno.id}`} className='new-alumno-item-list'
          style={{
            display: 'flex', justifyContent: 'center', backgroundColor: '#78a1ca', borderRadius: '1em',
            marginBottom: '.5em', height: '2.5em'
          }}>
          <div className='table-cell-ajustes' style={{ alignSelf: 'center', fontFamily: 'var(--title-text)', color: 'var(--neutral-white-text)', fontSize: '1.5em' }}>
            {alumno.nombre}
          </div>
        </div>
      ))}
    </div>
  )
}