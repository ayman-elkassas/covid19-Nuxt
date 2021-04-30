<template>
  <div>
    <br>
    <vs-button
      @click="show=!show"
    >
      Create new
    </vs-button>
    <br>
    <vs-row>
      <vs-col key="0" v-for="blog in getBlogs" vs-type="flex" vs-justify="center" vs-align="center" w="4">
        <vs-card v-if="blog.blog_user!==null">
          <template #title>
            <div class="d-flex justify-content-start align-items-center mb-1">
              <div class="avatar mr-1">
                <vs-avatar circle badge badge-color="success">
                  <img :src="$get('PREFIX')+blog.blog_user.avatar" alt="">
                </vs-avatar>
              </div>
              <div class="profile-user-info">
                <h6 class="mb-0">{{ blog.blog_user.fname + " "+blog.blog_user.lname}}</h6>
                <small class="text-muted">{{moment(blog.blog_user.create_at).startOf('minute').fromNow() }}</small>
              </div>
            </div>
            <h3>{{ blog.title }}</h3>
          </template>
          <template #img>
            <img src="~/assets/LandingStyle/images/blog/blog-c.jpg" alt="">
          </template>
          <template #text>
            <p>
              {{blog.desc.replace(/<[^>]*>/g, '')}}
            </p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class='bx bx-heart'></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class='bx bx-chat' ></i>
              <span class="span">
          54
        </span>
            </vs-button>
          </template>
        </vs-card>
        <vs-card v-else-if="blog.blog_doctor!==null">
          <template #title>
            <div class="d-flex justify-content-start align-items-center mb-1">
              <div class="avatar mr-1">
                <vs-avatar circle badge badge-color="success">
                  <img :src="$get('PREFIX')+blog.blog_doctor.avatar" alt="">
                </vs-avatar>
              </div>
              <div class="profile-user-info">
                <h6 class="mb-0">{{ blog.blog_doctor.fname + " "+blog.blog_doctor.lname}}</h6>
                <small class="text-muted">{{moment(blog.blog_doctor.create_at).startOf('minute').fromNow() }}</small>
              </div>
            </div>
            <h3>{{ blog.title }}</h3>
          </template>
          <template #img>
            <img src="~/assets/LandingStyle/images/blog/blog-c.jpg" alt="">
          </template>
          <template #text>
            <p>
              {{blog.desc.replace(/<[^>]*>/g, '')}}
            </p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class='bx bx-heart'></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class='bx bx-chat' ></i>
              <span class="span">
          54
        </span>
            </vs-button>
          </template>
        </vs-card>
      </vs-col>
      <div v-if="getBlogs.length<=0">
        <vs-alert danger :page.sync="page" >
          <template #title>
            No Blogs Yet
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
    </vs-row>

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


  </div>
</template>

<script>
export default {
  name: "blog",
  layout: "Home/home",
  data:() => ({
    page:1,
    show:false,
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
  }),
  beforeCreate() {
    this.$store.dispatch("AllBlogs");
  },
  computed:{
    getBlogs(){
      //todo:last step render value to component
      let obj=this.$store.getters.getBlogs;
      if(obj.length<=0){
        return [];
      }
      return obj;
    },
  },
  methods:{
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
  },
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },

}
</script>

<style scoped>

</style>
