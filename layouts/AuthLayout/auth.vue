<template>
  <div class="landing">
    <div class="auth-wrapper align-items-stretch aut-bg-img">
      <div class="flex-grow-1">
        <div class="h-100 d-md-flex align-items-end auth-side-img">
          <div class="col-sm-10 auth-content w-auto">
            <img src="assets/images/logo.svg" alt="" class="img-fluid">
            <h1 class="text-white my-4">Welcome Back!</h1>
            <h4 class="text-white font-weight-normal">Signin to your account and get explore the Nextro Dashboard Template.<br />Do not forget to play with live customizer</h4>
          </div>
        </div>
        <div class="auth-side-form">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "auth",
  middleware:"guest",
}
</script>

<style scoped>

@import '~assets/nextro/assets/css/style.css';

.landing{
  background-image: url("~assets/nextro/assets/images/auth/img-auth-big.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  overflow: hidden;
}

.vs-input{
  width: 100%;
}

</style>
