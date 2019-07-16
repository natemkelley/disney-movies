<template>
  <div class="right smaller" >
        <a href="#!" class="right btn-floating btn-large scale-transition light-blue darken-2" @click="clicked()" v-bind:class="{ 'scale-out': isActive }" >
            <i class="material-icons">add</i>
        </a>
        <a href="#!" class="right btn-floating btn-large scale-transition checked green darken-2" @click="clicked()" v-bind:class="{ 'scale-out': !isActive }">
            <i class="material-icons">check</i>
        </a>
  </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'

    export default {
        name: 'click-button',
        methods: {
            clicked: function() {
                this.isActive = !this.isActive;
                var datt = this.data;
                if (datt.watched.length > 3) {
                    datt.watched = ''
                } else {
                    datt.watched = String(new Date());
                }

                firebase.database().ref('/' + datt.id).set(datt);
            }
        },
        props: {
            data: {},
        },
        data() {
            return {
                isActive: false
            }
        },
        mounted() {
            if (this.data.watched.length > 2) {
                this.isActive = true
            }
        },
        watch: {
            data: function(val) {
                if (val.watched.length > 2) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            }
        }
    }

</script>

<style scoped>
    .checked {
        position: absolute!important
    }

    .btn-floating.btn-large {
        width: 46px;
        height: 46px;
        padding: 0;
    }

    .btn-floating.btn-large i {
        line-height: 46px;
    }

    .smaller {
        transform: scale(0.88);
    }

</style>
