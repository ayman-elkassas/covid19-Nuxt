<template>
  <div>
    <br>
    <vs-button
      v-if="$auth.user.role===2"
      @click="show=!show"
    >
      Create new
    </vs-button>
    <br>
    <vs-row>
      <vs-col key="0" v-for="report in getReports" vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <vs-card type="3">
          <template #title>
            <div class="d-flex justify-content-start align-items-center mb-1">
              <div class="avatar mr-1">
                <vs-avatar circle badge badge-color="success">
                  <img :src="$get('PREFIX')+report.avatar" alt="">
                </vs-avatar>
              </div>
              <div class="profile-user-info">
                <h6 class="mb-0">{{ report.fname[0] + "."+report.lname}}</h6>
                <small class="text-muted">{{moment(report.create_at).startOf('minute').fromNow() }}</small>
              </div>
            </div>
            <h3>{{ report.pivot.title }}</h3>
          </template>
          <template #img>
            <img src="~/assets/LandingStyle/images/gfx/page-head.png" alt="">
          </template>
          <template #text>
            <p>
              {{report.pivot.desc.replace(/<[^>]*>/g, '')}}
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
        <br>
      </vs-col>
      <div v-if="getReports.length<=0">
        <vs-alert warn :page.sync="page" >
          <template #title>
            No Reports Yet
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

    <div class="center">
      <vs-dialog v-model="show">
        <template #header>
          <h4 class="not-margin">
            Search with name to<b> Assign your report patient</b>
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

          <br>
          <br>

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
                <div  class="avatar mr-75">
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
                    <div  class="profile-user-info">
                      <h6 class="mb-0">{{ user.fname + " "+user.lname}}</h6>
                      <small class="text-muted">6 Mutual Friends</small>
                    </div>
                  </vs-col>
                  <vs-col vs-type="flex" w="2">
                    <vs-button
                      icon
                      @click="addReport(user.id)"
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


  </div>
</template>

<script>
export default {
  name: "index",
  layout: "Home/home",
  data(){
    return{
      show:false,
      char:"",
      page:1,
      selectLoading:false,
      request:{
        title:"",
        desc:"",
        user_id:"",
        role:"",
        doctor_id:this.$auth.user.id,
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
    this.$store.dispatch("AllReport");
    this.$store.dispatch("AllUserByName","a");
  },
  computed:{
    getReports(){
      //todo:last step render value to component
      let obj=this.$store.getters.getReports;
      if(obj.length<=0){
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
  methods:{
    openNotification(position = null, border, icon, title, text) {
      const noti = this.$vs.notification({
        border,
        icon,
        position,
        title: title,
        text: text
      })
    },
    addReport($id)
    {
      if(this.request.title!=="" && this.request.desc!==""){

        this.request.user_id=$id;
        this.request.role=this.$auth.user.role;

        this.$axios.$post('/report/all-reports',this.request)
          .then((response)=>{
            this.openNotification('top-right', 'success',
              `<i class='bx bx-select-multiple' ></i>`,
              'Add New Report Successfully',
              'New Admin added with rules and permissions');
            this.show=false;
            this.$store.dispatch("AllReport");

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
  watch:{
    char(newVal,oldVal){
      newVal===""?this.$store.dispatch("AllUserByName","a"):
        this.$store.dispatch("AllUserByName",newVal);
    },
  },
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
}
</script>

<style scoped>

</style>
