import api from "@/plugins/axios";
import Cookies from 'js-cookie'
import router from '@/router'

export default {
  state: {
    userInfo: [] as any [],
    userAuth: false as boolean,
    userCompany: [] as any []
  },
  mutations: {
      userLogOut(state:any, data:any) {
        Cookies.remove('token')
        state.userAuth = false
      }
  },
  actions: {
      getProfile({
          commit, state
      }:any) {
        api.get('accounts/profile/profile/').then((response:any)=>{
            state.userInfo = response.data
        })
      },
      createProfile({
          commit, state
      }:any, payload:any) {
          api.post('accounts/auth/phone_auth/',{
              email: `${payload.email}`,
              password: `${payload.password}`,
          })
          .then((response:any)=>{
            if(response.status === 200){
                console.log(response);
                state.userInfo = response.data.user
                Cookies.set('token', `${response.data.token}`, { secure: true, path: '/', expires: 45 })
                state.userAuth = !state.iserAuth;
            } 
          })
          .then(()=>router.push('/'))
      },
      checkAuth({
          commit, state
      }:any, payload:any) {
          if(Cookies.get('token')){
              state.userAuth = !state.userAuth;
          }
      },


    //   function add new company user
    addNewCompany({
        commit, state
    }:any, payload:any){
        console.log(payload);
        api.post('http://dev1.itpw.ru:8005/marketplace/company/',{
            full_name: payload.full_name,
            short_name: payload.short_name,
            inn: payload.inn,
            img: payload.img,
            description: payload.description
        }).then((response:any)=>{
            console.log(response);
        })
    },

    //   other don't important function
    changeNameProfileUser({
        commit, state
    }:any, payload:any){
        api.put('accounts/profile/change_name/',{
            name: `${payload.name}`
        }).then((response:any)=>{
            console.log(response);
            state.userInfo = response.data
        })
    }
  },
  modules: {
  },
  namespaced: true,
}
