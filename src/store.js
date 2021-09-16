import { writable } from "svelte/store";
import Cookies from 'js-cookie'

const cookie = Cookies.get('uid');
console.log('Cookie in uid = ' + cookie);
// もしCOOKIEにuidがあればCookieのuidを使う
// if( cookie ){
//   userId = cookie
// }else{
//   userId = null
// }
export const userId = writable( cookie ? cookie : null ); 