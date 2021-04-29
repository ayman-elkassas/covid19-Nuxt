<template>
  <div>
      <vs-navbar
        style="z-index: 9999;"
        padding-scroll square
        fixed shadow-scroll center-collapsed v-model="active"
      >
        <template #left>
          <img src="/logo2.png" alt="">
        </template>
        <template>
          <vs-navbar-item
            to="/home/profile"
            :active="active === 'guide'" id="guide">
            <vs-avatar v-if="!($auth.user.avatar!='' || $auth.user.avatar!=null)" badge badge-color="success" history primary>
              <img :src="$get('PREFIX')+$auth.user.avatar" alt="">
              <template #badge>
                {{$auth.user.fname[0] + $auth.user.lname[0]}}
              </template>
            </vs-avatar>
          </vs-navbar-item>
          <vs-navbar-item
            to="/home/timeline"
            :active="active === 'home'" id="home">
            <i class='bx bx-home'></i>
            Home
          </vs-navbar-item>
          <vs-navbar-item to="/story/blog" :active="active === 'components'" id="components">
            <i class='bx bx-album'></i>
            Covid Blogs
          </vs-navbar-item>
          <vs-navbar-item to="/info/" :active="active === 'measure'" id="measure">
            <i class='bx bx-book'></i>
            Precautionary measures
          </vs-navbar-item>
          <vs-navbar-item to="/report/" :active="active === 'report'" id="report">
            <i class='bx bx-alarm'></i>
            Doctor Report
          </vs-navbar-item>
          <vs-navbar-item to="/home/profile" :active="active === 'comp'" id="comp">
            <i class='bx bx-user'></i>
            Profile
          </vs-navbar-item>
          <vs-navbar-item :active="active === 'lice'" id="lice">
            <i class='bx bx-book'></i>
            Licence
          </vs-navbar-item>
          <vs-navbar-item :active="active === 'copy'" id="copy">
            <i class='bx bx-book'></i>
            Components
          </vs-navbar-item>
        </template>
        <template v-if="authenticate" #right>
          <vs-button @click="logout()" flat>Logout</vs-button>
          <vs-button to="/home/profile" primary circle>{{$auth.user.fname}} {{$auth.user.lname}}</vs-button>
        </template>
        <template v-else #right>
          <vs-button flat to="/auth/login">Login</vs-button>
        </template>
      </vs-navbar>

    </div>
</template>

<script>
export default {
  name: "header-home",
  data(){
    return {
      active: 'home',
      authenticate:this.$auth.loggedIn,
    }
  },
  methods:{
    logout(){
      this.$auth.logout();
    },
  }
}
</script>

<style scoped>

.child{
  //width: 100%;
  //height:100vh;
}

</style>
