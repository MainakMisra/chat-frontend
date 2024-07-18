
import React from 'react';
import { queryClient } from './common/configuration/ReactQueryConfiguration.tsx';
import { PathRouteProps, Route, Routes } from 'react-router';
import HealthRoute from './components/protectedRoutes/healthRoute.tsx';
import { QueryClientProvider } from 'react-query';
import { SignIn } from './components/SignIn.tsx';
import { SignUp } from './components/SignUp.tsx';


// export interface PathRouteProps {
//     caseSensitive?: boolean;
//     children?: React.ReactNode;
//     element?: React.ReactNode | null;
//     index?: false;
//     path: string;
// }

// export const onboarding = [
//    { path: '/', element: <HealthRoute /> },
// ];

export const App = () => {

   return (
      <div className='App'>
         <QueryClientProvider client={queryClient}>
            <Routes>

               {/* <Route>
                  {onboarding.map((route: PathRouteProps) => {
                     return <Route {...route} />;
                  })}
               </Route> */}
               

               <Route path='/' element={<SignIn />} />
               <Route path='/signup' element={<SignUp />} />

            </Routes>
         </QueryClientProvider>
      </div>
   );
};
