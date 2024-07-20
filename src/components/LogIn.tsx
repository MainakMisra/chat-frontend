import { useNavigate } from 'react-router';
import '../common/assets/css/signIn.css';
import React, { useEffect, useState } from 'react';
import { input_is_empty } from './utils/helperFunctions.tsx';
import { UserLogIn } from './templates/user.tsx';
import { sign_in } from '../common/api/user.tsx';

export const LogIn = () => {
   const navigate = useNavigate();

   const [LoginData, SetLoginData] = useState<UserLogIn>({
      email: '',
      password: '',
   });
   const UpdateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
      SetLoginData({ ...LoginData, [event.target.name]: event.target.value });
   };

   const user_log_in = (): any => {
      var login_error_span = document.getElementById(
         'login_error_span'
      ) as HTMLDivElement;

      var user_email_res = input_is_empty('user_email');
      var user_password_res = input_is_empty('user_password');

       if (user_email_res === false && user_password_res === false) {
          
           
           console.log(LoginData);

         sign_in(LoginData).then((response) => {
            if (response.status === 200) {
               navigate('/chat');
               
            }  else if (response.status === 401 || response.status === 404) {
               login_error_span.innerHTML =
                  "nom d'utilisateur ou mot de passe incorrect";
            } else {
               console.error(response);
            }
         });
      }
   };

//    useEffect(() => {
//       /*Redirect if user is already logged in*/
//       if (localStorage.getItem('user_post') === 'hr') {
//          navigate('/dashboard');
//       } else if (localStorage.getItem('user_post') === 'emp') {
//          navigate('/home/dashboard');
//       }
//    }, [navigate]);

   return (
      <div className='main_div'>
         <div className='main_page_left_div'>
            <div id='sign_in_div' className='sign_in_div'>
               <p className='connexion_text'>Welcome back !</p>
               <div className='auth_input_container_div'>
                  <div className='sign_in_form_div'>
                     <label htmlFor='user_email' className='login_label'>
                        Adresse email
                        <div className='asterix_img'></div>
                     </label>
                                <input
                                id='user_email'
                                maxLength={100}
                               placeholder='Votre adresse email'
                               className={`generic_input_type`}
                                type={'email'}
                                name={'email'}
                                required={true}
                                onChange={UpdateFormData}
                            />
                  </div>
                  <div className='sign_in_form_div'>
                     <label htmlFor='user_password' className='login_label'>
                        Mot de passe
                        <div className='asterix_img'></div>
                     </label>
                                  <input
                                id='user_password'
                                maxLength={50}
                                placeholder='Votre mot de passe'
                                type={'password'}
                               name={'password'}
                               className={`generic_input_type`}
                                required={true}
                                onChange={UpdateFormData}
                            />
                  </div>
                  <div className='cta_connection_div'>
                     <button
                        onClick={user_log_in}
                        className='generic_btn'
                     >
                        Connexion
                     </button>
                  </div>
                  <div className='login_error_connection_div'>
                     <span
                        id='login_error_span'
                        className='login_error_span'
                     ></span>
                  </div>

                  <div className='generic_link_div'>
                     <a
                        id='forgot_pass_link'
                        className='generic_link'
                        onClick={() => navigate('/forgot-password')}
                        href='/forgot-password'
                     >
                        Mot de passe oublié ?
                     </a>
                  </div>
                  
                  <div className='cta_connection_div'>
                     <label className='login_label'>
                     vous n'avez pas de compte ?
                        <div className='generic_link_right_div'>
                           <a
                           className='generic_link'
                           onClick={() => navigate('/signup')}
                           href='/signup'
                           >
                           Créer un compte
                           </a>
                        </div>
                     </label>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};
