import { useNavigate } from 'react-router';
import '../common/assets/css/signIn.css';
import React, { useContext } from 'react';
import { UserContext } from './protectedRoutes/ProtectedSignIn.tsx';

export const Chat = () => {
    const navigate = useNavigate();

    const context = useContext(UserContext);


   return (
      <div className='main_div'>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Welcome, {context?.user?.first_name}</h1>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <button>LOGOUT</button>
            </li>
          </ul>
        </div>
      </div>
           </nav>
           

           Main page
      </div>
   );
};
