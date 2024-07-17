export const fetchAPIPath = `/api/api`;

export async function generic_get_request(route: string) {
   const response = await fetch(`${fetchAPIPath}${route}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
   });

  console.log(`Requesting: ${fetchAPIPath}${route}`);
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
