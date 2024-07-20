import { useNavigate } from 'react-router';
import '../common/assets/css/signIn.css';
import React, { useState } from 'react';
import { input_is_empty } from './utils/helperFunctions.tsx';
import { ForgetPassword } from './templates/user.tsx';
import { change_password } from '../common/api/user.tsx';

export const ChangePassword = () => {
   const navigate = useNavigate();

   const [ChangePasswordData, SetChangePasswordData] = useState<ForgetPassword>({
      email: '',
      password: '',
   });
   const UpdateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
      SetChangePasswordData({ ...ChangePasswordData, [event.target.name]: event.target.value });
   };

   const user_log_in = (): any => {
      var login_error_span = document.getElementById(
         'login_error_span'
      ) as HTMLDivElement;

      var user_email_res = input_is_empty('user_email');
      var user_password_res = input_is_empty('user_password');

       if (user_email_res === false && user_password_res === false) {
          
         change_password(ChangePasswordData).then((response) => {
            if (response.status === 200) {
               navigate('/');
            }  else if (response.status === 404) {
               login_error_span.innerHTML =
                  "vous n'avez pas de compte avec cette email";
            } else {
               console.error(response);
            }
         });
      }
   };

   return (
      <div className='main_div'>
         <div className='main_page_left_div'>
            <div id='sign_in_div' className='sign_in_div'>
               <p className='connexion_text'>Mot de passe oublié</p>
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
                        nouveau mot de passe
                        <div className='asterix_img'></div>
                     </label>
                                  <input
                                id='user_password'
                                maxLength={50}
                                placeholder='nouveau mot de passe'
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
                        Mise à jour
                     </button>
                  </div>
                  <div className='login_error_connection_div'>
                     <span
                        id='login_error_span'
                        className='login_error_span'
                     ></span>
                  </div>


                  <div className='cta_connection_div'>
                     <label className='login_label'>
                  Avez-vous déjà un compte ?
                        <div className='generic_link_right_div'>
                           <a
                           className='generic_link'
                           onClick={() => navigate('/')}
                           href='/'
                           >
                         se connecter
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
