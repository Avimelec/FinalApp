import React, {useState} from "react";
import * as Ai from "react-icons/ai";
import { Link } from "react-router-dom";
import {SideBarDatos} from "./SideBarDatos";
import '../../assets/css/Navbar.css';
import {IconContext} from 'react-icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';
function Navbar() {
    const[sidebar,setsidebar]=useState(false);

    const mostrarmenu= () => setsidebar(!sidebar);
    //eslint-disable-next-line
    const { logout, currentUser } = useAuth();
    const history = useHistory();
    //eslint-disable-next-line
    const [error, setError] = useState('');
  
  
    const handleLogout = async () => {
      try {
        await logout();
        history.push('/login');
      } catch (error) {
        setError('Server Error')
      }
    }
  return (
    <>
    
    <IconContext.Provider value={{color:'#fff'}}>
    
      <div className="navbar">
      <div className="cerrarSesion">
        <button className='logout-button' onClick={handleLogout} >Log Out</button>
        </div>
        <Link to="#" className="menu-bars">
          <Ai.AiOutlineBars onClick={mostrarmenu}/>
        </Link>
       
      </div>
     
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        | <ul className="nav-menu-items" onClick={mostrarmenu}>
            <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <Ai.AiOutlineClose/>
                </Link>
                <div className="imagen"></div>
            </li>
            {SideBarDatos.map((item , index) => {
                return(
                    <li key={index} className={item.CName}> 
                        <Link to = {item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
