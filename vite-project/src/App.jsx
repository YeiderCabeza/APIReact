import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { Axios } from 'axios';

function App() {
 // const [count, setCount] = useState(0)
 const url=()=>{'https://localhost:7151/api/Usuarios'}
  const Mostrar=()=>{
      axios.get(url).then(Response => {
        console.log(Response.data);
        
      })

  }

  return (
    <Fragment>
<table className='table-bordered' >
 

<tr>
  
  <th> ID </th>
  <th> Nombre   </th>
  <th>Apellido</th>
  <th>Documento</th>
  <th>Telefono</th>
  <th>Correo</th>
  <th>Acciones</th>
  
  
</tr>


<tr>
  <td>1</td>
  <td>JOSE</td>
  <td>RAUL</td>
  <td>CC</td>
  <td>321211</td>
  <td>JOSE@GMAIL.COM</td>
  {/* <td><button className='btn btn-primary'>Editar</button></td>
  <td><button className='btn btn-danger'>Eliminar</button></td> */}
  <td><button className='btn btn-danger'>Eliminar</button></td> 
</tr>
<button onClick={Mostrar}>Mostrar</button>

</table>


    </Fragment>
  )
}

export default App
