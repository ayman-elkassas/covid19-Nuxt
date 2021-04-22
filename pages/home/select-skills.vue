<template>
  <div class="center">

    <vs-dialog not-close prevent-close>
      <template #header>
        <br>
        <br>
        <h4>
          Complete Your Skills And <b>Community Of Field</b>
        </h4>
      </template>

      <div class="con-form">

        <vue-multiselect v-model="value" :options="options"></vue-multiselect>

      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>
            Sign In
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "select-skills",
  props:{
    activeOrNot: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      value: '',
      options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched']
    }
  }
}
</script>

<style scoped>

</style>
