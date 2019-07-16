<template>
          <div class="row">
             <nav>
                <div class="nav-wrapper light-blue darken-4">
                  <form v-on:submit.prevent="filterResults(true)">
                    <div class="input-field">
                      <input type="search" v-model="searchQuery" v-on:keyup="filterResults()">
                      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                      <i class="material-icons" @click="clicked()">close</i>
                    </div>
                  </form>
                </div>
              </nav>
          </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'
    import Fuse from 'fuse.js'

    export default {
        name: 'QueryBox',
        data() {
            return {
                isActive: false,
                searchQuery: '',
                pageNumbers: 50,
                activePage: 1,
            }
        },
        methods: {
            filterResults: function(that) {
                this.$emit('input', this.searchQuery);
                var options = {
                    threshold: 0.25,
                    distance: 500,
                    keys: ['title', 'release_date', 'overview']
                };
                var fuse = new Fuse(this.movies, options)
                var results = fuse.search(this.searchQuery)
                console.log(this.results)
                this.$emit('results', results);
            }
        },
        props: {
            value: String,
            movies: Array
        }
    }

</script>

<style scoped>
    nav {
        margin-bottom: 8px;
    }

    nav input {
        color: white
    }

    nav input:focus {
        color: black!important
    }

</style>
