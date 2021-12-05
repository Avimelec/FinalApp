import React, { useState, useEffect } from "react";
import { db } from "../Utils/firebase";
import { toast } from "react-toastify";
import "../assets/css/inventario.css"
function Inventario() {
  const [allDocs, setDocs] = useState([]);

  //funcion que nos ayudara a traer los datos de la base de datos
  const getProductos = async () => {
    db.collection("Productos").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDocs(docs);
      console.log(allDocs);
    });
  };

  useEffect(() => {
    getProductos();
    // eslint-disable-next-line
  }, []);

  
//funcion eliminar el producto de la base de datos
  const eliminar = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar el producto")) {
      await db.collection("Productos").doc(id).delete();
      toast("El producto se a eliminado", { type: "error" });
    }
  };

  return (
    <div className="contenedor">
      <div className="grid">
        {allDocs.map((doc) => {
          return (
            <div className="contenedor__productos" key={doc.id}>
              <div className="grid">
                <div className="producto">
                  <img
                    className="producto__imagen"
                    src={doc.image}
                    alt="Joyeria"
                  />
                  <div className="producto__info">
                    <p className="producto__nombre">
                      <b>Nombre:</b> {doc.nombre}
                    </p>
                    <p className="producto__nombre">
                      <b>Categoria:</b> {doc.categoria}
                    </p>
                    <p className="producto__precio">
                      <b>Precio</b> ${doc.precio}
                    </p>
                    <p className="producto__precio">
                      <b> Cantidad:</b> {doc.cantidad}
                    </p>
                  </div>
                  <button
                    className="btn__produtoc-editar"
                    style={{ marginTop: "10px" }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn__produtoc-eliminar"
                    onClick={() => eliminar(doc.id)}
                    style={{ marginTop: "10px" }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Inventario;
