<template>
  <div class=" auth-content">
    <h4 class="mb-3 f-w-400">Sign up</h4>
    <div class="center content-inputs">
      <br>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <vs-input
            required autofocus
            v-model="request.email"
            label="Email address"
            placeholder="eric@eric.com">
            <template v-if="validEmail" #message-success>
              Email Valid
            </template>
            <template v-if="!validEmail && request.email !== ''" #message-danger>
              Email Invalid
            </template>
          </vs-input>
        </vs-col>
      </vs-row>
      <br>
      <br>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <vs-input
            type="password"
            v-model="request.password"
            label="Password Account"
            placeholder="password"
            :progress="getProgress">

            <template v-if="getProgress >= 100" #message-success>
              Secure password
            </template>

            <template v-if="getProgress < 40" #message-danger>
              A special character-More than 6 digits-One lower case letter-An uppercase letter-A number
            </template>

          </vs-input>
        </vs-col>
      </vs-row>

    </div>

    <br>

    <vs-row>
      <vs-col w="6">
        <vs-radio v-model="picked" val="1">
          Patient
        </vs-radio>
      </vs-col>
      <vs-col w="6">
        <vs-radio v-model="picked" val="2">
          Doctor
        </vs-radio>
      </vs-col>
    </vs-row>
    <br>


    <button class="btn btn-primary btn-block mb-4" :disabled="!activeSignUp" @click="openLoading()">Sign up</button>
    <div class="text-center">
      <div class="saprator my-4"><span>OR</span></div>
<!--      <button class="btn text-white bg-facebook mb-2 mr-2  wid-40 px-0 hei-40 rounded-circle"><i class="bx bxl-facebook"></i></button>-->
<!--      <button class="btn text-white bg-googleplus mb-2 mr-2 wid-40 px-0 hei-40 rounded-circle"><i class="bx bxl-google-plus"></i></button>-->
<!--      <button class="btn text-white bg-twitter mb-2  wid-40 px-0 hei-40 rounded-circle"><i class="bx bxl-twitter"></i></button>-->
      <p class="mt-4">Already have an account? <nuxt-link to="/auth/login" class="f-w-400">Signin</nuxt-link></p>
      <p class="mb-0 text-muted">Back to home? <nuxt-link to="/" class="f-w-400">Home</nuxt-link></p>
    </div>

    <div >
      <vs-dialog prevent-close blur v-model="active">

        <complete-info :role="picked" :email="request.email" :password="request.password"></complete-info>

      </vs-dialog>
    </div>


  </div>
</template>

<!--role:2 doctor-->
<!--role:2 patient-->

<script>
import CompleteInfo from "@/pages/auth/completeInfo";
export default {
  name: "signup",
  components: {CompleteInfo},
  layout:"AuthLayout/auth",
  data(){
    return{
      active: false,
      request: {
        email: "",
        password: "",
      },
      picked:1,
    }
  },
  computed:{
    validEmail() {
      this.emailValid=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.request.email)
      return this.emailValid;
    },
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.request.password)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.request.password)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.request.password)) {
        progress += 20
      }

      // more than 5 digits

      if (this.request.password.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.request.password)) {
        progress += 20
      }

      this.passwordValid=progress;
      return progress
    },
    activeSignUp(){
      return this.validEmail && this.request.password !== '';
    }
  },
  methods:{
    openLoading() {
      this.active=true;
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
  }
}
</script>

<style scoped>

@import '~assets/nextro/assets/css/style.css';
.vs-input{
  width: 100%;
}
</style>
