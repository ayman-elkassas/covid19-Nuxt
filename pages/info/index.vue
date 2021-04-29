<template>
  <div>

    <br>
    <vs-button
      @click="show=!show"
    >
      Create new
    </vs-button>
    <br>

    <div v-for="info in getInfo">
      <vs-alert progress="70" >
        <template #icon>
          <i class='bx bxs-chat'></i>
        </template>
        <template #title>
          {{info.title}}
        </template>
        {{info.desc.replace(/<[^>]*>/g, '')}}
      </vs-alert>
      <br>
    </div>

    <div v-if="getInfo.length<=0">
      <vs-alert :page.sync="page" >
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

    <div class="center">
      <vs-dialog v-model="show">
        <template #header>
          <h4 class="not-margin">
            Add Your Info <b>With Corona Virus</b>
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
            <vs-button @click="addInfo()" block>
              Add Covid Info
            </vs-button>
          </div>
        </template>
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
      page:1,
      request:{
        title:"",
        desc:""
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
    this.$store.dispatch("AllInfo");
  },
  computed:{
    getInfo(){
      //todo:last step render value to component
      let obj=this.$store.getters.getInfo;
      if(obj===undefined){
        return [];
      }
      return obj;
    },
  },
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
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
    addInfo()
    {
      if(this.request.title!=="" && this.request.desc!==""){

        this.$axios.$post('/user/info',this.request)
          .then((response)=>{
            this.openNotification('top-right', 'success',
              `<i class='bx bx-select-multiple' ></i>`,
              'Add New Story Successfully',
              'New Admin added with rules and permissions');
            this.show=false;
            this.$store.dispatch("AllInfo");

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
  }
}
</script>

<style scoped>

</style>
