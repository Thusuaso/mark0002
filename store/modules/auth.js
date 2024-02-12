import Cookies from 'js-cookie';
import store from '../../store';
const state = {
    token:null,
    userId:null,
    username:null,
    mail:null,
};
const actions = {
    sessionControl(vuexContext,context){
        let token;
        let userId;
        let username;
        let mail;
        let cookie
        if(context){
          cookie = context.headers.cookie;
          if(cookie){
            token = cookie.split(';').find(x=>x.trim().startsWith('token='));
            userId = cookie.split(';').find(x=>x.trim().startsWith('userId='));
            username = cookie.split(';').find(x=>x.trim().startsWith('username='));
            mail = cookie.split(';').find(x=>x.trim().startsWith('mail='));
            if (token) token = token.split('=')[1];
            if(userId) userId = userId.split('=')[1];
            if(username) username = username.split('=')[1];
              if (mail) mail = mail.split('=')[1];

          }
        } else{
          token = process.isClient ? localStorage.getItem('token'):false;
          userId = process.isClient ? localStorage.getItem('userId'):false;
          username = process.isClient ? localStorage.getItem('username'):false;
            mail = process.isClient ?localStorage.getItem('mail'):false;

        }
        const payload = {
            token:token,
            userId:userId,
            username:username,
            mail:mail,
        }
        vuexContext.commit('setToken',payload);
    },
    login(vuexContext,user){
        this.$axios.post('/login',user)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Giriş Başarılı ' + 'Hoşgeldin ' + response.data.username.charAt(0).toUpperCase() + response.data.username.slice(1));
                vuexContext.commit('login',response.data);
                this.$router.push('/');
            } else{
                this.$toast.error('Kullanıcı adı ya da şifre hatalı.')
            }

        })
    },
    login_mailer(vuexContext,payload) {
        this.$axios.post('/mail/login/server',payload)
            .then(response => {
                if (response.data.status) {
                  this.$toast.success('Mail gönderildi.');
                } else {
                this.$toast.error('Mail gönderilemedi.');
                }
            })
    }
};
const mutations = {
    setToken(state,user){
        state.token = user.token;
        state.userId = user.userId;
        state.username = user.username;
        state.mail = user.mail;
    },
    login(state,user){
        state.token = user.token;
        state.userId = user.userId;
        state.username = user.username;
        state.mail = user.mail;
        Cookies.set('token',user.token);
        Cookies.set('userId',user.userId);
        Cookies.set('username',user.username);
        Cookies.set('mail',user.mail);
        process.isClient ? localStorage.setItem('token',user.token):false;
        process.isClient ? localStorage.setItem('userId',user.userId):false;
        process.isClient ? localStorage.setItem('username',user.username):false;
        process.isClient ? localStorage.setItem('mail',user.mail):false;


    }
};
const getters = {
    isAuthenticated(state){
        return state.token != null;
    },
    getUserId(state) {
        return state.userId;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}


