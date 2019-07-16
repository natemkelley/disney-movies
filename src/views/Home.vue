<template>
  <div class="home">
      <div class="container">

          <query-box v-model="searchText" :movies="allMovies" v-on:results="filterstuff" v-if="!loading"></query-box>
          <div class="row" v-if="!loading">
          <sort-filter class="col s3" v-model="sortFilter"></sort-filter>
          <pagination-x class="col s9" :movies="allMovies"  v-on:pagresults="paginateResults"></pagination-x>
          </div>
          <div class="row" v-show="!loading">
              <movie-gallery :movies='movies' :sort='sortFilter'></movie-gallery>
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
    import sort from 'fast-sort';

    export default {
        name: 'home',
        created() {
            firebase.database().ref('/').once('value').then(snapshot => {
                for (var key in snapshot.val()) {
                    this.allMovies.push(snapshot.val()[key]);
                }
                this.filteredMovies = this.allMovies.slice();
                this.loading = true;
            })
        },
        data() {
            return {
                allMovies: [],
                searchText: '',
                filteredMovies: [],
                loading: true,
                start: 0,
                end: 50,
                sortFilter: ''
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
                console.log(this.loading, 'here')
                if (this.loading) {
                    return this.filteredMovies.slice(this.start, this.end)
                } else {
                    sort(this.filteredMovies).asc(this.sortFilter);
                    return this.filteredMovies.slice(this.start, this.end)
                }
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
