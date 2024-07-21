
import { createContext, useContext, useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchUser } from '../../common/api/user.tsx';
import { clear_cookies } from '../utils/helperFunctions.tsx';
import { User } from '../templates/user.tsx';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const ProtectedSignIn = () => {
   const navigate = useNavigate();
   const { data, isSuccess, isError } = useQuery(
      ['user_information'],
      fetchUser,
      {
         retry: false,
      }
   );
    const [isMeSuccess, SetIsMeSuccess] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      if (isSuccess) {
         console.log(data.data);
         if (data.data === undefined) {
            SetIsMeSuccess(false);
            navigate('/');
         } else {
            setUser(data.data);
            SetIsMeSuccess(true);
         }
      }
      if (isError) {
         clear_cookies();
         localStorage.clear();
         navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data?.data, isSuccess, isError]);

   const content = <Outlet />;

    return (
        
    <UserContext.Provider value={{ user, setUser }}>
      {isMeSuccess ? content : null}
    </UserContext.Provider>)
    
};
export default ProtectedSignIn;
