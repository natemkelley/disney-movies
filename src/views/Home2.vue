<template>
  <div class="home">
      <div class="container">

          <query-box v-model="searchText" :movies="allMovies" v-on:results="filterstuff" v-if="!loading"></query-box>
          <div class="row" v-if="!loading">
          <sort-filter class="col s3" v-model="sortFilter"></sort-filter>
          <pagination-x class="col s9" :movies="allMovies"  v-on:pagresults="paginateResults"></pagination-x>
          </div>
          {{sortFilter}}
          <div class="row" v-show="!loading">
              <movie-gallery :movies='movies' :filter='sortFilter'></movie-gallery>
          </div>
          <disc-loader v-if="loading"></disc-loader>
      </div>
      
  </div>
</template>

<script>
    import QueryBox from '@/components/QueryBox.vue'
    import DiscLoader from '@/components/DiscLoader.vue'
    import MovieGallery from '@/components/MovieGallery.vue'
    import PaginationX from '@/components/Pagination.vue'
    import SortFilter from '@/components/SortFilter.vue'
    import firebase from 'firebase/app'
    import 'firebase/database'
    import Masonry from 'masonry-layout';
    import imagesLoaded from 'imagesloaded';
    import sortJsonArray from 'sort-json-array'

    export default {
        name: 'home',
        created() {
            firebase.database().ref('/').once('value').then(snapshot => {
                for (var key in snapshot.val()) {
                    this.allMovies.push(snapshot.val()[key]);
                }
                this.allMovies = sortJsonArray(this.allMovies, 'release_date')
                this.filteredMovies = this.allMovies;
                this.loading = true;
            })
        },
        data() {
            return {
                publicPath: process.env.BASE_URL,
                allMovies: [],
                searchText: '',
                filteredMovies: [],
                loading: true,
                start: 0,
                end: 50,
                sortFilter:''
            }
        },
        components: {
            QueryBox,
            DiscLoader,
            MovieGallery,
            PaginationX,
            SortFilter
        },
        methods: {
            filterstuff: function(that) {
                if (this.searchText.length < 1) {
                    this.filteredMovies = this.allMovies;
                } else {
                    this.filteredMovies = that;
                }
            },
            paginateResults: function(pagresults) {
                this.start = pagresults.start;
                this.end = pagresults.end;
            }
        },
        computed: {
            movies: function() {
                let sorted = sortJsonArray(this.allMovies, this.sortFilter)
                return this.filteredMovies.slice(this.start, this.end)
            }
        },
        updated() {
            setTimeout(() => {
                this.loading = false;
            }, 600);
        }
    }

</script>

<style>
    .home {
        min-height: 85vh;
        margin-top: 40px;
    }

    @media only screen and (min-width: 993px) {
        .container {
            width: 85%!important;
        }
    }

    @media only screen and (max-width: 850px) {
        .grid-sizer,
        .grid-item {
            width: 47%;
            margin-bottom: 5px;
        }
    }

    @media only screen and (max-width: 494px) {
        .grid-sizer,
        .grid-item {
            width: 100%;
            margin: 0px;
            margin-top: 5px;
        }
    }

</style>

<style scoped>


</style>
