const moduleInfo = {
  state: () => ({
    UserInfo:[],
  }),
  actions: {
    AllInfo(context){
      this.$axios.$get('/user/getAllInfo')
        .then((response)=>{
          context.commit('userInfo',response.reverse());
        })
        .catch((error)=>{
          console.log("AllInfo")
          // window.location='/error';
        });
    },
  },
  mutations: {
    userInfo(state,data){
      return state.UserInfo=data;
    },
  },
  getters: {
    getInfo(state){
      return state.UserInfo;
    },
  }
}

export default moduleInfo;
