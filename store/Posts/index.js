const modulePost = {
  state: () => ({
    users:[],
  }),
  actions: {
    AllUsers(context){
      let request={token:"",provider:""};

      //todo:call mutation and pass object data
      //todo:should make axios request to get user object
      //todo:make an api in back to return full user object
      if(localStorage.hasOwnProperty('token')
        && localStorage.hasOwnProperty('provider')){

        request.token=localStorage.getItem("token");
        request.provider=localStorage.getItem("provider");

        this.$axios.$get('/user-members/users?token='+request.token+
          '&provider='+request.provider)
          .then((response)=>{
            context.commit('allUsers',response.data);
          })
          .catch((error)=>{
            window.location='/admin/invalidToken';
          });
      }else{
        window.location='/admin/invalidToken';
      }
    },
    AllUserByName(context,char){
      let request={token:"",provider:""};

      //todo:call mutation and pass object data
      //todo:should make axios request to get user object
      //todo:make an api in back to return full user object
      if(localStorage.hasOwnProperty('token')
        && localStorage.hasOwnProperty('provider')){

        request.token=localStorage.getItem("token");
        request.provider=localStorage.getItem("provider");

        axios.get('/user-members/getUserByCharFromFName/'+char+'?token='+request.token+
          '&provider='+request.provider)
          .then((response)=>{
            context.commit('allUserByCharFname',response.data);
          })
          .catch((error)=>{
            window.location='/admin/invalidToken';
          });
      }else{
        window.location='/admin/invalidToken';
      }
    },
  },
  mutations: {
  },
  getters: {
  }
}

export default modulePost;
