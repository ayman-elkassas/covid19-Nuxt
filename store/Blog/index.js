const moduleBlog = {
  state: () => ({
    Userblogs:[],
  }),
  actions: {
    AllBlogs(context){
      this.$axios.$get('/user-story/story')
        .then((response)=>{
          context.commit('userBlogs',response.reverse());
        })
        .catch((error)=>{
          console.log("AllBlogs")
          // window.location='/error';
        });
    },
  },
  mutations: {
    userBlogs(state,data){
      return state.Userblogs=data;
    },
  },
  getters: {
    getBlogs(state){
      return state.Userblogs;
    },
  }
}

export default moduleBlog;
