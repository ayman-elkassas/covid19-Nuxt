<template>
  <div>
    <vs-sidebar
      fixed="true"
      hover-expand
      reduce
      v-model="active"
      open
      danger
    >
      <template  #logo>
        <nuxt-link style="margin-left: 5px;" to="/">
          <img src="~/assets/home/app-assets/images/logo/covid.png" alt="">
        </nuxt-link>
      </template>
      <vs-sidebar-item
        to="/home/timeline"
        id="home">
        <template #icon>
          <i class='bx bx-home'></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item
        to="/story/blog"
        id="blog">
        <template #icon>
          <i class='bx bxl-blogger'></i>
        </template>
        Covid Blogs
      </vs-sidebar-item>
      <vs-sidebar-item to="/info/" id="donate">
        <template #icon>
          <i class='bx bxs-donate-heart' ></i>
        </template>
        Precaution measures
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class='bx bx-code-alt' ></i>
            </template>
            Coding
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item id="github">
          <template #icon>
            <i class='bx bxl-github' ></i>
          </template>
          Github
        </vs-sidebar-item>
        <vs-sidebar-item id="codepen">
          <template #icon>
            <i class='bx bxl-codepen'></i>
          </template>
          Codepen
        </vs-sidebar-item>
        <vs-sidebar-item id="discord">
          <template #icon>
            <i class='bx bxl-discord'></i>
          </template>
          Discord
        </vs-sidebar-item>
        <vs-sidebar-item id="Javascript">
          <template #icon>
            <i class='bx bxl-javascript' ></i>
          </template>
          Javascript
        </vs-sidebar-item>
        <vs-sidebar-item id="git">
          <template #icon>
            <i class='bx bxl-git' ></i>
          </template>
          Git
        </vs-sidebar-item>
      </vs-sidebar-group>

      <vs-sidebar-item to="/home/profile" id="profile">
        <template #icon>
          <i class='bx bx-user'></i>
        </template>
        Profile
      </vs-sidebar-item>
      <vs-sidebar-item to="/report/" id="report">
        <template #icon>
          <i class='bx bx-book' ></i>
        </template>
        Doctor Reports
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        <template #icon>
          <i class='bx bx-adjust' ></i>
        </template>
        Adjust
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        <template #icon>
          <i class='bx bx-analyse' ></i>
        </template>
        Analyse
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        <template #icon>
          <i class='bx bx-archive' ></i>
        </template>
        Archive
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar style="margin-left:3px" badge-color="danger" badge-position="top-right">
            <i class='bx bx-bell' ></i>
            <template #badge>
              28
            </template>
          </vs-avatar>
          <vs-avatar v-if="$auth.user.avatar!='' || $auth.user.avatar!=null" style="margin-left:3px" history badge primary badge-color="success">
            <img :src="$get('PREFIX')+$auth.user.avatar" alt="">
          </vs-avatar>
          <vs-avatar v-else style="margin-left:3px" history badge primary badge-color="success">
            <img src="~/assets/LandingStyle/images/gfx/gfx-b.png" alt="">
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
export default {
  data:() => ({
    active: 'home',
  })
}
</script>
