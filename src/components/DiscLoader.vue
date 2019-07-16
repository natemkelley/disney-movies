<template>
  <div class="loading">
      <div class="progress light-blue darken-3">
          <div class="indeterminate light-blue darken-0"></div>
      </div>
  </div>
</template>

<script>
    export default {
        name: 'loader',
        mounted() {

        }
    }

</script>

<style>
    .progress {
        height: 14.5px!important;
        margin-top: 6%;
    }

    .loading {
        position: relative;
        margin-top: 5%;
        width: 100%;
    }

</style>
