import Cookies from 'js-cookie';
export default (context,inject) =>{
    const cookie = Cookies;
    inject('cookie',cookie);
    context.$cookie = cookie;
};