<template>
<div>
  <div class="input-field sort col s6 m8">            
    <select @change="onChange($event)">
      <option value="release_date">Year</option>
      <option value="title">Title</option>
      <option value="watched">Watched</option>
      <option value="unwatched">Unwatched</option>
      <option value="popularity">Popularity</option>
       <option value="vote_average">Vote Average</option>
    </select>
    <label>Sort</label>
  </div>
    <div class="col s6 m4">
        <span>
            <h6 v-if="sort === 'release_date'">
                {{filteredMovies[0].release_date | moment}} - {{filteredMovies[filteredMovies.length -1].release_date | moment}}
            </h6>
            <span v-if="sort === 'title'">
                {{filteredMovies[0].title | trim}} - {{filteredMovies[filteredMovies.length -1].title | trim}}
            </span>
        </span>
    </div>
</div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: 'SortFilter',
        data() {
            return {
                sort: 'release_date',
            }
        },
        methods: {
            onChange: function(that) {
                this.sort = that.target.value;
                this.emitChange()
            },
            emitChange() {
                this.$emit('change', this.sort);
                this.$emit('input', this.sort);
            }
        },
        mounted() {
            M.FormSelect.init(document.querySelectorAll('.sort select'));
            this.emitChange()
        },
        props: {
            filteredMovies: Array
        },
        filters: {
            moment: function(date) {
                return moment(new Date(date)).format('YYYY');
            },
            trim: function(movieo) {
                if (movieo.length > 14) {
                    return movieo.substring(0, 17) + '...';
                } else {
                    return movieo
                }
            }
        }
    }

</script>

<style scoped>
    h6{
            font-size: 1.33rem;
    }

</style>
