const modulePost = {
  state: () => ({
    Userposts:[],
    ownPosts:[]
  }),
  actions: {
    AllPostById(context,user_id){
      let payload={}
      payload['user_id']=user_id;
      payload['role']=this.$auth.user.role

      // console.log(payload)

      this.$axios.$get('/user-post/getAllPostByUserId/'+JSON.stringify(payload))
        .then((response)=>{
          context.commit('userPosts',response.reverse());
        })
        .catch((error)=>{
          // console.log("AllPostById")
          // window.location='/error';
        });
    },
    OwnPostsById(context,user_id){
      let data={}
      data['user_id']=user_id;
      data['role']=this.$auth.user.role

      console.log(data);

      this.$axios.$get('/user/getPost/'+JSON.stringify(data))
        .then((response)=>{
          context.commit('ownUserPosts',response.reverse());
        })
        .catch((error)=>{
          console.log("AllOwnPostById")
          // window.location='/error';
        });
    },
  },
  mutations: {
    userPosts(state,data){
      return state.Userposts=data;
    },
    ownUserPosts(state,data){
      return state.ownPosts=data;
    },
  },
  getters: {
    getPostsByUserId(state){
      return state.Userposts;
    },
    getOwnPostsByUserId(state){
      return state.ownPosts;
    },
  }
}

export default modulePost;
