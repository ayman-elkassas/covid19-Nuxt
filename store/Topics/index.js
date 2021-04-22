const moduleTopic = {
  state: () => ({
    categoryWithFields:[],
    skills:[],
  }),
  actions: {
    AllCategoriesWithFields(context){
      let request={token:"",provider:""};

      //todo:call mutation and pass object data
      //todo:should make axios request to get user object
      //todo:make an api in back to return full user object
      if(localStorage.hasOwnProperty('token')
        && localStorage.hasOwnProperty('provider')){

        request.token=localStorage.getItem("token");
        request.provider=localStorage.getItem("provider");

        axios.get('/user-members/category?token='+request.token+
          '&provider='+request.provider)
          .then((response)=>{
            context.commit('categoryWithFields',response.data);
          })
          .catch((error)=>{
            window.location='/admin/invalidToken';
          });
      }else{
        window.location='/admin/invalidToken';
      }
    },
    AllSkills(context){
      let request={token:"",provider:""};

      //todo:call mutation and pass object data
      //todo:should make axios request to get user object
      //todo:make an api in back to return full user object
      if(localStorage.hasOwnProperty('token')
        && localStorage.hasOwnProperty('provider')){

        request.token=localStorage.getItem("token");
        request.provider=localStorage.getItem("provider");

        axios.get('/user-members/skill?token='+request.token+
          '&provider='+request.provider)
          .then((response)=>{
            context.commit('allSkills',response.data);
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
    categoryWithFields(state,data){
      return state.categoryWithFields=data;
    },
    allSkills(state,data){
      return state.skills=data;
    },
  },
  getters: {
    getCategoriesWithFields(state){
      return state.categoryWithFields;
    },
    getSkills(state){
      return state.skills;
    },
  }
}

export default moduleTopic;
