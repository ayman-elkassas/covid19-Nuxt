<template>
  <div class="app">
    <HeaderHome></HeaderHome>
    <MenuHome></MenuHome>
    <div class="nuxt_content">
      <nuxt></nuxt>
    </div>
    <FooterHome></FooterHome>

  </div>
</template>

<script>

import HeaderHome from '~/components/Layout/header-home.vue';
import MenuHome from '~/components/Layout/menu-home.vue';
import FooterHome from '~/components/Layout/footer-home.vue';

export default {
  middleware:"auth",
  head(){
    return{
      link: [
        { rel: 'stylesheet',href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600'}, // Insert in body
      //   { type: 'text/javascript', src: '~assets/home/app-assets/js/core/app-menu.js', async: true, body: true},
      //   { type: 'text/javascript', src: 'http://jquery.org', async: true, body: true}, // Insert in body
      ],
    }
  },
  components: {
    HeaderHome,MenuHome,FooterHome
  }
}
</script>

<style scoped>

.app {
  width: 100%;
  height: 100%;
  font-family: 'Montserrat', Helvetica, Arial, serif;
}

.nuxt_content{
  margin:120px 100px 0 100px;
}

</style>

