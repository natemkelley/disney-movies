<template>
    <div>
          <div class="col s12 m4 l3" v-for="movie in movies">
              <div class="card medium sticky-action" >
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" :src="movie.local_poster_path">
                </div>
                <div class="card-content">
                  <span class="card-title">{{movie.title}} ({{movie.release_date | moment}})</span>
                  <p></p>
                </div>
                <div class="card-action ">
                    <span v-if="movie.watched" class="light-green-text text-darken-3">{{movie.watched | momentFull}}</span>
                    <span class="rtnspan" v-else>
                        <span v-if="sort != 'vote_average'">
                            <img class="rtn" src="http://cdn.onlinewebfonts.com/svg/img_335650.png">
                            {{movie.popularity | rotten}}
                        </span>
                        <span v-else>
                            <img class="rtn" src="https://library.kissclipart.com/20180904/vfw/kissclipart-wishlist-icon-clipart-computer-icons-f6f8964e072a0dff.jpg">
                            {{movie[sort] | vote}}
                        </span>
                    </span>
                    <watched-button class="right-align" :data="movie" :watched="movie.watched"></watched-button>
                </div>
                  <div class="card-reveal">
                      <div class="row">
                        <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                      </div>
                      <div class="row">
                          <p>{{movie.overview}}</p>
                      </div>
                  </div>
          </div>
        </div>
    </div>
</template>


<script>
    import WatchedButton from '@/components/WatchedButton.vue'
    import moment from 'moment'

    export default {
        name: 'MovieGallery',
        props: {
            movies: Array,
            sort: String
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
                return Math.round(Number(num)*10) + "%"
            }
        },
    }

</script>

<style scoped>
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

</style>
