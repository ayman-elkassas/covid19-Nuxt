<template>
  <div>
    <form-wizard
      @on-complete="onComplete"
      title="Complete Register Information"
      finish-button-text="Sign Up"
      color="#195bff"
    >
      <tab-content
        title="Personal details"
      >
        <div>
          <vs-row>
            <vs-col style="margin-right: 40px" vs-type="flex" vs-justify="center" vs-align="center" w="5">
              <vs-input v-model="request.fname" placeholder="First Name">
                <template #message-danger>
                  Required
                </template>
              </vs-input>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5">
              <vs-input v-model="request.lname" placeholder="Last Name">
                <template #message-danger>
                  Required
                </template>
              </vs-input>
            </vs-col>
          </vs-row>
          <br>
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
              <vs-input
                v-model="request.phone"
                type="number"
                placeholder="phone no."
              >
                <template #icon>
                  <i class='bx bx-phone'></i>
                </template>
              </vs-input>
            </vs-col>
          </vs-row>
        </div>
      </tab-content>
      <tab-content title="Upload Avatar">
        <file-pond
          name="test"
          label-idle="Add Avatar..."
          v-bind:allow-multiple="true"
          allowDrop="true"
          allowPaste="true"
          allowReplace="true"
          allowRevert="true"
          allowRemove="true"
          maxFiles="1"
          accepted-file-types="image/jpeg, image/png, image/jpg"
          allowFileEncode="true"
          v-on:init="handleFilePondInit"
          v-on:addfile="fileAdd"
          v-on:removefile="fileRemove"
        />
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>

export default {
  name: "completeInfo",
  data(){
    return{
      request:{
        fname:"",
        lname:"",
        email:"",
        password:"",
        phone:"",
        avatar:"",
        role:""
      },
      color: '#7a76cb',
    }
  },
  props: {
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
  },
  methods:{
    handleFilePondInit: function() {
      console.log('FilePond has initialized');
    },
    fileAdd:function (error,file){
      if (error) {
        console.log('Oh no');
        return;
      }

      if(file.fileSize <5000000){
        this.request.avatar=file.getFileEncodeDataURL();
        this.disable=false;
      }
      else{
        this.openNotification('top-left', 'danger',
          `<i class='bx bxs-bug' ></i>`,
          'Avatar size is large',
          'Upload image with minimal of 6 MB...');
      }
    },
    addAvatar(){
      if(this.request.avatar!==''){
        this.active=false;
      }
    },
    fileRemove:function () {
      this.disable=true;
    },
    //todo:async for implement next code not wait execute this func
    register: async function () {
      this.loading = this.$vs.loading({
        percent: this.percent,
        background: this.color,
        color: '#fff'
      })

      this.interval = setInterval(() => {
        if (this.percent <= 100) {
          this.loading.changePercent(`${this.percent++}%`)
        }
      }, 40)

      this.request.email = this.$props.email;
      this.request.password = this.$props.password;

      //todo:await for wait to execute
      await this.$axios.$post(`api/auth/registerUser`, this.request).then((res) => {

        if (typeof res.access_token !== 'undefined') {
          this.$auth.setUserToken(res.access_token, true)
        }

        this.openNotification('bottom-right', 'success',
          `<i class='bx bx-select-multiple' ></i>`,
          'Login Successfully',
          'New User added with rules and permissions');

        this.loading.close()
        clearInterval(this.interval)
        this.percent = 0

        this.$router.push({name: "home-timeline", params: {completeSkills: true}});

      }).catch((error) => {
        this.openNotification('top-left', 'danger',
          `<i class='bx bxs-bug' ></i>`,
          error,
          'Username or password not matched with account credentials,' +
          'make sure and try again...');
        this.loading.close()
        clearInterval(this.interval)
        this.percent = 0
      });
    },
    openNotification(position = null, border,icon,title,text) {
      const noti = this.$vs.notification({
        border,
        icon,
        progress: 'auto',
        position,
        title:title ,
        text:text
      })
    },
    onComplete(){
      this.register();
    }
  }

}
</script>

<style scoped>

</style>
