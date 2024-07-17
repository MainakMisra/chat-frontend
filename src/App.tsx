
import React from 'react';
import { queryClient } from './common/configuration/ReactQueryConfiguration.tsx';
import { Route, Routes } from 'react-router';
import HealthRoute from './components/protectedRoutes/healthRoute.tsx';
import { QueryClientProvider } from 'react-query';


export interface PathRouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    element?: React.ReactNode | null;
    index?: false;
    path: string;
}

export const onboarding = [
   { path: '/', element: <HealthRoute /> },
];

export const App = () => {

   return (
      <div className='App'>
         hello
         <QueryClientProvider client={queryClient}>
            <Routes>

               <Route>
                  {onboarding.map((route: PathRouteProps) => {
                     return <Route {...route} />;
                  })}

                
               </Route>

            </Routes>
         </QueryClientProvider>
      </div>
   );
};
