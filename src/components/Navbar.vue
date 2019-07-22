<template>
    <div>
      <div class="navbar-fixed">
          <nav>
            <div class="nav-wrapper" v-bind:class="color">
                <a href="#" class="brand-logo center">Disney Movies</a>
                <ul class="left" v-if="loggedIn">
                    <li>  <a href="#" id="menudiddly" data-target="slide-out" class="show-on-large sidenav-trigger"><i class="material-icons" v-bind:class="textColor">menu</i></a>
                    </li>
                </ul>
            </div>
          </nav>
        </div>

        <ul class="sidenav " id="slide-out">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img src="https://i.ytimg.com/vi/uG6li2J6nXk/maxresdefault.jpg">
                    </div>
                    <a><img class="circle" v-bind:src="profilePic"></a>
                    <a><span class="white-text name">{{userName}}</span></a>
                    <a><span class="white-text email">{{email}}</span></a>
                </div>
            </li>
            
            <li><router-link to='home' class="waves-effect"><i class="material-icons">home</i>Home</router-link></li>
            <li><router-link to='home' class="waves-effect">Watched Movies</router-link></li>

            <li><a v-on:click="toggleLog" class="logout">Logout</a></li>
        </ul>
    </div>
</template>

<script>
    import Login from '../views/Login.vue';
    import firebase from 'firebase/app'
    import 'firebase/database'
    import 'firebase/auth'

    export default {
        name: 'NavBar',
        data() {
            return {
                loggedIn: false,
                userName: 'Log In',
                color: 'light-blue darken-4',
                textColor: 'text-white',
                profilePic: '../assets/img_avatar.png',
                email: '',
                activePage: 'Boud Cabin',
                admin: false
            }
        },
        mounted() {
            this.intiSideNav();
            this.getUserInfo();
        },
        methods: {
            getUserInfo: function() {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.loggedIn = true;
                        this.userName = user.displayName;
                        this.profilePic = user.photoURL;
                        this.email = user.email;
                        if (user.displayName.includes('Kelley')) {
                            this.admin = true;
                        }
                    }
                });
            },
            intiSideNav: function() {
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems, {
                    preventScrolling: false
                });
            },
            toggleLog: function() {
                let status = Login.methods.signOut();
                status.then((value) => {
                    this.$router.replace('login');
                    let elems = document.querySelectorAll('.sidenav');
                    let instance = M.Sidenav.getInstance(elems[0]);
                    instance.close();
                })
            }
        }
    }

</script>

<style scoped>
    .avatar {
        height: 38px;
        margin: 12px 10px 0px 0px;
        position: absolute;
        background: 'grey'
    }

    .avatar-text {
        padding-left: 45px;
    }

    .permaside {
        display: contents!important
    }

    .logout {
        position: fixed;
        bottom: 0;
        width: 299px;
        left: 0;
        background-color: rgba(255, 32, 32, 0.03)!important;
    }

    .logout:hover {
        background-color: rgba(255, 32, 32, 0.10)!important;
    }

    .sidenav li>a>i {
        margin-right: 12px!important;
    }

    .nav-wrapper .brand-logo {
        text-transform: capitalize
    }

    .content-wrapper-before {
        position: absolute;
        z-index: -1;
        top: 64px;
        left: 0;
        width: 100%;
        height: 150px;
        -webkit-transition: .3s ease all;
        -moz-transition: .3s ease all;
        -o-transition: .3s ease all;
        transition: .3s ease all;
        margin-top: -5px;
    }

    .gradient-45deg-indigo-purple {
        background: #FAFAFA;
        background: -webkit-linear-gradient(0deg, #FAFAFA, #efefef) !important;
        background: -moz- oldlinear-gradient(0deg, #FAFAFA, #efefef) !important;
        background: -o-linear-gradient(0deg, #FAFAFA, #efefef) !important;
        background: linear-gradient(0deg, #FAFAFA, #efefef) !important;
    }

</style>
