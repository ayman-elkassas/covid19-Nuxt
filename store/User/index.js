const moduleUser = {
  state: () => ({
    Users:[],
    UserByCharFname:[],
    firstLogin:false,
  }),
  actions: {
    AllUsers(context){
      this.$axios.$get('/user/all-users')
        .then((response)=>{
          context.commit('users',response);
        })
        .catch((error)=>{
          console.log("AllUsers")
          // window.location='/error';
        });
    },
    AllUserByName(context,char){
      let payload={}
      payload['char']=char;
      payload['role']=this.$auth.user.role

      this.$axios.$get('/user/getUserByCharFromFName/'+JSON.stringify(payload))
        .then((response)=>{
          context.commit('allUserByCharFname',response);
        })
        .catch((error)=>{
          console.log("AllUsers")
        });
    },
    firstLogin(context,flag){
      context.commit('firstLogin',flag);
    }
  },
  mutations: {
    users(state,data){
      return state.Users=data;
    },
    allUserByCharFname(state,data){
      return state.UserByCharFname=data
    },
    firstLogin(state,data){
      return state.firstLogin=data
    }
  },
  getters: {
    getUsers(state){
      return state.Users;
    },
    getUserByCharFname(state){
      return state.UserByCharFname;
    },
    getFirstLogin(state){
      return state.firstLogin;
    },
  }
}

export default moduleUser;
