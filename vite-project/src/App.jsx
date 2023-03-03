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
  //const [Editar, setEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  //const [Id, setId] = useState("");
  //const [Nombre, setNombre] = useState("");
  //const [Apellido, setApellido] = useState("");
  //const [Telefono, setTelefono] = useState("");
  //const [Correo, setCorreo] = useState("");
  //const [TpDoc, setTpDoc] = useState("");
  const [gestorSeleccionado, setgestorSeleccionado] = useState({
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono:'',
    tipo_documento: '',
  });

  //  const Mostrar=()=>{
  //       axios.get(url).then(Response => {
  //        console.log(Response.data);})
  //   }

  const peticionPost=async()=>{
    delete gestorSeleccionado.id;
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(url, gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(url+"/"+gestorSeleccionado.usu_id)
    .then(response=>{
     setData(data.filter(gestor=>gestor.usu_id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  //app.UseCors("MyAllowSpecificOrings");

  const seleccionarGestor=(gestor, caso)=>{
    setgestorSeleccionado(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  const CargarDatos = async () => {
    await axios.get(url).then((Response) => {
      console.log(Response.data);
      setEstado(Response.data);
    });
  };

  const handleChange = e=> {
    const{name, value}=e.target;
    setgestorSeleccionado({
      ...gestorSeleccionado,
      [name]:value
    });
   console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
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
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>
                  Eliminar
                </button>
                <button className="btn btn-warning" onClick={CargarDatos}>
                  Mostrar
                </button>
                <Button color="primary"  onClick={()=>seleccionarGestor(gestor, "Editar")}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <br />
        <Button color="danger" onClick={()=>abrirCerrarModalInsertar()} >
          Agregar
        </Button>

        <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Gestor de Base de datos {gestorSeleccionado && gestorSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

        <Modal isOpen={modalInsertar}>
          <ModalHeader toggle={toggle}>Formulario Usuario</ModalHeader>
          <ModalBody>
            <div className="form-group">
              {/* <label>ID</label>
            <br />
            <input type="text" className="form-control" name="id" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.usu_id} /> */}
              <label>Nombre</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
                value={gestorSeleccionado && gestorSeleccionado.usu_nombre}
              />
              <label>Apellido</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="apellido"
                onChange={handleChange}
                value={gestorSeleccionado && gestorSeleccionado.usu_apellido}
              />
              <label>Documento</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="documento"
                onChange={handleChange}
                value={
                  gestorSeleccionado && gestorSeleccionado.usu_tipo_documento}
              />
              <label>Telefono</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="telefono"
                onChange={handleChange}
                value={gestorSeleccionado && gestorSeleccionado.usu_telefono}
              />
              <label>Correo</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="correo"
                onChange={handleChange}
                value={gestorSeleccionado && gestorSeleccionado.usu_correo}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>peticionPost()}>
              Registrar
            </Button>{" "}
            <Button color="secondary"onClick={()=>abrirCerrarModalInsertar()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      {/* <div>
        <Modal isOpen={modal} toggle={toggle} {...modalEditar}>
          <ModalHeader toggle={toggle}>Ediatr Usuario</ModalHeader>
          <ModalBody>
            <form className="form-group" onSubmit={(e)=>editar()}>
              <label>ID</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usu_id"
                value={gestorSeleccionado && gestorSeleccionado.id}
                readOnly
              />
              <label>Nombre</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usu_nombre"
                value={gestorSeleccionado && gestorSeleccionado.nombre}
              />
              <label>Apellido</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usu_apellido"
                value={apellido}
              />
              <label>Documento</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usu_documento"
                value={gestorSeleccionado && gestorSeleccionado.documento}
              />
              <label>Telefono</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usu_telefono"
                value={gestorSeleccionado && gestorSeleccionado.telefono}
              />
              <label>Correo</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="usu_correo"
                value={gestorSeleccionado && gestorSeleccionado.correo}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => peticionput()}>
              {" "}
              Registrar
            </Button>{" "}
            <Button color="secondary" onClick={() => abrircerrarModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div> */}
    </Fragment>
  );
}

export default App;
