const modulePost = {
  state: () => ({
    Userposts:[],
  }),
  actions: {
    AllPostById(context,user_id){
      this.$axios.$get('/user-post/getAllPostByUserId/'+user_id)
        .then((response)=>{
          context.commit('userPosts',response);
        })
        .catch((error)=>{
          window.location='/error';
        });
    },
  },
  mutations: {
    userPosts(state,data){
      return state.Userposts=data;
    },
  },
  getters: {
    getPostsByUserId(state){
      return state.Userposts;
    },
  }
}

export default modulePost;
