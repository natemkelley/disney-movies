<template>
    <div>
          <p v-for="movie in watchedStatus">{{movie}}</p>
          <div class="col s12 m3 l3" v-for="movie in movies">
              <div class="card medium sticky-action" >
                    <div class="card-image waves-effect waves-block waves-light" @click="clickPic(movie.id)">
                        <img class="activator" v-lazy="movie.local_poster_path">
                    </div>
                <div class="card-content">
                    <a :href="'https://www.themoviedb.org/movie/'+movie.id" target="_blank"><span class="card-title">{{movie.title}} ({{movie.release_date | moment}})</span></a>
                  <p></p>
                </div>
                <div class="card-action ">
                    <span v-if="movie.watched" class="light-green-text text-darken-3" @click="openPicker(movie)">{{movie.watched | momentFull}}</span>
                    <span class="rtnspan" v-else>
                        <span v-if="sort != 'vote_average'">
                            <img class="rtn" src="/img/icons/fire.png">
                            {{movie.popularity | rotten}}
                        </span>
                        <span v-else>
                            <img class="rtn" src="https://library.kissclipart.com/20180904/vfw/kissclipart-wishlist-icon-clipart-computer-icons-f6f8964e072a0dff.jpg">
                            {{movie[sort] | vote}}
                        </span>
                    </span>
                    <watched-button class="right-align" :data="movie" :watched="movie.watched"></watched-button>
                </div>
            </div>
        </div>
        <div class="datepicker" style="display:none">
            <input type="text" class="datepicker">
        </div>
    </div>
</template>


<script>
    import WatchedButton from '@/components/WatchedButton.vue'
    import moment from 'moment'
    import firebase from 'firebase/app'
    import 'firebase/database'

    export default {
        name: 'MovieGallery',
        props: {
            movies: Array,
            sort: String,
            watchedStatus: Array
        },
        components: {
            WatchedButton
        },
        filters: {
            moment: function(date) {
                var newDate = new Date(date)
                return moment(newDate).format('YYYY');
            },
            momentFull: function(date) {
                if (date.length < 2) {
                    return ''
                } else {
                    var newDate = new Date(date)
                    return moment(newDate).format('LL')
                }
            },
            rotten: function(num) {
                return Math.round(Number(num)) + "%"
            },
            vote: function(num) {
                return Math.round(Number(num) * 10) + "%"
            },
            fbackground: function(img) {
                return 'https://image.tmdb.org/t/p/w400/' + img;
            }
        },
        methods: {
            openPicker: function(that) {
                var elems = document.querySelectorAll('.datepicker');
                var options = {
                    onClose: function() {
                        var instance = M.Datepicker.getInstance(elems[0]);
                        var date = instance.toString();
                        that.watched = date;
                        firebase.database().ref('/' + that.id).set(that);
                    }
                }
                M.Datepicker.init(elems, options);

                if (that.watched.length > 3) {
                    M.Datepicker.getInstance(elems[0]).setDate(new Date(that.watched));
                } else {
                    M.Datepicker.getInstance(elems[0]).setDate(new Date());
                }
                M.Datepicker.getInstance(document.querySelectorAll('.datepicker')[0]).open();
            },
            clickPic: function(id) {
                this.inc = this.inc +1;
                this.$emit('idupdate', {id:id, inc:this.inc});
            }
        },
        date(){
            return{
                inc: 0
            }
        }
    }

</script>

<style scoped>
    img {
        background: gray;
    }

    .card .card-title {
        font-size: 20px!important;
        font-weight: 300;
        line-height: 26px!important;
    }

    .card.medium {
        height: 495px!important;
    }

    .card-action span {
        margin-top: 6%;
        position: absolute;
        font-size: 15px;
        text-transform: uppercase;
        font-weight: 500
    }

    .rtn {
        height: 22px;
        width: 22px;
        margin-right: 6px;
        position: absolute;
        margin-left: -27px;
        margin-top: 1.3px;
    }

    .rtnspan {
        margin-left: 21px;
        font-size: 17px!important;
    }

    .card-action img {
        background: transparent!important;
    }

    .card-content a {
        color: #000!important
    }

    @media only screen and (max-width: 600px) {
        .card.medium {
            height: 475px!important;

        }
    }

</style>
