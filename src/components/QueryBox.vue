<template>
          <div class="row" id="querybox">
             <nav v-bind:class="{ sticky: sticky }">
                <div class="nav-wrapper light-blue darken-4">
                  <form v-on:submit.prevent="filterResults(true)">
                    <div class="input-field">
                      <input type="search" v-model="searchQuery" v-on:keyup="filterResults()">
                      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                      <i class="material-icons" @click="clicked()" style="margin-top: -5px;">close</i>
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
                sticky: false,
                queryPos: 0
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
                console.log(results)
                this.$emit('results', results);
            },
            handleScroll: function() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if ((scrollTop > (this.queryPos * 1.1))&& (window.screen.width >700)) {
                    this.sticky = true;
                } else {
                    if (this.searchQuery.length == 0) {
                        this.sticky = false;
                    }
                }
            },
            clicked: function(){
                this.searchQuery = '';
                this.$emit('input', this.searchQuery);
                this.$emit('results', this.movies);
            }
        },
        props: {
            value: String,
            movies: Array
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
            this.queryPos = document.getElementById("querybox").offsetTop
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

    .sticky {
        position: fixed;
        z-index: 9999;
        width: 30%;
        right: 0;
        top: 0;
        height: 50px;
        margin-top: 6px;
        margin-right: 10px;
        border-radius: 5px
    }

    .sticky .label-icon {
        margin-top: -5px;
    }

    nav.sticky{
        box-shadow: none!important;
    }
</style>
