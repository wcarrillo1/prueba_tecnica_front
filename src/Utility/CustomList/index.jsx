import { Alert } from 'reactstrap'

  export const CustomText = (data) => {
    return  <div data-tag="allowRowEvents" style={{ fontSize:'15px', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
              { data } 
            </div>
  }


  export const EstadoLista = ({row}) => {
    const Variante = [
        'danger',
        'success'
      
        

    ]

    return (
        <Alert color={Variante[row.estado]} className="w-100 text-center alert-xs font-weight-bolder" style={{ padding: '5px' }}>
    
            { (row.estado === 0) && 'Desactivado' }
            { (row.estado === 1) && 'Activo'}
            
        </Alert>
    )
}

export const EstadoVehiculo = ({row}) => {
  const Variante = [
      'danger',
      'success'
    
      

  ]

  return (
      <Alert color={Variante[row.estado]} className="w-100 text-center alert-xs font-weight-bolder" style={{ padding: '5px' }}>
  
          { (row.estado === 0) && 'Desactivado' }
          { (row.estado === 1) && 'Disponible'}
          
      </Alert>
  )
}



  export default ( 
      CustomText,
      EstadoLista,
      EstadoVehiculo
  )