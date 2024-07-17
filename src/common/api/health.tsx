export async function generic_get_request(route: string) {
   console.log(route);
   const response = await fetch(`http://localhost:9000/health`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
   });

   console.log(response);

   return response;
}


export interface ResponseSchema<T> {
   data: T;
}

export interface Health {
   data: number;
}

export const fetchHealth = async (): Promise<ResponseSchema<Health>> => {
  
   const fetch_user_resp = await generic_get_request('/health');

   if (fetch_user_resp.status === 200) {
      return fetch_user_resp.json();
   } else {
      throw new Error('Unauthorized');
   }
};
