import { ForgetPassword, User, UserLogIn, UserSignUp } from "../../components/templates/user.tsx";
import { generic_get, generic_post, generic_post_no_body, ResponseSchema } from "./requests.tsx";


export const sign_in = async (body: UserLogIn): Promise<Response> => {
   return await generic_post(body, `/auth/login`, 'POST');
};

export const logout = async (): Promise<Response> => {
   return await generic_post_no_body(`/auth/logout`, 'POST');
};


export const sign_up = async (body: UserSignUp): Promise<Response> => {
   return await generic_post(body, `/users/create-user`, 'POST');
};

export const change_password = async (body: ForgetPassword): Promise<Response> => {
   return await generic_post(body, `/users/me/password`, 'PUT');
};

export const fetchUser = async (): Promise<ResponseSchema<User>> => {
   const fetch_user_resp = await generic_get('/users/me');

   if (fetch_user_resp.status === 200) {
      return fetch_user_resp.json();
   } else {
      throw new Error('Unauthorized');
   }
};
