import { useEffect, useState } from 'react';
// import { clear_cookies } from 'components/utils/helperFunctions';

import { fetchHealth } from '../../common/api/health.tsx';
import { Outlet } from 'react-router';
import React from 'react';
import { useQuery } from 'react-query';

const HealthRoute = () => {
   const { data, isSuccess, isError } = useQuery(
      ['user_information'],
      fetchHealth,
      {
         retry: false,
      }
   );
   const [isloaded, setIsLoaded] = useState<boolean>(false);

   useEffect(() => {
      if (isSuccess) {
         console.log(data.data);
         // if (data.data === undefined) {
         //    clear_cookies();
         //    localStorage.clear();
         //    navigate('/');
         // } else {
         //    setIsLoaded(true);
         //    const userHasAcquiredRole = roles.includes(data.data.permission);

         //    if (
         //       data.data.has_employee_form === true &&
         //       window.location.href.includes('/onboarding/personal-information')
         //    ) {
         //       navigate('/home/dashboard');
         //    }
         //    if (data.data.has_employee_form === false) {
         //       navigate('/onboarding/personal-information');
         //    }
         //    if (!userHasAcquiredRole) {
         //       navigate('/unauthorized');
         //    }
         // }
      }
      if (isError) {
         // clear_cookies();
         // localStorage.clear();
         // navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, isSuccess, isError]);

   const content = isloaded ? <Outlet /> : <></>;
   return <>{content}</>;
};
export default HealthRoute;
