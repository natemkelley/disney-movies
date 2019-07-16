<template>
  <div id="app">
            <nav-bar></nav-bar>
            <router-view/>
            <footer-x/>

  </div>
</template>

<script>
    import NavBar from './components/Navbar.vue';
    import FooterX from './components/Footer.vue';

    
    export default {
        name: 'App',
        components: {
            NavBar ,
            FooterX
        }
    }

</script>

<style>
    #app {
        font-family: 'Roboto', sans-serif;
    }

</style>
