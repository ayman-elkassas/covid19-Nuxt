<template>
  <div>
    <!-- BEGIN: Content-->
    <div class="app-content content ">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-body"><div id="user-profile">
          <!-- profile header -->
          <div class="row">
            <div class="col-12">
              <div class="card profile-header mb-2">
                <!-- profile cover photo -->
                <img
                  class="card-img-top"
                  src="~/assets/home/app-assets/images/profile/user-uploads/timeline.jpg"
                  alt="User Profile Image"
                />
                <!--/ profile cover photo -->

                <div class="position-relative">
                  <!-- profile picture -->
                  <div class="profile-img-container d-flex align-items-center">
                    <div v-if="!($auth.user.avatar==='' || $auth.user.avatar==null)" class="profile-img">
                      <img
                        :src="$get('PREFIX')+$auth.user.avatar"
                        class="rounded img-fluid"
                        alt="Card image"
                      />
                    </div>
                    <div v-else class="profile-img">
                      <img
                      src="~/assets/home/app-assets/images/avatars/2.png"
                      class="rounded img-fluid"
                      alt="Card image"
                      />
                    </div>
                    <!-- profile title -->
                    <div class="profile-title ml-3">
                      <h2 class="text-white">{{ $auth.user.fname }} {{$auth.user.lname}}</h2>
                      <p v-if="$auth.user.role===1" class="text-white">Patient</p>
                      <p v-else-if="$auth.user.role===2" class="text-white">Doctor</p>
                    </div>
                  </div>
                </div>

                <!-- tabs pill -->
                <div class="profile-header-nav">
                  <!-- navbar -->
                  <nav class="navbar navbar-expand-md navbar-light justify-content-end justify-content-md-between w-100">
                    <button
                      class="btn btn-icon navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <i data-feather="align-justify" class="font-medium-5"></i>
                    </button>

                    <!-- collapse  -->
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <div class="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                        <ul class="nav nav-pills mb-0">
                          <li class="nav-item">
                            <a class="nav-link font-weight-bold active" href="javascript:void(0)">
                              <span class="d-none d-md-block">Feed</span>
                              <i data-feather="rss" class="d-block d-md-none"></i>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link font-weight-bold" href="javascript:void(0)">
                              <span class="d-none d-md-block">About</span>
                              <i data-feather="info" class="d-block d-md-none"></i>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link font-weight-bold" href="javascript:void(0)">
                              <span class="d-none d-md-block">Photos</span>
                              <i data-feather="image" class="d-block d-md-none"></i>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link font-weight-bold" href="javascript:void(0)">
                              <span class="d-none d-md-block">Friends</span>
                              <i data-feather="users" class="d-block d-md-none"></i>
                            </a>
                          </li>
                        </ul>
                        <!-- edit button -->
                        <button class="btn btn-primary">
                          <i data-feather="edit" class="d-block d-md-none"></i>
                          <span class="font-weight-bold d-none d-md-block">Edit</span>
                        </button>
                      </div>
                    </div>
                    <!--/ collapse  -->
                  </nav>
                  <!--/ navbar -->
                </div>
              </div>
            </div>
          </div>
          <!--/ profile header -->

          <!-- profile info section -->
          <section id="profile-info">
            <div class="row">
              <!-- left profile info section -->
              <div class="col-lg-3 col-12 order-2 order-lg-1">
                <!-- twitter feed card -->
                <div class="card">
                  <div class="card-body">
                    <h5>Twitter Feeds</h5>
                    <!-- twitter feed -->
                    <div class="profile-twitter-feed mt-1">
                      <div class="d-flex justify-content-start align-items-center mb-1">
                        <div class="avatar mr-1">
                          <img src="~/assets/home/app-assets/images/avatars/5-small.png" alt="avatar img" height="40" width="40" />
                        </div>
                        <div class="profile-user-info">
                          <h6 class="mb-0">Gertrude Stevens</h6>
                          <a href="javascript:void(0)">
                            <small class="text-muted">@tiana59</small>
                            <i data-feather="check-circle"></i>
                          </a>
                        </div>
                        <div class="profile-star ml-auto">
                          <i data-feather="star" class="font-medium-3"></i>
                        </div>
                      </div>
                      <p class="card-text mb-50">I love cookie chupa chups sweet tart apple pie ⭐️ chocolate bar.</p>
                      <a href="javascript:void(0)">
                        <small>#design #fasion</small>
                      </a>
                    </div>
                    <!-- twitter feed -->
                    <div class="profile-twitter-feed mt-2">
                      <div class="d-flex justify-content-start align-items-center mb-1">
                        <div class="avatar mr-1">
                          <img src="~/assets/home/app-assets/images/avatars/12-small.png" alt="avatar img" height="40" width="40" />
                        </div>
                        <div class="profile-user-info">
                          <h6 class="mb-0">Lura Jones</h6>
                          <a href="javascript:void(0)">
                            <small class="text-muted">@tiana59</small>
                            <i data-feather="check-circle"></i>
                          </a>
                        </div>
                        <div class="profile-star ml-auto">
                          <i data-feather="star" class="font-medium-3 profile-favorite"></i>
                        </div>
                      </div>
                      <p class="card-text mb-50">Halvah I love powder jelly I love cheesecake cotton candy. 😍</p>
                      <a href="javascript:void(0)">
                        <small>#vuejs #code #coffeez</small>
                      </a>
                    </div>
                    <!-- twitter feed -->
                    <div class="profile-twitter-feed mt-2">
                      <div class="d-flex justify-content-start align-items-center mb-1">
                        <div class="avatar mr-1">
                          <img src="~/assets/home/app-assets/images/avatars/1-small.png" alt="avatar img" height="40" width="40" />
                        </div>
                        <div class="profile-user-info">
                          <h6 class="mb-0">Norman Gross</h6>
                          <a href="javascript:void(0)">
                            <small class="text-muted">@tiana59</small>
                            <i data-feather="check-circle"></i>
                          </a>
                        </div>
                        <div class="profile-star ml-auto">
                          <i data-feather="star" class="font-medium-3"></i>
                        </div>
                      </div>
                      <p class="card-text mb-50">Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake.</p>
                      <a href="javascript:void(0)">
                        <small>#sketch #uiux #figma</small>
                      </a>
                    </div>
                  </div>
                </div>
                <!--/ twitter feed card -->
              </div>
              <!--/ left profile info section -->

              <!-- center profile info section -->
              <div class="col-lg-6 col-12 order-1 order-lg-2">
                <!-- post 1 -->
                <div v-for="post in getPostsByUserId" class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-start align-items-center mb-1">
                      <!-- avatar -->
                      <div class="avatar mr-1">
                        <vs-avatar v-if="!($auth.user.avatar=='' || $auth.user.avatar==null)" circle badge badge-color="success">
                          <img :src="$get('PREFIX')+$auth.user.avatar" alt="">
                        </vs-avatar>
                        <vs-avatar v-else circle badge badge-color="success">
                          <img src="~/assets/home/app-assets/images/avatars/2.png" alt="">
                        </vs-avatar>
                      </div>
                      <!--/ avatar -->
                      <div class="profile-user-info">
                        <h6 class="mb-0">{{post.title}}</h6>
                        <small class="text-muted">{{moment(post.create_at).startOf('minute').fromNow() }}</small>
                      </div>
                    </div>
                    <p class="card-text">
                      {{post.desc.replace(/<[^>]*>/g, '')}}
                    </p>
                    <!-- post img -->
                    <img
                      v-if="!(post.post_cover==='' || post.post_cover===null)"
                      class="img-fluid rounded mb-75"
                      :src="$get('PREFIX')+post.post_cover"
                      alt="avatar img"
                    />
                    <img
                      v-else
                      class="img-fluid rounded mb-75"
                      src="~/assets/LandingStyle/images/gfx/gfx-b.png"
                      alt="avatar img"
                    />
                    <!--/ post img -->

                    <!-- like share -->
                    <div class="row d-flex justify-content-start align-items-center flex-wrap pb-50">
                      <div class="col-sm-6 d-flex justify-content-between justify-content-sm-start mb-2">
                        <a href="javascript:void(0)" class="d-flex align-items-center text-muted text-nowrap">
                          <i class="bx bx-heart"></i>
                          <span>&nbsp;1.25k</span>
                        </a>

                        <!-- avatar group with tooltip -->
                        <div class="d-flex align-items-center">
                          <div class="avatar-group ml-1">

                            <vs-avatar-group  max="7">
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-1.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-2.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-3.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-4.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-5.jpg" alt="">
                              </vs-avatar>
                              <vs-avatar>
                                <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-4.jpg" alt="">
                              </vs-avatar>
                            </vs-avatar-group>

                          </div>
                          <a href="javascript:void(0)" class="text-muted text-nowrap ml-50">+140 more</a>
                        </div>
                        <!-- avatar group with tooltip -->
                      </div>

                      <!-- share and like count and icons -->
                      <div class="col-sm-6 d-flex justify-content-between justify-content-sm-end align-items-center mb-2">
                        <i class="bx bx-comment"></i>
                        <span class="text-muted mr-1">&nbsp;1.25k</span>

                        <i class="bx bx-share"></i>

                        <span class="text-muted">&nbsp;1.25k</span>
                      </div>
                      <!-- share and like count and icons -->
                    </div>
                    <!-- like share -->

                    <!-- comments -->
                    <div class="d-flex align-items-start mb-1">
                      <div class="avatar mt-25 mr-75">
                        <vs-avatar>
                          <img src="~/assets/home/app-assets/images/portrait/small/avatar-s-2.jpg" alt="">
                        </vs-avatar>
                      </div>
                      <div class="profile-user-info w-100">
                        <div class="d-flex align-items-center justify-content-between">
                          <h6 class="mb-0">Jackey Potter</h6>
                          <a href="javascript:void(0)">
                            <i data-feather="heart" class="profile-likes font-medium-3"></i>
                            <span class="align-middle text-muted">61</span>
                          </a>
                        </div>
                        <small>
                          Unlimited color🖌 options allows you to set your application color as per your branding 🤪.
                        </small>
                      </div>
                    </div>
                    <!--/ comments -->

                    <!-- comment box -->
                    <fieldset class="form-label-group mb-75">
                      <textarea class="form-control" id="label-textarea" rows="3" placeholder="Add Comment"></textarea>
                      <label for="label-textarea">Add Comment</label>
                    </fieldset>
                    <!--/ comment box -->
                    <button type="button" class="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </div>
                <div v-if="getPostsByUserId.length<=0">
                  <vs-alert :page.sync="page" >
                    <template #title>
                      No Posts Yet
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
                <!--/ post 1 -->
              </div>
              <!--/ center profile info section -->

              <!-- right profile info section -->
              <div class="col-lg-3 col-12 order-3">
                <!-- polls card -->
                <div class="card">
                  <div class="card-body">
                    <h5 class="mb-1">Polls</h5>
                    <p class="card-text mb-0">Who is the best actor in Marvel Cinematic Universe?</p>

                    <!-- polls -->
                    <div class="profile-polls-info mt-2">
                      <!-- custom radio -->
                      <div class="d-flex justify-content-between">
                        <div class="custom-control custom-radio">
                          <input type="radio" id="bestActorPoll1" name="bestActorPoll" class="custom-control-input" />
                          <label class="custom-control-label" for="bestActorPoll1">RDJ</label>
                        </div>
                        <div class="text-right">82%</div>
                      </div>
                      <!--/ custom radio -->

                      <!-- progressbar -->
                      <div class="progress progress-bar-primary my-50">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          aria-valuenow="58"
                          aria-valuemin="58"
                          aria-valuemax="100"
                          style="width: 82%"
                        ></div>
                      </div>
                      <!--/ progressbar -->

                      <!-- avatar group with tooltip -->
                      <div class="avatar-group my-1">
                      </div>
                      <!--/ avatar group with tooltip -->
                    </div>

                    <div class="profile-polls-info mt-2">
                      <div class="d-flex justify-content-between">
                        <!-- custom radio -->
                        <div class="custom-control custom-radio">
                          <input type="radio" id="bestActorPoll2" name="bestActorPoll" class="custom-control-input" />
                          <label class="custom-control-label" for="bestActorPoll2">Chris Hemswort</label>
                        </div>
                        <!--/ custom radio -->
                        <div class="text-right">67%</div>
                      </div>
                      <!-- progressbar -->
                      <div class="progress progress-bar-primary my-50">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          aria-valuenow="16"
                          aria-valuemin="16"
                          aria-valuemax="100"
                          style="width: 67%"
                        ></div>
                      </div>
                      <!--/ progressbar -->

                      <!-- avatar group with tooltips -->
                      <div class="avatar-group mt-1">
                      </div>
                      <!--/ avatar group with tooltips-->
                    </div>
                    <!--/ polls -->
                  </div>
                </div>
                <!--/ polls card -->
              </div>
              <!--/ right profile info section -->
            </div>

            <!-- reload button -->
            <div class="row">
              <div class="col-12 text-center">
                <button type="button" class="btn btn-sm btn-primary block-element border-0 mb-1">Load More</button>
              </div>
            </div>
            <!--/ reload button -->
          </section>
          <!--/ profile info section -->
        </div>
        </div>
      </div>
    </div>
    <!-- END: Content-->
  </div>
</template>

<script>


export default {
  name: "profile",
  layout:"Home/home",
  data(){
    return{
      page:1,
    }
  },
  beforeCreate() {
    this.$store.dispatch("OwnPostsById",this.$auth.user.id);
  },
  computed:{
    getPostsByUserId(){
      //todo:last step render value to component
      let obj=this.$store.getters.getOwnPostsByUserId;
      if(obj===undefined){
        return [];
      }
      return obj;
    },
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>
