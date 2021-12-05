import React from "react";
import * as Md from "react-icons/md";
import * as Fa from "react-icons/fa";


export const SideBarDatos = [
  {
    title: "Registra Mercancia",
    path: "/",
    icon: <Md.MdAddShoppingCart />,
    CName: "nav-text",
  },
  {
    title: "Nosotros",
    path: "/admin",
    icon: <Fa.FaUserPlus />,
    CName: "nav-text",
  },
  {
    title: "Inventario",
    path: "/inventario",
    icon: <Md.MdOutlineInventory/>,
    CName: "nav-text",
  },
];

export default SideBarDatos;
