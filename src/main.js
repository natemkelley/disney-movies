import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import 'material-icons'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false


let app = '';
const firebaseConfig = {
    apiKey: "AIzaSyB_Wnxg2FoUchfSfwpchLKLHA1heikmu40",
    authDomain: "disney-movie-list.firebaseapp.com",
    databaseURL: "https://disney-movie-list.firebaseio.com",
    projectId: "disney-movie-list",
    storageBucket: "",
    messagingSenderId: "905153778614",
    appId: "1:905153778614:web:a54c517e5e5ca998"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
    if (!app) {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    }
})
