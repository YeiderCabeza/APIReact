import { Fragment, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { Axios } from "axios";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function App() {
  // const [count, setCount] = useState(0)
  const url = "https://localhost:7151/api/Usuarios";
  const [estado, setEstado] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState([]);
  // const [modalEliminar, setModalEliminar] = useState([]);
  const [gestrorselecionado, setGestrorselecionado] = useState('');

  //  const Mostrar=()=>{
  //       axios.get(url).then(Response => {
  //        console.log(Response.data);})
  //   }

  const CargarDatos = async () => {
    await axios.get(url).then((Response) => {
      console.log(Response.data);
      setEstado(Response.data);
    });
  };
  
  const handleChange = e=> {
    const{name, value}=e.target;
    setGestrorselecionado({
      ...gestrorselecionado,
      [name]:value
    });
   console.log(gestrorselecionado);
  }

  useEffect(() => {
    CargarDatos();
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Fragment>
      <table className="table-bordered">
        <thead>
          <tr>
            <th> ID</th>
            <th> Nombre </th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estado.map((gestor) => (
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
                <button className="btn btn-danger" onClick={CargarDatos}>
                  Eliminar
                </button>
                <button className="btn btn-warning" onClick={CargarDatos}>
                  Mostrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <div>
      <br /><Button color="danger" onClick={toggle}>
       Agregar
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...modalInsertar}>
        <ModalHeader toggle={toggle}>Formulario Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            {/* <label>ID</label>
            <br />
            <input type="text" className="form-control" name="id" onChange={handleChange} value={gestrorselecionado && gestrorselecionado.usu_id} /> */}
            <label>Nombre</label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={gestrorselecionado && gestrorselecionado.usu_nombre} />
            <label>Apellido</label>
            <br />
            <input type="text" className="form-control" name="apellido" onChange={handleChange} value={gestrorselecionado && gestrorselecionado.usu_apellido} />
            <label>Documento</label>
            <br />
            <input type="text" className="form-control" name="documento" onChange={handleChange} value={gestrorselecionado && gestrorselecionado.usu_tipo_documento} />
            <label>Telefono</label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={gestrorselecionado && gestrorselecionado.usu_telefono} />
            <label>Correo</label>
            <br />
            <input type="text" className="form-control" name="correo" onChange={handleChange} value={gestrorselecionado && gestrorselecionado.usu_correo} />
             
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Registrar
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>

    </Fragment>

    
  );
}

export default App;
