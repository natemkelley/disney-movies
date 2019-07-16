<template>
<div>
  <div class="input-field sort">            
    <select @change="onChange($event)">
      <option value="release_date">Year</option>
      <option value="title">Title</option>
      <option value="popularity">Popularity</option>
       <option value="vote_average">Vote Average</option>
    </select>
    <label>Sort</label>
  </div>
</div>
</template>

<script>
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
        }
    }

</script>
