import React, { useState } from "react";
import { db, storage } from "../../Utils/firebase";
import Imgform from "./Imgform";
import "../../assets/css/FormRegistro.css";
import { toast } from "react-toastify";
//formato json para el uso del Select
const categorias = [
  {
    nombre: "Aretes",
  },
  {
    nombre: "Brazaletes",
  },
  {
    nombre: "Collares",
  },
  {
    nombre: "Conjuntos",
  },
];

//funcion principal
function FormRegistrarMerca() {
  const [data, setData] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    categorias1: "",
    image: null,
  });

  function HandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function Registerproduct(e) {
    try {
      console.log(data);
      e.preventDefault();
      const uploadTask = storage
        .ref("imagen/" + data.image.name)
        .put(data.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress;
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("imagen")
            .child(data.image.name)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("Productos")
                .doc()
                .set({
                  nombre: data.nombre,
                  precio: parseFloat(data.precio), 
                  cantidad: parseInt(data.cantidad), 
                  categoria: data.categorias1,
                  image: imageUrl,
                })
                .then(() => {
                  setData({
                    nombre: "",
                    precio: "",
                    cantidad: "",
                    categorias1: " ",
                    image: null,
                  });
                });
            });
        }
      );
      toast("El producto se a agregado satisfactoriamente al inventario", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
  }
  //vista del formulario
  return (
    <div className="container__form">
   
      <form className="form">
      <h1>Registre la mercancia</h1>
        <div className="form__input">
          <i className="material-icons camera">add_shopping_cart</i>
          <input
            type="text"
            onChange={HandleChange}
            className="form-control"
            placeholder="Nombre del producto"
            name="nombre"
            value={data.nombre}
          />
        </div>
        <div className="form__input">
          <i className="material-icons">book</i>
          <select  className="form-control" name="categorias1" value={data.categorias1} onChange={HandleChange}>
            <option value="" disabled="disabled" selected>
              Seleccione categoria
            </option>
            {categorias.map((item, i) => (
              <option key={"categoria" + i} value={item.nombre}>
                {item.nombre}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <i className="material-icons">attach_money</i>
          <input
            type="number"
            onChange={HandleChange}
            min="1"
            step="1"
            className="form-control"
            placeholder="Precio del producto"
            name="precio"
            value={data.precio}
          />
        </div>
        <div className="form__input">
          <i className="material-icons">store</i>
          <input
            type="number"
            onChange={HandleChange}
            min="1"
            step="1"
            className="form-control"
            placeholder="Cantidad del producto"
            name="cantidad"
            value={data.cantidad}
          />
        </div>
        <div className="overlay">
          <div className="overlay-panel overlay-raight">
            <Imgform setData={setData} />
          </div>
        </div>
        <button style={{ marginTop: "10px" }} onClick={Registerproduct}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default FormRegistrarMerca;
