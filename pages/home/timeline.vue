<template>
  <div>
    <!-- BEGIN: Content-->
    <div class="app-content content ">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-body"><div id="user-profile">
          <!-- profile info section -->
          <div data-v-07507170="" data-v-7b339cf2="" class="profile-header-nav">
            <nav data-v-07507170="" data-v-7b339cf2="" class="nav-back navbar navbar-expand-md navbar-light justify-content-end justify-content-md-between w-100">
              <button  data-v-07507170="" data-v-7b339cf2="" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="btn btn-icon navbar-toggler">
                <i data-v-07507170="" data-v-7b339cf2="" data-feather="align-justify" class="font-medium-5"></i>
              </button> <div data-v-07507170="" data-v-7b339cf2="" id="navbarSupportedContent" class="collapse navbar-collapse">
              <div data-v-07507170="" data-v-7b339cf2="" class="buttons-timeline profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                <vs-button
                  flat
                  icon
                  @click="show=true"
                >
                  <i class="bx bxs-paper-plane"></i>&nbsp;  Story
                </vs-button>

                <vs-button
                  flat
                  icon
                  @click="addPost()"
                >
                  <i class='bx bxs-message-add'></i>&nbsp; Post
                </vs-button>

                <vs-button
                  flat
                  icon
                  @click="show1=true"
                >
                  <i class='bx bxs-user-check'></i>&nbsp; Follow
                </vs-button>
              </div>
            </div>
            </nav>
          </div>
          <section id="profile-info">
            <div class="row">
              <!-- left profile info section -->
              <div class="col-lg-3 col-12 order-2 order-lg-1">
                <!-- twitter feed card -->
                <div class="card">
                  <div class="card-body">
                    <h5>Covid19 Feeds</h5>
                    <!-- twitter feed -->
                    <div v-for="blog in getBlogs" class="profile-twitter-feed mt-1">
                      <div v-if="blog.blog_user!==null" class="d-flex justify-content-start align-items-center mb-1">
                        <div class="avatar mr-1">
                          <img :src="$get('PREFIX')+blog.blog_user.avatar" alt="" height="40" width="40">
                        </div>
                        <div class="profile-user-info">
                          <h6 class="mb-0">{{ blog.blog_user.fname + " "+blog.blog_user.lname}}</h6>
                          <a href="javascript:void(0)">
                            <small class="text-muted">{{moment(blog.blog_user.create_at).startOf('minute').fromNow() }}</small>
                            <i data-feather="check-circle"></i>
                          </a>
                        </div>
                        <div class="profile-star ml-auto">
                          <i data-feather="star" class="font-medium-3"></i>
                        </div>
                      </div>
                      <div v-else-if="blog.blog_doctor!==null" class="d-flex justify-content-start align-items-center mb-1">
                        <div class="avatar mr-1">
                          <img :src="$get('PREFIX')+blog.blog_doctor.avatar" alt="" height="40" width="40">
                        </div>
                        <div class="profile-user-info">
                          <h6 class="mb-0">{{ blog.blog_doctor.fname + " "+blog.blog_doctor.lname}}</h6>
                          <a href="javascript:void(0)">
                            <small class="text-muted">{{moment(blog.blog_doctor.create_at).startOf('minute').fromNow() }}</small>
                            <i data-feather="check-circle"></i>
                          </a>
                        </div>
                        <div class="profile-star ml-auto">
                          <i data-feather="star" class="font-medium-3"></i>
                        </div>
                      </div>
                      <p class="card-text mb-50">{{ blog.title }}</p>
                      <a href="javascript:void(0)">
                        <small>#covid19 #stories</small>
                      </a>
                    </div>
                    <div v-if="getBlogs.length<=0">
                      <p class="card-text mb-50">No blogs yet</p>
                    </div>
                  </div>
                </div>
                <!--/ twitter feed card -->
              </div>
              <!--/ left profile info section -->

              <!-- center profile info section -->
              <div class="col-lg-6 col-12 order-1 order-lg-2">
                <!-- post 1 -->
                <div v-for="post in getPostsByUserId" class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-start align-items-center mb-1">
                      <!-- avatar -->
                      <div class="avatar mr-1">
                        <vs-avatar v-if="!($auth.user.avatar=='' || $auth.user.avatar==null)" circle badge badge-color="success">
                          <img :src="$get('PREFIX')+$auth.user.avatar" alt="">
                        </vs-avatar>
                        <vs-avatar v-else circle badge badge-color="success">
                          <img src="~/assets/home/app-assets/images/avatars/2.png" alt="">
                        </vs-avatar>
                      </div>
                      <!--/ avatar -->
                      <div class="profile-user-info">
                        <h6 class="mb-0">{{post.title}}</h6>
                        <small class="text-muted">{{moment(post.create_at).startOf('minute').fromNow() }}</small>
                      </div>

<!--                      {{(post.user_id!=null && post.user_id===$auth.user.id)?hideDel(false):hideDel(true)}}-->
<!--                      {{(post.doctor_id!=null && post.doctor_id===$auth.user.id)?hideDel(false):hideDel(true)}}-->
                    </div>
                    <p class="card-text">
                      {{post.desc.replace(/<[^>]*>/g, '')}}
                    </p>
                    <!-- post img -->
                    <img
                      v-if="!(post.post_cover==='' || post.post_cover===null)"
                      class="img-fluid rounded mb-75"
                      :src="$get('PREFIX')+post.post_cover"
                      alt="avatar img"
                    />
                    <img
                      v-else
                      class="img-fluid rounded mb-75"
                      src="~/assets/LandingStyle/images/gfx/gfx-b.png"
                      alt="avatar img"
                    />
                    <!--/ post img -->

                    <!-- like share -->
                    <div class="row d-flex justify-content-start align-items-center flex-wrap pb-50">
                      <div class="col-sm-6 d-flex justify-content-between justify-content-sm-start mb-2">
                        <a href="javascript:void(0)" class="d-flex align-items-center text-muted text-nowrap">
                          <i class="bx bx-heart"></i>
                          <span>&nbsp;1.25k</span>
                        </a>

                        <!-- avatar group with tooltip -->
                        <div class="d-flex align-items-center">
                          <div class="avatar-group ml-1">

                            <vs-avatar-group  max="7">
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-1.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-2.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-3.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-4.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-5.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-4.jpg" alt="">
                              </vs-avatar>
                            </vs-avatar-group>

                          </div>
                          <a href="javascript:void(0)" class="text-muted text-nowrap ml-50">+140 more</a>
                        </div>
                        <!-- avatar group with tooltip -->
                      </div>

                      <!-- share and like count and icons -->
                      <div class="col-sm-6 d-flex justify-content-between justify-content-sm-end align-items-center mb-2">
                        <div>
                          <vs-button
                            icon
                            danger
                            flat
                            @click="deletePost(post.id)"
                          >
                            <i class='bx bxs-trash' ></i>
                          </vs-button>
                        </div>
                      </div>
                      <!-- share and like count and icons -->
                    </div>
                    <!-- like share -->

                    <!-- comments -->
                    <div class="d-flex align-items-start mb-1">
                      <div class="avatar mt-25 mr-75">
                        <vs-avatar>
                          <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-2.jpg" alt="">
                        </vs-avatar>
                      </div>
                      <div class="profile-user-info w-100">
                        <div class="d-flex align-items-center justify-content-between">
                          <h6 class="mb-0">Jackey Potter</h6>
                          <a href="javascript:void(0)">
                            <i data-feather="heart" class="profile-likes font-medium-3"></i>
                            <span class="align-middle text-muted">61</span>
                          </a>
                        </div>
                        <small>
                          Cover your cough or sneeze with a tissue, then throw the tissue in the trash.
                        </small>
                      </div>
                    </div>
                    <!--/ comments -->

                    <!-- comment box -->
                    <fieldset  class="form-label-group mb-75">
                      <textarea  class="form-control" id="label-textarea" rows="3" placeholder="Add Comment"></textarea>
                      <label  for="label-textarea">Add Comment</label>
                    </fieldset>
                    <!--/ comment box -->
                    <button @click="comment()" type="button" class="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </div>
                <div v-if="getPostsByUserId.length<=0">
                  <vs-alert :page.sync="page" >
                    <template #title>
                      No Posts Yet
                    </template>

                    <template #page-1>
                      Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.
                    </template>

                    <template #page-2>
                      Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.
                    </template>

                    <template #page-3>
                      The best way to prevent and slow down transmission is to be well informed about the COVID-19 virus, the disease it causes and how it spreads.
                    </template>
                  </vs-alert>
                </div>
                <!--/ post 1 -->
              </div>
              <!--/ center profile info section -->

              <!-- right profile info section -->
              <div class="col-lg-3 col-12 order-3">
                <!-- suggestion -->
                <div class="card">
                  <div class="card-body">
                    <h5>Suggestions</h5>
                    <div v-for="user in getUsers" class="d-flex justify-content-start align-items-center mt-2">
                        <div v-if="user.id!=$auth.user.id" class="avatar mr-75">
                          <vs-avatar badge badge-color="success" circle>
                            <img
                              :src="$get('PREFIX')+user.avatar"
                              alt="avatar"
                              height="40"
                              width="40"
                            />
                          </vs-avatar>

                        </div>
                        <div v-if="user.id!=$auth.user.id" class="profile-user-info">
                          <h6 class="mb-0">{{ user.fname[0] + "."+user.lname}}</h6>
                          <small class="text-muted">6 Mutual</small>
                        </div>
                        <vs-button
                          v-if="user.id!=$auth.user.id"
                          icon
                          flat

                          @click="follow(user.id,true)"
                        >
                          <i class='bx bx-plus'></i>
                        </vs-button>
                    </div>
                    <div v-if="getUsers.length<=0">
                      <p class="card-text mb-50">No Users yet</p>
                    </div>

                  </div>
                </div>
                <!--/ suggestion -->

              </div>
              <!--/ right profile info section -->
            </div>

            <!-- reload button -->
<!--            <div class="row">-->
<!--              <div class="col-12 text-center">-->
<!--                <button type="button" class="btn btn-sm btn-primary block-element border-0 mb-1">Load More</button>-->
<!--              </div>-->
<!--            </div>-->
            <!--/ reload button -->
          </section>
          <!--/ profile info section -->
        </div>

        </div>
      </div>
    </div>
    <!-- END: Content-->
<!--    story-->
    <div class="center">
      <vs-dialog v-model="show">
        <template #header>
          <h4 class="not-margin">
            Add Your Story <b>With Corona Virus</b>
          </h4>
        </template>

        <div class="con-form">
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
              <vs-input v-model="request.title"
                        label="Post Title"
                        placeholder="What's in your mind?">
                <template #icon>
                  <i class='bx bx-book'></i>
                </template>
              </vs-input>
            </vs-col>
          </vs-row>
          <br>

          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="request.desc" :config="editorConfig"  />
              </client-only>
            </vs-col>
          </vs-row>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button @click="addStory()" block>
              Add Covid Story
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>

    <!--    follow-->
    <div class="center">
      <vs-dialog v-model="show1">
        <template #header>
          <h4 class="not-margin">
            Search with first name <b>follow doctor</b>
          </h4>
        </template>

        <div class="con-form">
          <vs-row w="12">
            <vs-col w="12">
              <vs-input
                label="Search to follow your doctor"
                v-model="char" placeholder="Search By User Name...">
                <template #icon>
                  <i class='bx bx-search'></i>
                </template>
              </vs-input>

              <div v-for="user in getUserByChar" class="d-flex justify-content-start align-items-center mt-2">
                <div v-if="user.role!==$auth.user.role" class="avatar mr-75">
                  <vs-avatar badge badge-color="success" circle>
                    <img
                      :src="$get('PREFIX')+user.avatar"
                      alt="avatar"
                      height="40"
                      width="40"
                    />
                  </vs-avatar>
                </div>
                <vs-row>
                  <vs-col vs-type="flex" w="10">
                    <div v-if="user.role!==$auth.user.role" class="profile-user-info">
                      <h6 class="mb-0">{{ user.fname + " "+user.lname}}</h6>
                      <small class="text-muted">6 Mutual Friends</small>
                    </div>
                  </vs-col>
                  <vs-col vs-type="flex" w="2">
                    <vs-button
                      v-if="user.role!==$auth.user.role"
                      icon
                      @click="follow(user.id)"
                    >
                      <i class='bx bx-plus'></i>
                    </vs-button>
                  </vs-col>
                </vs-row>
              </div>

            </vs-col>
          </vs-row>
          <br>
          <br>
        </div>
      </vs-dialog>
    </div>

    <vs-dialog width="550px" not-center v-model="activeIntro">
      <template #header>
        <h4 class="not-margin">
          Welcome to <b>Vuesax</b>
        </h4>
      </template>

      <div class="con-content">
        <p>
          Vuesax is a relatively new framework with a refreshing design and in the latest trends, vuesax based on vuejs which means that we go hand in hand with one of the most popular javascript frameworks in the world and with a huge community with which you will have all the help and documentation to create and make your project
        </p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="activeIntro=false" transparent>
            Ok
          </vs-button>
        </div>
      </template>
    </vs-dialog>

  </div>
</template>

<script>

export default {
  name: "timeline",
  layout:"Home/home",
  data(){
    return{
      show:false,
      show1:false,
      activeIntro:false,
      selectLoading:false,
      char:"",
      page:1,
      followActive:false,
      hideDelete:false,
      request:{
        title:"",
        desc:"",
        Uid:"",
        role:""
      },
      editorConfig: {
        simpleUpload: {
          uploadUrl: 'path_to_image_controller',
          headers: {
            'Authorization': 'optional_token'
          }
        },
        removePlugins: ['Title'],
      },
    }
  },
  beforeCreate() {
    this.$store.dispatch("AllPostById",this.$auth.user.id);
    this.$store.dispatch("AllBlogs");
    this.$store.dispatch("AllUsers");
    this.$store.dispatch("AllUserByName","a");
  },
  created() {
    // this.activeIntro=true
  },
  computed:{
    getPostsByUserId(){
      //todo:last step render value to component
      let obj= this.$store.getters.getPostsByUserId;
      if(obj===undefined){
        return [];
      }
      return obj;
    },
    getBlogs(){
      //todo:last step render value to component
      let obj= this.$store.getters.getBlogs;
      if(obj===undefined){
        return [];
      }
      return obj;
    },
    getUsers(){
      //todo:last step render value to component
      let obj= this.$store.getters.getUsers;
      if(obj===undefined){
        return [];
      }
      return obj;
    },
    getUserByChar(){
      //todo:last step render value to component
      const allUsers=this.$store.getters.getUserByCharFname;
      allUsers.length>0?this.selectLoading=false:null;
      return allUsers;
    },

  },
  mounted() {
    // localStorage.setItem("role",this.$auth.user.user_role);
  },
  methods:{
    hideDel(flag){
      this.hideDelete=flag;
    },
    openNotification(position = null, border, icon, title, text) {
      const noti = this.$vs.notification({
        border,
        icon,
        position,
        title: title,
        text: text
      })
    },
    comment(){
      this.openNotification('bottom-right', 'success',
        `<i class='bx bx-select-multiple' ></i>`,
        'Add Comment Successfully',
        'New Admin added with rules and permissions');
    },
    addPost(){
      this.$router.push({name: 'post-New',params: { status: 1 }});
    },
    addStory()
    {
      if(this.request.title!=="" && this.request.desc!==""){

        this.request.Uid=this.$auth.user.id;
        this.request.role=this.$auth.user.role;

        this.$axios.$post('/user-story/story',this.request)
          .then((response)=>{
            this.openNotification('top-right', 'success',
              `<i class='bx bx-select-multiple' ></i>`,
              'Add New Story Successfully',
              'New Admin added with rules and permissions');
            this.show=false;
            this.$store.dispatch("AllBlogs");
          })
          .catch((error)=>{
            this.openNotification('top-right', 'danger',
              `<i class='bx bxs-bug' ></i>`,
              'Make Sure From Inputs',
              error);
          });
      }else {
        this.openNotification('top-right', 'danger',
          `<i class='bx bxs-bug' ></i>`,
          'Make Sure From Inputs',
          "Inputs invalid make sure from inputs...");
        // loading.close();
      }
    },
    async follow(id,selfRelation=false){
      let ids={}
      if(this.$auth.user.role===1 && !selfRelation){
        ids['user_id']=this.$auth.user.id;
        ids['doctor_id']=id;
      }else if(this.$auth.user.role===2){
        ids['user_id']=id;
        ids['doctor_id']=this.$auth.user.id;
      }else if(selfRelation){
        ids['user_self']=this.$auth.user.id;
        ids['user_id']=id;
      }

      ids['role']=this.$auth.user.role;
      ids['selfRelation']=selfRelation;

      this.$axios.$get('/user/setDoctorFollow/'+JSON.stringify(ids))
        .then((response)=>{
          this.openNotification('bottom-right', 'success',
            `<i class='bx bx-select-multiple' ></i>`,
            'Now Following Successfully',
            'New Admin added with rules and permissions');

          this.$store.dispatch("AllPostById",this.$auth.user.id);
          // let users=this.getUserByChar
          // await users=users.filter((user)=>{
          //   return user.id!==id
          // })
          // console.table(users)
          this.followActive=true;
        })
        .catch((error)=>{
          this.openNotification('top-right', 'danger',
            `<i class='bx bxs-bug' ></i>`,
            'Make Sure From Inputs',
            error);
        });
    },
    deletePost($id){
      this.$axios.delete('/user-post/posts/'+($id))
        .then((response)=>{
          if(response.data!=="error"){
            this.openNotification('bottom-right',
              'success',
              `<i class='bx bx-select-multiple' ></i>`,
              "Post Is Deleted Successfully",
              "Can add new role will be able to handle new permission and assign users...");
            this.$store.dispatch("AllPostById",this.$auth.user.id);
          }
          else{
            this.openNotification('top-right',
              'danger',
              `<i class='bx bx-select-multiple' ></i>`,
              "Error In Remove",
              "Can add new role will be able to handle new permission and assign users...");
          }
        })
        .catch((error)=>{
          // window.location='/admin/invalidToken';
        });
    }
  },
  watch:{
    char(newVal,oldVal){
      newVal===""?this.$store.dispatch("AllUserByName","a"):
        this.$store.dispatch("AllUserByName",newVal);

      this.selectLoading=true;
    },
  },
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
}
</script>

<style scoped>
.nav-back{
  /*background-color: transparent;*/
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  transition: all .3s ease-in-out,background 0s,color 0s,border-color 0s;
}

.buttons-timeline{
  margin-left:0px ;
}

.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.con-footer .vs-button {
  margin: 0px;
}
.con-footer .vs-button .vs-button__content {
  padding: 10px 30px;
}
.con-footer .vs-button ~ .vs-button {
  margin-left: 10px;
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}
.con-content {
  width: 100%;
}
.con-content p {
  font-size: 0.8rem;
  padding: 0px 10px;
}
.con-content .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-content .vs-input-parent {
  width: 100%;
}
.con-content .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-content .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}

</style>
