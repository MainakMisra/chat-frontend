export const fetchAPIPath = `/api/api`;

export interface ResponseSchema<T> {
   data: T;
}

export async function generic_post_no_body(route: string, method: string) {

   const response = await fetch(`${fetchAPIPath}${route}`, {
      method: method,
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
   });

   return response;
}



export async function generic_post(body: any, route: string, method: string) {

   const response = await fetch(`${fetchAPIPath}${route}`, {
      method: method,
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
   });

   return response;
}



export async function generic_get(route: string) {
   const response = await fetch(`${fetchAPIPath}${route}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
   });

   return response;
}
