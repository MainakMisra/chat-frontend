import { useNavigate } from 'react-router';
import '../common/assets/css/signIn.css';
import React, { useState } from 'react';
import { input_is_empty } from './utils/helperFunctions.tsx';
import { UserSignUp } from './templates/user.tsx';
import { sign_up } from '../common/api/user.tsx';

export const SignUp = () => {
   const navigate = useNavigate();

   const [SignUpData, SetSignUpData] = useState<UserSignUp>({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
   });
   const UpdateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
      SetSignUpData({ ...SignUpData, [event.target.name]: event.target.value });
   };

   const user_create_account = (): any => {
      var login_error_span = document.getElementById(
         'login_error_span'
      ) as HTMLDivElement;

        var user_email_res = input_is_empty('user_email');
        var user_password_res = input_is_empty('user_password');
        var user_first_name_res = input_is_empty('user_first_name');
        var user_last_name_res = input_is_empty('user_last_name');

       if (!user_email_res &&
           !user_password_res &&
           !user_first_name_res &&
          !user_last_name_res) {
          
         sign_up(SignUpData).then((response) => {

            if (response.status === 201) {
               navigate('/');
            }  else if (response.status === 409) {
               login_error_span.innerHTML =
                  "Impossible de créer un compte avec cet email";
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
               <p className='connexion_text'>Créez votre compte !</p>
                   <div className='auth_input_container_div'>
                                         <div className='sign_in_form_div'>
                     <label htmlFor='user_first_name' className='login_label'>
                        Prenom
                        <div className='asterix_img'></div>
                     </label>
                                <input
                                id='user_first_name'
                                maxLength={100}
                               placeholder='Votre prenom'
                               className={`generic_input_type`}
                                type={'text'}
                                name={'first_name'}
                                required={true}
                                onChange={UpdateFormData}
                            />
                       </div>
                                         <div className='sign_in_form_div'>
                     <label htmlFor='user_last_name' className='login_label'>
                        Nom
                        <div className='asterix_img'></div>
                     </label>
                                <input
                                id='user_last_name'
                                maxLength={100}
                               placeholder='Votre nom'
                               className={`generic_input_type`}
                                type={'text'}
                                name={'last_name'}
                                required={true}
                                onChange={UpdateFormData}
                            />
                  </div>
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
                        onClick={user_create_account}
                        className='generic_btn'
                     >
                        Créer un compte
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
