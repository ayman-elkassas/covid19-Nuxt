<template>
  <div>
    <vs-row>
      <vs-col v-for="blog in getBlogs" vs-type="flex" vs-justify="center" vs-align="center" w="4">
        <vs-card>
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
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: "blog",
  layout: "Home/home",
  data:() => ({

  }),
  beforeCreate() {
    this.$store.dispatch("AllBlogs");
  },
  computed:{
    getBlogs(){
      //todo:last step render value to component
      return this.$store.getters.getBlogs;
    },
  },
}
</script>

<style scoped>

</style>
