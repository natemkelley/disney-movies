<template>
    <div class="home">
        <div class="container">
            <query-box v-model="searchText" :movies="allMovies" v-on:results="filterstuff" v-if="!loading"></query-box>
            <div class="row" v-if="!loading">
                <sort-filter :filteredMovies="movies" class="col s12 m5" v-model="sortFilter"></sort-filter>
                <pagination-x class="col s12 m7" :movies="allMovies" :filteredMovies='filteredMovies' v-on:pagresults="paginateResults" ref="paginate1"></pagination-x>
            </div>
            <div class="row" v-show="!loading">
                <movie-gallery :movies='movies' :sort='sortFilter' :watchedStatus="watchedStatus" v-on:idupdate="idupdate"></movie-gallery>
            </div>
            <disc-loader v-if="loading"></disc-loader>
            <modal-movie :id='id'></modal-movie>
        </div>

    </div>
</template>

<script>
    import QueryBox from '@/components/QueryBox.vue'
    import DiscLoader from '@/components/DiscLoader.vue'
    import MovieGallery from '@/components/MovieGallery.vue'
    import PaginationX from '@/components/Pagination.vue'
    import SortFilter from '@/components/SortFilter.vue'
    import ModalMovie from '@/components/ModalMovie.vue'
    import firebase from 'firebase/app'
    import 'firebase/database'
    import Masonry from 'masonry-layout';
    import imagesLoaded from 'imagesloaded';
    import sort from 'fast-sort';
    import Sticky from 'vue-sticky-directive'

    export default {
        name: 'home',
        created() {
            firebase.database().ref('/movies').once('value').then(snapshot => {
                for (var key in snapshot.val()) {
                    this.allMovies.push(snapshot.val()[key]);
                }
                this.filteredMovies = this.allMovies.slice();
                this.loading = true;
            })

            firebase.database().ref(firebase.auth().currentUser.uid).on('value', (snapshot)=> {
                var arr = []
                for (var key in snapshot.val().watched) {
                    arr.push(snapshot.val().watched[key]);
                }
                this.watchedStatus = arr;
            });
        },
        data() {
            return {
                allMovies: [],
                searchText: '',
                filteredMovies: [],
                loading: true,
                start: 0,
                end: 50,
                sortFilter: '',
                scrolled: false,
                id: 12,
                watchedStatus: []
            }
        },
        components: {
            QueryBox,
            DiscLoader,
            MovieGallery,
            PaginationX,
            SortFilter,
            ModalMovie
        },
        methods: {
            filterstuff: function(that) {
                if (!(this.searchText.length < 1)) {
                    this.filteredMovies = that;
                } else {
                    this.filteredMovies = this.allMovies
                }
            },
            paginateResults: function(pagresults) {
                this.start = pagresults.start;
                this.end = pagresults.end;
            },
            handleScroll: function() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var body = document.body;
                var html = document.documentElement;
                var height = Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);
                var perc = (scrollTop / height) * 100;
                if (perc > 60) {
                    this.scrolled = true
                } else {
                    this.scrolled = false
                }
            },
            idupdate: function(id) {
                this.id = id;
            }
        },
        computed: {
            movies: function() {
                if (this.loading) {
                    return this.filteredMovies.slice(this.start, this.end)
                } else {
                    if (this.searchText.length < 1) {
                        this.filteredMovies = this.allMovies;
                    }
                    if (this.sortFilter == 'watched') {
                        var x = []
                        this.filteredMovies.forEach(function(obj) {
                            if (obj.watched.length > 2) {
                                x.push(obj)
                            }
                        })
                        //this.filteredMovies = sort(x).desc(this.sortFilter)
                        return sort(x).desc(this.sortFilter);
                    }
                    if (this.sortFilter == 'unwatched') {
                        var x = []
                        this.filteredMovies.forEach(function(obj) {
                            if (!(obj.watched.length > 1)) {
                                x.push(obj)
                            }
                        })
                        //this.filteredMovies = sort(x).desc(this.sortFilter)
                        return sort(x).desc(this.sortFilter);
                    }

                    sort(this.filteredMovies).asc(this.sortFilter);
                    return this.filteredMovies.slice(this.start, this.end)
                }
            }
        },
        updated() {
            setTimeout(() => {
                this.loading = false;
            }, 600);
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
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
            width: 85% !important;
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
