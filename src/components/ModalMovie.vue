<template>
    <div id="modal1" class="modal large">
        <div class="modal-header">
            <h4 class="white-text">{{movieDetails.title}}</h4>
            <img :src="baseURL+movieDetails.backdrop_path" class="responsive-img">
        </div>
        <div class="modal-subheader">
            <h6>{{movieDetails.tagline}}</h6>
            <p>{{movieDetails.overview}}</p>
        </div>

        <div class="modal-content row">
            <ul class="collection">
                <li class="collection-item">Budget<span class="right">{{movieDetails.budget | currency}}</span></li>
                <li class="collection-item">Revenue<span class="right">{{movieDetails.revenue | currency}}</span></li>
                <li class="collection-item">Run Time<span class="right">{{movieDetails.runtime}} Minutes</span></li>
                <li class="collection-item" v-if="movieDetails.homepage">Homepage<span class="right"><a :href="movieDetails.homepage">Website</a></span></li>
                <li class="collection-item">Release Date<span class="right">{{movieDetails.release_date}}</span></li>
                <li class="collection-item" v-if="movieDetails.production_companies">Studio<span class="right">{{movieDetails.production_companies[0].name}}</span></li>

            </ul>
        </div>
    </div>
</template>

<script>
    const mdb = require('moviedb')('8fc28b86e9c2ac35340e4c263ffcfda9');

    export default {
        name: 'MovieModal',
        data() {
            return {
                movieDetails: '',
                baseURL: 'https://image.tmdb.org/t/p/w500'
            }
        },
        props: {
            id: {},
        },
        mounted() {
            var options = {
                startingTop: '5%',
                endingTop: '5%'
            }
            M.Modal.init(document.querySelectorAll('#modal1'), options);
            console.log('modal mounted')
        },
        watch: {
            id: function(val, valold) {

                mdb.movieInfo({
                    id: val.id
                }, (err, res) => {
                    this.movieDetails = res;
                    M.Modal.getInstance(document.querySelectorAll('#modal1')[0]).open();
                });
            }
        },
        filters: {
            currency: function(curr) {
                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                });
                return formatter.format(curr)
            }
        }
    }

</script>

<style scoped>
    .large {
        width: 75% !important;
        height: 95% !important;
        max-height: 80% !important;
    }

    .responsive-img {
        width: 100%;
    }

    .modal-header {
        overflow: hidden;
        position: relative;
    }

    .modal-header img {
        -webkit-filter: brightness(60%);
        filter: brightness(60%);
    }

    .modal-subheader {
        border-bottom: 1px solid rgba(190, 190, 190, 0.42);
    }

    .modal-subheader h6 {
        margin: 0.75em;
        margin-left: 5%;
        margin-right: 3%;
        font-size: 18px;
        font-weight: 500;
    }

    .modal-subheader p {
        margin-left: 5%;
        font-size: 16px;
        margin-right: 3%;
    }

    h4 {
        font-size: 3.16em;
        margin-left: 5% !important;
        z-index: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 5%;
        text-shadow: 2px 2px 10px #000000;

    }

</style>
