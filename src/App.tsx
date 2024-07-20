
import React from 'react';
import { queryClient } from './common/configuration/ReactQueryConfiguration.tsx';
import { Route, Routes } from 'react-router';
import HealthRoute from './components/protectedRoutes/healthRoute.tsx';
import { QueryClientProvider } from 'react-query';
import { SignUp } from './components/SignUp.tsx';
import { LogIn } from './components/LogIn.tsx';
import { ChangePassword } from './components/ChangePassword.tsx';
import ProtectedSignIn from './components/protectedRoutes/ProtectedSignIn.tsx';
import { Chat } from './components/Chat.tsx';

export const App = () => {

   return (
      <div className='App'>
         <QueryClientProvider client={queryClient}>
            <Routes>
               <Route path='/' element={<LogIn />} />
               <Route path='/signup' element={<SignUp />} />
               <Route path='/forgot-password' element={<ChangePassword />} />
               <Route element={<ProtectedSignIn />}>
                  <Route path='/chat' element={<Chat />} />
               </Route>
            </Routes>
         </QueryClientProvider>
      </div>
   );
};
