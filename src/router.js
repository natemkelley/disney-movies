import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login-root',
            component: Login
    }, {
            path: '/login',
            name: 'login',
            component: Login
    }, {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
    },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ('./views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;
