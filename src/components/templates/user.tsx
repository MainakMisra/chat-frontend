export interface UserLogIn {
   email: string;
   password: string;
}

export interface UserSignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface ForgetPassword {
    email: string;
    password: string;
}

export interface User {
   id: number;
   first_name: string;
   last_name: string;
   email: string;
}