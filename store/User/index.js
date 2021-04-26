const moduleUser = {
  state: () => ({
    Users:[],
  }),
  actions: {
    AllUsers(context){
      this.$axios.$get('/user/all-users')
        .then((response)=>{
          context.commit('users',response);
        })
        .catch((error)=>{
          window.location='/error';
        });
    },
  },
  mutations: {
    users(state,data){
      return state.Users=data;
    },
  },
  getters: {
    getUsers(state){
      return state.Users;
    },
  }
}

export default moduleUser;
