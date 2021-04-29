const moduleReports = {
  state: () => ({
    UserReport:[],
  }),
  actions: {
    AllReport(context){

      let payload={}
      payload['id']=this.$auth.user.id;
      payload['role']=this.$auth.user.role

      this.$axios.$get('/report/all-reports/'+JSON.stringify(payload))
        .then((response)=>{
          context.commit('userReport',response.reverse());
        })
        .catch((error)=>{
          console.log("AllReport")
          // window.location='/error';
        });
    },
  },
  mutations: {
    userReport(state,data){
      return state.UserReport=data;
    },
  },
  getters: {
    getReports(state){
      return state.UserReport;
    },
  }
}

export default moduleReports;
