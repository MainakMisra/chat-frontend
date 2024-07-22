export function input_is_empty(input_type_id: string): boolean {
   var vibrate: boolean = false;

   var input_field = document.getElementById(input_type_id) as HTMLInputElement;

   if (input_field.value === '' || input_field.value === ' ') {
      input_field.classList.add('error_shake');
      setTimeout(function () {
         input_field.classList.remove('error_shake');
      }, 300);

      vibrate = true;
   }

   return vibrate;
}

export const clear_cookies = () => {
   var cookies = document.cookie.split(';');
   for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
   }
};

export const formatDateTime = (isoString: string): { date: string, time: string } => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}`
  };
};
