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

export const show_or_hide_filter_bar_drop_down = (id: string) => {
   (document.getElementById(id) as HTMLElement).classList.toggle(
      'filter_bar_drop_down_show'
   );
};

export const show_sub_string_with_dots = (
   value: string,
   string_len_to_show: number = 20
) => {
   return value.length > string_len_to_show
      ? value.substring(0, string_len_to_show) + '...'
      : value;
};

export const capitalize_first_letter = (value: string): string => {
   if (value !== null) {
      return value.charAt(0).toUpperCase() + value.slice(1);
   } else {
      return '';
   }
};
