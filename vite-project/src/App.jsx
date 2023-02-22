import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { Axios } from 'axios';
import { useEffect } from 'react';

function App() {
 // const [count, setCount] = useState(0)
 const url='https://localhost:7151/api/Usuarios';
 const [estado, setEstado]= useState([]);
//  const Mostrar=()=>{
//       axios.get(url).then(Response => {
//         console.log(Response.data);
        
//       })

//   }

  const CargarDatos = async()=>{
    await axios.get(url)
    .then(Response =>{
      
      console.log(Response.data);
      setEstado(Response.data);
    })

    
    
  }

  useEffect(()=>{
    CargarDatos();
  },[]);
 
 
 
 
  return (
    <Fragment>
<table className='table-bordered' >
 

  <thead>
    <tr>
    <th> ID</th>
        <th> Nombre   </th>
        <th>Apellido</th>
        <th>Documento</th>
        <th>Telefono</th>
        <th>Correo</th>
        <th>Acciones</th>
        
    </tr>
  </thead>

  <tbody>
    {estado.map(gestor=>(
      <tr key={gestor.id}>
        <td>{gestor.usu_id}</td>
        <td>{gestor.usu_nombre}</td>
        <td>{gestor.usu_apellido}</td>
        <td>{gestor.usu_tipo_documento}</td>
        <td>{gestor.usu_telefono}</td>
        <td>{gestor.usu_correo}</td>
        {/* <td><button className='btn btn-primary'>Editar</button></td>
        <td><button className='btn btn-danger'>Eliminar</button></td> */}
       <td>
          <button className='btn btn-danger'onClick={CargarDatos}>Eliminar</button> 
          <button  className='btn btn-warning' onClick={CargarDatos}>Mostrar</button>
        </td>
      </tr>
      ))}
  </tbody>

</table>


    </Fragment>
  )
}

export default App
