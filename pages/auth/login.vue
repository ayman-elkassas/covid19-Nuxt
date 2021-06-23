<template>
  <div class="auth-content">
    <h4 class="mb-4 f-w-400">Sign in</h4>

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
        <vs-radio v-model="request.role" val="1">
          Patient
        </vs-radio>
      </vs-col>
      <vs-col w="6">
        <vs-radio v-model="request.role" val="2">
          Doctor
        </vs-radio>
      </vs-col>
    </vs-row>
    <br>

    <button class="btn btn-block btn-primary mb-0" :disabled="!activeSignIn" @click="Login()">Sign in</button>
    <div class="text-center">
      <div class="saprator my-4"><span>OR</span></div>
<!--      <button class="btn text-white bg-facebook mb-2 mr-2  wid-40 px-0 hei-40 rounded-circle"><i class="bx bxl-facebook"></i></button>-->
<!--      <button class="btn text-white bg-googleplus mb-2 mr-2 wid-40 px-0 hei-40 rounded-circle"><i class="bx bxl-google-plus"></i></button>-->
<!--      <button class="btn text-white bg-twitter mb-2  wid-40 px-0 hei-40 rounded-circle"><i class="bx bxl-twitter"></i></button>-->
      <p class="mb-2 mt-4 text-muted">Forgot password? <a href="auth-reset-password-img-side.html" class="f-w-400">Reset</a></p>
      <p class="mt-4">Don’t have an account? <nuxt-link to="/auth/signup" class="f-w-400">Signup</nuxt-link></p>
      <p class="mb-0 text-muted">Back to home? <nuxt-link to="/" class="f-w-400">Home</nuxt-link></p>
    </div>
  </div>

</template>

<script>

export default {
  name: "login",
  layout:"AuthLayout/auth",
  middleware:"guest",
  data(){
    return{
      request: {
        email: "",
        password: "",
        role:1,
      },
      active: false,
      color: '#7a76cb',
      token:"",
      provider:"",
      percent: 0,
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
    activeSignIn(){
      return this.validEmail && this.request.password !== '';
    }
  },
  methods:{
    async Login(){

      this.loading = this.$vs.loading({
        progress: this.percent,
        background: this.color,
        color: '#fff'
      })

      this.interval= setInterval(() => {
        if (this.percent <= 100) {
          this.loading.changePercent(`${this.percent++}%`)
        }
      }, 40)

      await this.$axios.$post(`api/auth/login`,this.request).then((res)=> {

        if (typeof res.access_token !== 'undefined') {

          if(this.request.role===1){
            this.$auth.setToken('user', 'Bearer ' + res.access_token)
            this.$auth.setRefreshToken('user', res.refresh_token)
            this.$auth.setUserToken(res.access_token)
          }else if(this.request.role===2) {
            this.$auth.setToken('doctor', 'Bearer ' + res.access_token)
            this.$auth.setRefreshToken('doctor', res.refresh_token)
          }
          this.$axios.setHeader('Authorization', 'Bearer ' + res.access_token)
          this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + res.access_token)
          this.$auth.setUser(res.data);

          // this.$auth.setStrategy("doctor");

          this.openNotification('bottom-right', 'success',
            `<i class='bx bx-select-multiple' ></i>`,
            'Login Successfully',
            'New User added with rules and permissions');

          this.loading.close()
          clearInterval(this.interval)
          this.percent = 0

          this.$router.push({name: 'home-timeline'});

        }else{
          this.openNotification('top-left', 'danger',
            `<i class='bx bxs-bug' ></i>`,
            "Check Inputs",
            'Username or password not matched with account credentials,' +
            'make sure and try again...');
          this.loading.close()
          clearInterval(this.interval)
          this.percent = 0
        }
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
  }
}
</script>

<style scoped>

@import '~assets/nextro/assets/css/style.css';
.vs-input{
  width: 100%;
}

</style>
