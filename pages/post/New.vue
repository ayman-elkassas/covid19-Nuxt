<template>
  <div class="card">
    <div class="card-header">
      <template>
        <div class="center">
          <vs-alert color="warn">
            <template #title>
              <span>
                  <i class='bx bx-plus' ></i> Add New Post
              </span>
            </template>
            Admin can control between all users can share any information
          </vs-alert>
        </div>
      </template>
    </div>
    <div class="card-body">

      <div class="center grid">

        <br>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
            <vs-input v-model="request.postTitle"
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
              <ckeditor-nuxt v-model="request.postDesc" :config="editorConfig"  />
            </client-only>
          </vs-col>
        </vs-row>
        <br>

        <vs-row w="12">
          <vs-col w="12">
            <file-pond
              name="test"
              ref="pond"
              class-name="my-pond"
              label-idle="Add Post Cover..."
              v-bind:allow-multiple="false"
              allowDrop="true"
              allowPaste="true"
              allowReplace="true"
              allowRevert="true"
              allowRemove="true"
              allowFileEncode="true"
              v-on:addfile="coverAdd"
              accepted-file-types="image/jpeg, image/png, image/jpg"
              v-on:removefile="coverRemove"
            />
          </vs-col>
        </vs-row>

        <vs-row justify="space-between">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
            <div>
              <vs-button
                relief
                block
                success
                ref="button1"
                @click="addPost()"
              >
                <i class='bx bx-plus' ></i>Add New Post
              </vs-button>

            </div>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>

</template>

<script>

import * as FilePond from "filepond";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";

FilePond.registerPlugin(FilePondPluginMediaPreview);

export default {
  name: "New",
  layout: "Home/home",
  data: () => ({
    char: "",
    fieldChar: "",
    request: {
      Uid:"",
      postTitle: "",
      postType: 1,
      postDesc: "",
      postCover: "",
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
    status: 0,
  }),
  created() {
    this.status = this.$route.params.status;
  },
  methods: {
    openNotification(position = null, border, icon, title, text) {
      const noti = this.$vs.notification({
        border,
        icon,
        position,
        title: title,
        text: text
      })
    },
    addPost(){
      if(this.request.postTitle!=="" && this.request.postType!==""
        && this.request.postDesc!=="" && this.request.postCover!==""){

        this.request.Uid=this.$auth.user.id;

        const loading = this.$vs.loading({
          target: this.$refs.button1,
          scale: '0.6',
          background: 'success',
          opacity: 1,
          color: '#fff'
        })

        this.$axios.$post('/user-post/posts',this.request)
          .then((response)=>{
            this.openNotification('top-right', 'success',
              `<i class='bx bx-select-multiple' ></i>`,
              'Add New Post Successfully',
              'New Admin added with rules and permissions');

            this.$router.push({name: 'home/timeline'});

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
    fileRemove:function () {
      this.imgUpload=false;
      this.request.attachments=[]
    },
    fileAdd:function (error,file){
      if (error) {
        console.log('Oh no');
        return;
      }

      //todo: 1000000 Byte = 1MB
      //todo: max size is 15MB
      if(file.fileSize <15000000){
        this.request.attachments.push(file.getFileEncodeDataURL());
        this.imgUpload=true;
      }
      else{
        this.openNotification('top-left', 'danger',
          `<i class='bx bxs-bug' ></i>`,
          'Avatar size is large',
          'Upload image with minimal of 15 MB...');
      }
    },
    coverAdd(error,file){
      if (error) {
        console.log('Oh no');
        return;
      }

      //todo: 1000000 Byte = 1MB
      //todo: max size is 15MB
      if(file.fileSize <6000000){
        this.request.postCover=file.getFileEncodeDataURL();
        this.imgUpload=true;
      }
      else{
        this.openNotification('top-left', 'danger',
          `<i class='bx bxs-bug' ></i>`,
          'Cover size is large',
          'Upload image with minimal of 6 MB...');
      }
    },
    coverRemove(){
      this.imgUpload=false;
      this.request.postCover=""
    }
  },
  components: {
    FilePondPluginMediaPreview,
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
}

</script>

<style scoped>
.card-header{
  display: block;
}
</style>
