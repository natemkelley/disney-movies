<template>
    <div class="right smaller">
        <a href="#!" class="right btn-floating btn-large scale-transition light-blue darken-2" @click="clicked()" v-bind:class="{ 'scale-out': isActive }">
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
                let movieID = datt.id
                let uid = firebase.auth().currentUser.uid;
                let checked = checkedIfchecked(uid, movieID).then(status => {
                    if (status) {
                        let date = String(new Date())
                        let watchedID = {
                            date: date,
                            movieID: datt.id,
                            title: datt.title
                        }
                        firebase.database().ref('/' + uid + '/uid').set(uid);
                        firebase.database().ref('/' + uid + '/watched').push(watchedID)
                    }
                });

                function checkedIfchecked(uid, movieID) {
                    var returnVal = true;
                    return new Promise((resolve, reject) => {
                        firebase.database().ref('/' + uid + '/watched').once('value').then(snapshot => {
                            for (var key in snapshot.val()) {
                                if (snapshot.val()[key].movieID == movieID) {
                                    firebase.database().ref('/' + uid + '/watched/' + key).remove();
                                    returnVal = false;
                                }
                            }
                            resolve(returnVal)
                        })
                    })
                }
            }
        },
        props: {
            data: {},
            watched: Array
        },
        data() {
            return {
                isActive: false
            }
        },
        mounted() {
            if (this.watched.includes(this.data.id)) {
                this.isActive = true
            }
        },
        watch: {
            data: function(val) {
                if (this.watched != undefined) {
                    if (this.watched.includes(val.id)) {
                        this.isActive = true
                    } else {
                        this.isActive = false
                    }
                } else {
                    this.isActive = false
                }
            }
        }
    }

</script>

<style scoped>
    .checked {
        position: absolute !important
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
